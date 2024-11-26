from setup import app
from flask import request, jsonify
from setup.models.table import Conexao

@app.route("/favoritos/<string:username_id>", methods=["GET"])
def favoritos_index(username_id):
    conectar = Conexao()
    cursor = conectar.cursor(dictionary=True)
    cursor.execute("SELECT * FROM favoritos WHERE username_id = %s", (username_id,))
    favoritos = cursor.fetchall()
    cursor.close()
    conectar.close()
    return jsonify(favoritos)

@app.route("/favoritos", methods=["POST"])
def selecionar_favorito():
    data = request.get_json()

    username_id = data.get("username_id")
    site = data.get("site")
    produto = data.get("produto")
    preco_com_sifrão = data.get("preco")
    # Remover o R$ do preço, e trocar a virgula pelo ponto
    preco = preco_com_sifrão[3:].replace(",", ".") 
    url = data.get("url")
    
    try:
        conectar = Conexao()
        cursor = conectar.cursor()
        cursor.execute("INSERT INTO favoritos (username_id, url, site, produto, preco) VALUES (%s, %s, %s, %s, %s)", (username_id, url, site, produto, preco))
        conectar.commit()
        return jsonify({"Success": "Produto inserido com sucesso!"}), 200
    except Exception as e: 
        print(f"Ocorreu o erro ao inserir o produto aos favoritos: {str(e)}")
        return jsonify({"ERROR": "Falha ao inserir o produto!"}), 500
    finally:
        cursor.close()
        conectar.close()
    