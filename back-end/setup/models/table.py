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
    cursor.close()
    conectar.close()

def AdicionarValores():
    con = Conexao()
    cursor = con.cursor()
    cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s,%s)", ("Daniel", "danielufc131@gmail.com", "0942"))
    con.commit()
    cursor.close()
    con.close()