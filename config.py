import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://usuario:senha@localhost/seu_banco_de_dados')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
