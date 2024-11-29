from setup.models.table import Conexao
from setup import app
from flask import jsonify, request, session
from datetime import datetime

@app.route("/historico/<string:username_id>", methods=["GET"])
def historico_index(username_id):
    conectar = Conexao()
    cursor = conectar.cursor(dictionary=True)
    cursor.execute("SELECT * FROM historico where username_id = %s", (username_id,))
    historico = cursor.fetchall()
    cursor.close()
    conectar.close()
    return jsonify(historico)


@app.route("/historico", methods=["POST"])
def inserir_produtos_historico():
    data = request.get_json()
    
    username_id = data.get("username_id")
    site = data.get("site")
    data_e_hora = datetime.now()
    try:
        conectar = Conexao()
        cursor = conectar.cursor()
        cursor.execute("INSERT INTO historico (username_id, site, data_e_hora) VALUES (%s, %s, %s)", (username_id, site, data_e_hora))
        conectar.commit()
        return jsonify({"resposta": "inserido no historico com sucesso"}), 200

    except Exception as e: 
        print(f"Ocorreu o erro inserir historico no banco de dados: {str(e)}")
        return jsonify({"resposta": "deu errado ao inserir no historico"}), 500
    finally: 
        cursor.close()
        conectar.close()