from setup import app
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from setup.BuscadorProdutos.buscador import ProdutosGet

produtos_kabum = []
produtos_casasBahia = []
produtos_magazine = []

@app.route("/produtos/kabum")
@jwt_required()
def kabum():
    if len(produtos_kabum) > 0:
        return jsonify(produtos_kabum), 200
    else:
        return jsonify({"Error": "Sem produtos!"}), 404

@app.route("/produtos/casasBahia")
@jwt_required()
def casasBahia():
    if len(produtos_casasBahia) > 0:
        return jsonify(produtos_casasBahia), 200
    else:
        return jsonify({"Error": "Sem produtos!"}), 404

@app.route("/produtos/magazine")
@jwt_required()
def magazine():
    if len(produtos_magazine) > 0:
        return jsonify(produtos_magazine), 200
    else:
        return jsonify({"Error": "Sem produtos!"}), 404

@app.route("/produtos/<string:site>", methods=["POST"])
@jwt_required()
def receber_requisisao(site):
    global produtos_casasBahia, produtos_kabum, produtos_magazine

    # Pegar o usuário atual do token recebido
    current_user = get_jwt_identity()
    try:
        instancia = ProdutosGet()
        if "Magazine" in site:
            produtos_magazine = instancia.magazine()
        elif "Casas" in site:
            produtos_casasBahia = instancia.casasBahia()
        elif "Kabum" in site:
            produtos_kabum = instancia.kabum()
        else:
            return jsonify({"Error": "Site não suportado!"}), 400

        # Retorna uma mensagem de sucesso
        return jsonify({"Success": f"Site recebido com sucesso, {current_user}!"}), 200
    except Exception as e:
        print(f"Ocorreu o erro: {str(e)}")
        return jsonify({"Error": "Ocorreu erro buscar produtos!"})