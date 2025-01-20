from src.db.db import db
from sqlalchemy import Column, String, Integer, DateTime
from datetime import datetime

class TaskModel(db.Model):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    status = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.now())    