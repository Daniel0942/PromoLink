from setup import app
from flask import jsonify, request
from setup.BuscadorProdutos.buscador import ProdutosGet

dados_produtos = []

@app.route("/produtos")
def produtos_index():
    return jsonify(dados_produtos)

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
        return jsonify({"error": "Site não suportado"}), 400

    # Retorna uma mensagem de sucesso
    return jsonify({"message": "Dados recebidos com sucesso"}), 200
