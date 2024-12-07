from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from setup.controllers import login, produtos, historico, favoritos, pesquisa