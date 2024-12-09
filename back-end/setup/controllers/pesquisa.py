from setup import app
from flask import request, jsonify
from setup.BuscadorProdutos.buscador import PesquisaSite
from flask_jwt_extended import jwt_required, get_jwt_identity
from setup.models.table import Conexao

@app.route("/pesquisar/<string:pesquisa>", methods=["GET"])
@jwt_required()
def pesquisa_index(pesquisa):
    username = get_jwt_identity()
    
    conectar = Conexao()
    cursor = conectar.cursor(dictionary=True)
    cursor.execute("SELECT * FROM pesquisas WHERE username_id = %s AND pesquisa = %s", (username, pesquisa))
    produtos_pesquisa = cursor.fetchall()
    if produtos_pesquisa:
        return jsonify(produtos_pesquisa), 200
    else:
        return jsonify({"Error": "Não encontrado"}), 404

# função para pesquisar o produto de todos os sites e fazer a comparação
@app.route("/pesquisar/<string:pesquisa>", methods=["POST"])
@jwt_required()
def pesquisar(pesquisa):
    username = get_jwt_identity()
    gerenciadorProdutos = []

    instancia = PesquisaSite()
    try:
        gerenciadorProdutos.append(instancia.pesquisarKabum(pesquisa))
        gerenciadorProdutos.append(instancia.pesquisarCasasBahia(pesquisa))
        gerenciadorProdutos.append(instancia.pesquisarMagazine(pesquisa))

        try:
            conectar = Conexao()
            cursor = conectar.cursor()

            # Primeiramente verificar se o usuário ja fez aquela pesquisa de produtos
            cursor.execute("SELECT pesquisa FROM pesquisas WHERE username_id = %s AND pesquisa = %s", (username, pesquisa))
            resultado_pesquisa = cursor.fetchall()

            if resultado_pesquisa:
                # Excluir os registros anteriores para evitar duplicidade
                cursor.execute("DELETE FROM pesquisas WHERE username_id = %s AND pesquisa = %s", (username, pesquisa))
                conectar.commit()
            
            # Estrutura do gerenciadorProdutos: uma lista com 3 dicionarios
            site_names = ["Kabum", "Casas Bahia", "Magazine"]
            for i, produtos_site in enumerate(gerenciadorProdutos):
                site = site_names[i]
                for produto_dict in produtos_site:
                    url = produto_dict["url"]
                    produto = produto_dict["produto"]
                    preco = produto_dict["preco"]
                    link = produto_dict["link"]
                    
                    # Verificar se a URL já está presente no banco (evitar duplicidade)
                    cursor.execute("SELECT url FROM pesquisas WHERE url = %s", (url,))
                    resultado_url = cursor.fetchone()
                    if not resultado_url:  # Se não existir, insira no banco
                        cursor.execute(
                            "INSERT INTO pesquisas (username_id, pesquisa, url, site, produto, preco, link) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                            (username, pesquisa, url, site, produto, preco, link)
                            )
            conectar.commit()

        except Exception as e:
            print(f"Ocorreu o erro com database: {str(e)}")   
            return jsonify({"Error": "Problema interno com o servidor"}), 500
        finally:
            cursor.close()
            conectar.close()

        return jsonify({"Success": "pesquisa feita com sucesso"})
    except Exception as e:
        print(f'Ocorreu o erro ao fazer a pesquisa "{pesquisa}" nos sites: {str(e)}')
        return jsonify({"Error": "ocorreu um ao fazer a pesquisa"})
