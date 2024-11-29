from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"},
"methods": ["GET", "POST", "DELETE"]})

from setup.controllers import default, produtos, historico, favoritos