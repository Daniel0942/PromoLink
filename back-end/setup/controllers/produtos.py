from setup import app
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from setup.BuscadorProdutos.buscador import ProdutosGet

dados_produtos = []

@app.route("/produtos")
@jwt_required()
def produtos_index():
    if len(dados_produtos) > 0:
        return jsonify(dados_produtos), 200
    else:
        return jsonify({"Error": "Sem produtos!"}), 500

@app.route("/produtos/<string:site>", methods=["POST"])
@jwt_required()
def receber_requisisao(site):
    # Referencia a variável global para armazenar os resultados
    global dados_produtos  

    # Pegar o usuário atual do token recebido
    current_user = get_jwt_identity()

    if dados_produtos:
        dados_produtos.clear()

    instancia = ProdutosGet()
    if "Magazine" in site:
        dados_produtos = instancia.magazine()
    elif "Casas" in site:
        dados_produtos = instancia.casasBahia()
    elif "Kabum" in site:
        dados_produtos = instancia.kabum()
    else:
        return jsonify({"Error": "Site não suportado!"}), 400

    # Retorna uma mensagem de sucesso
    return jsonify({"Success": f"Site recebido com sucesso, {current_user}!"}), 200
