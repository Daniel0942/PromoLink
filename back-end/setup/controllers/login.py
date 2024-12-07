from setup import app
from flask import request, jsonify, session
from setup.models.table import Conexao
import mysql.connector.errors

# função para validação do login
@app.route("/users", methods=["POST"])
def Logar():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")
    print(f"O email: {email}")
    try:
        conectar = Conexao()
        cursor = conectar.cursor(dictionary=True)
        # pegar somente o username do usuário logado para armazenar na sessão 
        cursor.execute("SELECT username FROM users WHERE email = %s AND password = %s", ( email, password))
        resultado = cursor.fetchone()
        if resultado:
            username = resultado["username"] # extrair username do resultado
            session["username"] = username
            return jsonify({
                "Success": "Usuário com sucesso!",
                "Username": username
                }), 200
        else:
            return jsonify({"Error": "Usuário ou senha incorretos!"}), 401

    except Exception as e:
        print(f"Deu o erro ao logar: {str(e)}")
        return jsonify({"Error": "Ocorreu erro ao fazer login"}), 500
    finally:
        cursor.close()
        conectar.close()
    

