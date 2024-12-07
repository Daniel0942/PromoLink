from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = "1234"
CORS(app)

from setup.controllers import login, registrar, produtos, historico, favoritos, pesquisa