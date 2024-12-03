from setup import app
from flask import request, jsonify
from setup.BuscadorProdutos.buscador import PesquisaSite

gerenciadorPesquisa = []

@app.route("/pesquisar")
def pesquisa_index():
    if gerenciadorPesquisa:
        return jsonify(gerenciadorPesquisa)
    else:
        return jsonify({"Response": "sem dados!"})

# função para pesquisar o produto de todos os sites e fazer a comparação
#@app.route("/pesquisar/<string:pesquisa>", methods=["POST"])
def pesquisar(pesquisa):
    global gerenciadorPesquisa

    instancia = PesquisaSite()
    try:
        gerenciadorPesquisa.append(instancia.pesquisarKabum(pesquisa))
        gerenciadorPesquisa.append(instancia.pesquisarCasasBahia(pesquisa))
        gerenciadorPesquisa.append(instancia.pesquisarMagazine(pesquisa))
    except Exception as e:
        print(f"Ocorreu o erro pesquisar produtos nos sites: {str(e)}")