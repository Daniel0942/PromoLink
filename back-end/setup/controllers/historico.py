from setup.models.table import Conexao
from setup import app
from flask import jsonify, request, session
from datetime import datetime

@app.route("/historico")
def historico_index():
    conectar = Conexao()
    cursor = conectar.cursor(dictionary=True)
    cursor.execute("SELECT * FROM historico")
    historico = cursor.fetchall()
    cursor.close()
    conectar.close()
    return jsonify(historico)


@app.route("/historico/<string:site>", methods=["POST"])
def inserir_produtos_historico(site):
    username_id = "Daniel" # session.get("username")
    site = site
    data_e_hora = datetime.now()
    try:
        conectar = Conexao()
        cursor = conectar.cursor()
        cursor.execute("INSERT INTO historico (username_id, site, data_e_hora) VALUES (%s, %s, %s)", (username_id, site, data_e_hora))
        conectar.commit()
        return jsonify({"resposta": "deu certo"}), 200

    except Exception as e: 
        print(f"Ocorreu o erro inserir historico no banco de dados: {str(e)}")
        return jsonify({"resposta": "deu errado"}), 500
    finally: 
        cursor.close()
        conectar.close()