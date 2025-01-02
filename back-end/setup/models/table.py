import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

def Conexao():
    db = mysql.connector.connect(
        host = os.getenv("host"),
        user = os.getenv("user"),
        password = os.getenv("password"),
        database = os.getenv("database"),
        port = int(os.getenv("port"))
    )
    return db

def CriarTabelas():
    conectar = Conexao()
    cursor = conectar.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(200) NOT NULL,
        password VARCHAR(50) NOT NULL
    )""")
    conectar.commit()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS favoritos (
        id INT PRIMARY KEY AUTO_INCREMENT,
            username_id VARCHAR(100) NOT NULL,
            url TEXT NOT NULL,
            site VARCHAR(100) NOT NULL,
            produto TEXT NOT NULL,
            preco TEXT NOT NULL,
            link TEXT NOT NULL,
            FOREIGN KEY (username_id) REFERENCES users(username)
        )""")
    conectar.commit()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS historico (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username_id VARCHAR(100) NOT NULL,
    site TEXT NOT NULL,
    data_e_hora DATETIME NOT NULL, 
    FOREIGN KEY (username_id) REFERENCES users(username)
    )""")
    conectar.commit()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS pesquisas (
        id INT PRIMARY KEY AUTO_INCREMENT,
            username_id VARCHAR(100) NOT NULL,
            pesquisa VARCHAR(100) NOT NULL,
            url TEXT NOT NULL,
            site VARCHAR(100) NOT NULL,
            produto TEXT NOT NULL,
            preco TEXT NULL,
            link TEXT NOT NULL, 
            FOREIGN KEY (username_id) REFERENCES users(username)
    )""")

    cursor.close()
    conectar.close()