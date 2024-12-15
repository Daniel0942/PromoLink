from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_refresh_token
from datetime import timedelta

app = Flask(__name__)
app.secret_key = "1234"

# Key Jwt autentication
app.config['JWT_SECRET_KEY'] = 'daniel30856377'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=15)  # Token de acesso expira em 15 minutos
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=7)  # Token de atualização expira em 7 dias
jwt = JWTManager(app)

CORS(app) 

from setup.controllers import login, registrar, produtos, historico, favoritos, pesquisa