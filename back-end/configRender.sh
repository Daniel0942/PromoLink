# Baixar e instalar o Chrome
apt-get update
apt-get install -y wget unzip
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
dpkg -i google-chrome-stable_current_amd64.deb
apt-get -fy install

# Baixar e instalar o chromedriver em /tmp
wget https://chromedriver.storage.googleapis.com/114.0.5735.90/chromedriver_linux64.zip -P /tmp
unzip /tmp/chromedriver_linux64.zip -d /tmp
chmod +x /tmp/chromedriver
mv /tmp/chromedriver /usr/local/bin/chromedriver

# Verificar se o chromedriver foi movido corretamente
ls -l /usr/local/bin/chromedriver