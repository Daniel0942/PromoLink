from setup import app
from flask import request, jsonify
from setup.models.table import Conexao
import mysql.connector.errors

# Função para registrar novo usuário no banco de dados
@app.route("/registrar", methods=["POST"])
def registrar_usuario():
    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    conectar = Conexao()
    cursor = conectar.cursor()
    try:
        cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (username, email, password))
        conectar.commit()
        return jsonify({"Success": "Registrado com sucesso!"}), 200
    except mysql.connector.errors.IntegrityError as erro:
        if erro.errno == 1062:
            print(f"[ERROR], {username} já existe no banco de dados")
            return jsonify({"Error": f"{username} já existe no banco de dados, tente novamente!"}), 409
        else:
            print(f"Erro inesperado: {str(erro)}")
            return jsonify({"Error": "Erro ao registrar usuário"}), 500
    finally:
        cursor.close()
        conectar.close()