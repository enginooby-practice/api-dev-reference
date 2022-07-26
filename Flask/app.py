import json
import time

from flask import *

app = Flask(__name__)


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
    app.run(port=6969)
