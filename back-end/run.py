from setup import app
from setup.models.table import CriarTabelas

if __name__ == "__main__":
    CriarTabelas()
    app.run(host="0.0.0.0", port=5000, debug=True)