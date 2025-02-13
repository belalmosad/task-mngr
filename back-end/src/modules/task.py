from io import StringIO
from flask_smorest import Blueprint, abort
from flask.views import MethodView
from src.schemas.task import CreateTaskSchema, UpdateTaskSchema, GetTaskSchema, QueryArgsSchema
from src.db.db import db
from src.db.models.task import TaskModel
from sqlalchemy.exc import SQLAlchemyError
from flask import request, Response
import csv
import app
bp = Blueprint('tasks', __name__, description="CRUD operations on tasks")

# All tasks
@bp.route('/tasks')
class Task(MethodView):
    @bp.response(200, GetTaskSchema(many=True))
    @bp.arguments(QueryArgsSchema, location="query")
    def get(self, data):
        try:
            offset = int(data["offset"])
            tasks = db.session.query(TaskModel).offset(offset).limit(5).all()
            return tasks
        except SQLAlchemyError:
            abort(500, message="Error in loading tasks")
    
    @bp.arguments(CreateTaskSchema)
    @bp.response(201, CreateTaskSchema)
    def post(self, json_data):
        new_task = TaskModel(**json_data)
        db.session.add(new_task)
        db.session.commit()
        return new_task
    
    @bp.response(204)
    def delete(self):
        db.session.query(TaskModel).delete()
        db.session.commit()
        

# specific task
@bp.route('/task/<int:task_id>')
class TaskItem(MethodView):
    @bp.response(200, GetTaskSchema)
    def get(self, task_id):
        task = db.session.query(TaskModel).get(task_id)
        if task is None:
            abort(404, message=f"Task with id = {task_id} doesn't exist")
        return task

    
    @bp.arguments(UpdateTaskSchema)
    @bp.response(200, CreateTaskSchema)
    def patch(self, json_data, task_id):
        task = db.session.query(TaskModel).get(task_id)
        if task is None:
            abort(404, message="Invalid task id")
        for key, value in json_data.items():
         if hasattr(task, key): 
            setattr(task, key, value)
        db.session.commit()
        return task
    
    @bp.response(204)
    def delete(self, task_id):
        task = db.session.query(TaskModel).get(task_id)
        if task is None:
            abort(404, message="Invalid id")
        db.session.delete(task)
        db.session.commit()
    
    
@bp.route('/tasks/count')
class TaskCount(MethodView):
    def get(self):
        res = db.session.query(TaskModel).count()
        return {'count': res}
    
@bp.route('/tasks/export')
class TasksExport(MethodView):
        def get(self):
            return Response(
            self.__generate_file(),
            mimetype='text/csv',
            headers={"Content-Disposition": "attachment;filename=large_data.csv"}
        )
        
        def __generate_file(self):
            with app.app.app_context():
                allTasksCount = db.session.query(TaskModel).count()
                offset = 0

                buffer = StringIO()
                writer = csv.DictWriter(buffer, fieldnames=['name', 'status'])
                writer.writeheader() 

                while allTasksCount > 0:
                    batch = db.session.query(TaskModel).offset(offset).limit(5).all()
                    if not batch:
                        break
                    for task in batch:
                        writer.writerow({'name': task.name, 'status': task.status})

                    buffer.seek(0)
                    yield buffer.read()
                    buffer.truncate(0)
                    buffer.seek(0)
                    offset += 5
                    allTasksCount -= 5
                    
                    
