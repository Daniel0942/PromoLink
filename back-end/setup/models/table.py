import mysql.connector

def Conexao():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="daniel30856377",
        database="promolink"
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
            username_id VARCHAR(100),
            site VARCHAR(100),
            produto TEXT,
            preco DECIMAL(10, 2),
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

    cursor.close()
    conectar.close()