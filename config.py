import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:2303@localhost/control_route')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
