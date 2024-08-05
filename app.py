from flask import Flask
from config import Config
from models import db
from routes import bp
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
CORS(app)

with app.app_context():
    db.create_all()

app.register_blueprint(bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
