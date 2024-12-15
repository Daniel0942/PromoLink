from setup import app
from flask import request, jsonify
from setup.models.table import Conexao
import mysql.connector.errors
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity

# função para validação do login
@app.route("/users", methods=["POST"])
def Logar():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")
    try:
        conectar = Conexao()
        cursor = conectar.cursor(dictionary=True)
        # pegar somente o username do usuário logado para armazenar na sessão 
        cursor.execute("SELECT username FROM users WHERE email = %s AND password = %s", ( email, password))
        resultado = cursor.fetchone()
        if resultado:
            username = resultado["username"] # extrair username do resultado
            
            # Criar os tokens
            token = create_access_token(identity=username)
            refresh_token = create_refresh_token(identity=username)

            return jsonify(access_token=token, refresh_token=refresh_token, username=username), 200

        return jsonify({"Error": "Usuário ou senha incorretos!"}), 401

    except Exception as e:
        print(f"Deu o erro ao logar: {str(e)}")
        return jsonify({"Error": "Ocorreu erro ao fazer login"}), 500
    finally:
        cursor.close()
        conectar.close()

# Endpoint para refresh do token de acesso
@app.route("/refresh", methods=["POST"])
@jwt_required(refresh=True) # exige um refresh_token para renovação de token
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    try:
        return jsonify(access_token=new_access_token), 200
    except Exception as e:
        print(f"Ocorreu ao renovar o token: {str(e)}")
        return jsonify({"Error": "Ocorreu erro na renovação de token!"}), 500


    

