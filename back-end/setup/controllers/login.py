from setup import app
from flask import request, jsonify
from setup.models.table import Conexao
import mysql.connector.errors
from flask_jwt_extended import create_access_token

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
            
            # Criar o token e envia-lo ao front-end
            token = create_access_token(identity=username)
            return jsonify(access_token=token, username=username)

        return jsonify({"Error": "Usuário ou senha incorretos!"}), 401

    except Exception as e:
        print(f"Deu o erro ao logar: {str(e)}")
        return jsonify({"Error": "Ocorreu erro ao fazer login"}), 500
    finally:
        cursor.close()
        conectar.close()



    

