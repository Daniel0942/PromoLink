from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.secret_key = "1234"

# Key Jwt autentication
app.config['JWT_SECRET_KEY'] = 'daniel30856377'
jwt = JWTManager(app)

CORS(app)

from setup.controllers import login, registrar, produtos, historico, favoritos, pesquisa