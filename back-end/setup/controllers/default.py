from setup import app
from flask import request, jsonify
from setup.models.table import Conexao

# função pra retornar dados json do login
@app.route("/users")
def users_json():
    conectar = Conexao()
    cursor = conectar.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    return jsonify(users)

# Função para registrar novo usuário no banco de dados
@app.route("/users", methods=["POST"])
def inserir_usuarios():
    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    conectar = Conexao()
    cursor = conectar.cursor()
    cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (username, email, password))
    conectar.commit()
    cursor.close()
    conectar.close()
    return jsonify({"message": "Enviado com sucesso"}), 200

