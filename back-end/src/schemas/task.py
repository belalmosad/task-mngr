from marshmallow import Schema, fields

class GetTaskSchema(Schema):
    id = fields.Str(required=True)
    name = fields.Str(required=True)
    status = fields.String(required=True)
    created_at = fields.DateTime(required=True)

class CreateTaskSchema(Schema):
    id = fields.Str(dump_only=True)
    name = fields.Str(required=True)
    status = fields.String(required=True)
    
    
class UpdateTaskSchema(Schema):
    name = fields.Str()
    status=fields.Str()
    
class QueryArgsSchema(Schema):
    offset = fields.Number()
