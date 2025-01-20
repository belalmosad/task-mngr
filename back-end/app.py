from flask import Flask
from flask_smorest import Api
from src.modules.task import bp
from src.db.db import db
import os

def create_app():
    app = Flask(__name__)
    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["API_TITLE"] = "Tasks API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('DATABASE_URI')
    app.config["SQLALCHEMY_TRACK_MODIICATIONS"] = False
    db.init_app(app)
    with app.app_context():
        db.create_all()
    api = Api(app)
    api.register_blueprint(bp)
    return app
