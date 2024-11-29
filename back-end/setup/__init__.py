from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {
    "origins": ["https://promo-link-lvfvedigf-daniel0942s-projects.vercel.app"],
    "methods": ["GET", "POST", "DELETE"],
    "allow_headers": ["Content-Type", "Authorization"]
}})

from setup.controllers import default, produtos, historico, favoritos