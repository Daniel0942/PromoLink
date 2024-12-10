from setup import app
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from setup.models.table import Conexao
import mysql.connector.errors

@app.route("/favoritos/<string:username_id>", methods=["GET"])
@jwt_required()
def favoritos_index(username_id):
    conectar = Conexao()
    cursor = conectar.cursor(dictionary=True)
    cursor.execute("SELECT * FROM favoritos WHERE username_id = %s", (username_id,))
    favoritos = cursor.fetchall()
    cursor.close()
    conectar.close()
    return jsonify(favoritos)

@app.route("/favoritos", methods=["POST"])
@jwt_required()
def adicionar_favorito():
    data = request.get_json()

    username = get_jwt_identity()
    site = data.get("site")
    produto = data.get("produto")
    url = data.get("url")
    link = data.get("link")
    preco = data.get("preco")

    try:
        conectar = Conexao()
        cursor = conectar.cursor()
        cursor.execute("INSERT INTO favoritos (username_id, url, site, produto, preco, link) VALUES (%s, %s, %s, %s, %s, %s)", (username, url, site, produto, preco, link))
        conectar.commit()
        return jsonify({"Success": "Produto inserido com sucesso!"}), 200
    except mysql.connector.errors.IntegrityError as erro: 
        if erro.errno == 1452:
            print(f"[ERROR], A chave estrangeira username_id na tabela favoritos não está conseguindo referenciar uma entrada válida na tabela users, provalvelmente o usuário não está logado!")
            return jsonify({"Error": "Usuário não está logado!"}), 500
    except Exception as e: 
        print(f"Ocorreu o erro ao inserir o produto aos favoritos: {str(e)}")
        return jsonify({"Error": "Falha ao inserir o produto!"}), 500
    finally:
        cursor.close()
        conectar.close()
    
@app.route("/favoritos/<int:id>", methods=["POST"])
def remover_favorito(id):
    conectar = Conexao()
    try:
        cursor = conectar.cursor()
        cursor.execute("DELETE FROM favoritos WHERE id = %s", (id,))
        conectar.commit()
        return jsonify({"Success": "Produto deletado com sucesso"})
    except Exception as e:
        print(f"Ocorreu o erro ao deletar favorito: {str(e)}")
        return jsonify({"Error": "Ocorreu o erro ao deletar produto!"})
    finally:
        cursor.close()
        conectar.close()
