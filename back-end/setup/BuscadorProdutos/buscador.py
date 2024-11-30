from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from time import sleep

class ProdutosGet():
    def __init__(self):
        options = Options()
        options.add_argument("--headless")  # Modo headless (sem interface gráfica)
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.binary_location = "/usr/bin/chromium"

        servico = Service(ChromeDriverManager().install())
        self.navegador = webdriver.Chrome(service=servico, options=options)

    def magazine(self):
        self.navegador.get("https://www.magazineluiza.com.br/selecao/ofertasdodia/")

        sleep(2)
        produtos_img = self.navegador.find_elements(By.CLASS_NAME, 'sc-dcjTxL')
        produtos_titulo = self.navegador.find_elements(By.TAG_NAME, 'h2')
        precos = self.navegador.find_elements(By.TAG_NAME, 'p')
        gerenciador_magazine = []

        # Pegar atributo elemento img do elemento div
        imgs = [div.find_element(By.TAG_NAME, "img") for div in produtos_img]
        # Extrair urls das tags imgs
        urls_imgs = [img.get_attribute("src") for img in imgs if img.get_attribute("src")]
        produtos = [produto.text for produto in produtos_titulo if produto.text]
        precos_produtos = [preco.text for preco in precos if preco.get_attribute("data-testid") == "price-value" and preco.get_attribute("color") == "#404040"]

        # Monta os dados
        for url, produto, preco in zip(urls_imgs, produtos, precos_produtos):
            gerenciador_magazine.append({"url": url, "produto": produto, "preco": preco[3:]})

        self.navegador.quit()
        return gerenciador_magazine
        
    def casasBahia(self):
        sleep(2)
        self.navegador.get("https://www.casasbahia.com.br/c?filtro=D18858&ordenacao=maisVendidos&icid=199154_hp_stc_c7_ps1_b0_pb1")

        produtos_img = self.navegador.find_elements(By.CLASS_NAME, "product-card__details-wrapper")
        produtos_titulo = self.navegador.find_elements(By.TAG_NAME, 'span')
        produtos_precos = self.navegador.find_elements(By.TAG_NAME, 'div')
        gerenciador_casasBahia = []
        
        imgs = [div.find_element(By.TAG_NAME, "img") for div in produtos_img]
        urls_imgs = [img.get_attribute("src") for img in imgs if img.get_attribute("src")]

        produtos = [produto.text for produto in produtos_titulo if produto.get_attribute("aria-hidden") == "true" and "estrelas" not in produto.text and len(produto.text) > 20 and "com juros" not in produto.text]

        precos = [preco.text for preco in produtos_precos if preco.text and preco.get_attribute("class") == "product-card__highlight-price" and preco.get_attribute("aria-hidden") == "true"]
        
        if len(produtos) == len(precos) and len(produtos) == len(urls_imgs):
            for url, produto, preco in zip(urls_imgs, produtos, precos):
                gerenciador_casasBahia.append({"url": url, "produto": produto, "preco": preco})
        else:
            print(f"Erro: O número de produtos {len(produtos)}, precos {len(precos)} e urls {len(urls_imgs)}. Não são correspondentes!")

        self.navegador.quit()
        return gerenciador_casasBahia

    def kabum(self):
        self.navegador.get("https://www.kabum.com.br/ofertas/ofertadodia?pagina=1&limite=20")
        gerenciador_kabum = []

        produtos_img = self.navegador.find_elements(By.TAG_NAME, "img")
        produtos_span = self.navegador.find_elements(By.TAG_NAME, 'span')

        urls_imgs = [img.get_attribute("src") for img in produtos_img if img.get_attribute("class") == "imageCard"]

        produtos = [produto.text for produto in produtos_span if produto.get_attribute("height") == "54"]

        precos = [preco.text for preco in produtos_span if preco.get_attribute("class") == "sc-57f0fd6e-2 hjJfoh priceCard"]

        if len(produtos) == len(precos) and len(produtos) == len(urls_imgs):
            for url, produto, preco in zip(urls_imgs, produtos, precos):
                gerenciador_kabum.append({"url": url, "produto": produto, "preco": preco})
        else:
            print("Erro: O número de produtos e urls não corresponde ao número de preços.")
        return gerenciador_kabum