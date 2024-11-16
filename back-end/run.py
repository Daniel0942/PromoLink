from setup import app
from setup.models.table import CriarTabelas

if __name__ == "__main__":
    CriarTabelas()
    app.run(debug=True)