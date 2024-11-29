from setup import app
from flask import jsonify, request
from setup.BuscadorProdutos.buscador import ProdutosGet

dados_produtos = []

@app.route("/produtos")
def produtos_index():
    if len(dados_produtos) > 0:
        return jsonify(dados_produtos), 200
    else:
        return jsonify({"Error": "Sem produtos!"}), 500

@app.route("/produtos/<string:site>", methods=["POST"])
def receber_requisisao(site):
    global dados_produtos  # Referencia a variável global para armazenar os resultados

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
    return jsonify({"Success": "Site recebido com sucesso!"}), 200
