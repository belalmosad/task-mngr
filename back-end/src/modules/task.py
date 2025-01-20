from flask_smorest import Blueprint, abort
from flask.views import MethodView
from src.schemas.task import CreateTaskSchema, UpdateTaskSchema, GetTaskSchema
from src.db.db import db
from src.db.models.task import TaskModel
from sqlalchemy.exc import SQLAlchemyError
from flask import request

bp = Blueprint('tasks', __name__, description="CRUD operations on tasks")

# All tasks
@bp.route('/tasks')
class Task(MethodView):
    @bp.response(200, GetTaskSchema(many=True))
    def get(self):
        try:
            tasks = db.session.query(TaskModel).all()
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
    
    
