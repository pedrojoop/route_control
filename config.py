import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:2303@localhost/banco_teste')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
