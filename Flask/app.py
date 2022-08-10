import json
import time

from flask import Flask, jsonify
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

with open('_Shared/todolist.json', 'r') as f:
    data = json.loads(f.read())


class TodoListApi(Resource):
    def get(self):
        return jsonify(data)


api.add_resource(TodoListApi, "/api")


@app.route('/', methods=['GET'])
def home_page():
    response = {'Page': 'Home', 'Message': 'Welcome!', 'Time': time.time()}

    return json.dumps(response)


@app.route('/users/', methods=['GET'])
def user_page():
    user_arg = str(request.args.get('user'))  # /users/?user=...
    response = {'Page': 'User', 'Message': f'Hi, {user_arg}!', 'Time': time.time()}

    return json.dumps(response)


if __name__ == '__main__':
    app.run(port=6969, debug=True)
