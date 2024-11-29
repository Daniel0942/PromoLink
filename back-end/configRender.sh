#!/bin/bash

# Instalação do Google Chrome
apt-get update
apt-get install -y wget unzip
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
dpkg -i google-chrome-stable_current_amd64.deb
apt-get -fy install

# Verifique se o Chrome está instalado
which google-chrome-stable