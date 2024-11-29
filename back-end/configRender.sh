#!/bin/bash
# Baixar e instalar o Chrome
apt-get update
apt-get install -y wget unzip
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
dpkg -i google-chrome-stable_current_amd64.deb
apt-get -fy install

# Baixar e descompactar o chromedriver em /tmp
wget https://chromedriver.storage.googleapis.com/114.0.5735.90/chromedriver_linux64.zip -P /tmp
unzip /tmp/chromedriver_linux64.zip -d /tmp

# Tornar o chromedriver executável e movê-lo para um diretório acessível
chmod +x /tmp/chromedriver
mv /tmp/chromedriver /opt/render/project/src/chromedriver  # Mover para o diretório do projeto

# Verificar se o chromedriver foi movido corretamente
ls -l /opt/render/project/src/chromedriver