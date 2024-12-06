from setup import app
from flask import request, jsonify
from setup.models.table import Conexao
import mysql.connector.errors

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
def adicionar_favorito():
    data = request.get_json()

    username_id = data.get("username_id")
    site = data.get("site")
    produto = data.get("produto")
    url = data.get("url")
    link = data.get("link")

    # O preco vem com "R$", e "," e pode ter valores com mais de um ponto.
    # Remover "R$", substituir "," por "." e corrigir separadores de milhar.
    preco_sifrão = data.get("preco")
    if "juros" not in preco_sifrão and "Preço não disponível" not in preco_sifrão:
        preco = preco_sifrão[3:].replace(",", ".")  # Remove "R$" e troca "," por "."
        if preco.count(".") > 1:  # Se houver mais de um ponto, remova os extras.
            preco = preco.replace(".", "", preco.count(".") - 1)

    elif "juros" in preco_sifrão:
        preco = preco_sifrão.split()[1] # Separa por espaço e pega o segundo valor
        preco = preco.replace(",", ".")
        if preco.count(".") > 1:
            preco = preco.replace(".", "", preco.count(".") - 1)

    elif "Preço não disponível" in preco_sifrão:
        preco = None

    try:
        conectar = Conexao()
        cursor = conectar.cursor()
        cursor.execute("INSERT INTO favoritos (username_id, url, site, produto, preco, link) VALUES (%s, %s, %s, %s, %s, %s)", (username_id, url, site, produto, preco, link))
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
