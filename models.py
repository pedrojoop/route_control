from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Cliente(db.Model):
    __tablename__ = 'clientes'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    endereco = db.Column(db.String(200))
    telefone = db.Column(db.String(15))
    email = db.Column(db.String(100))

class Rota(db.Model):
    __tablename__ = 'rotas'
    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.String(200))
    data_inicio = db.Column(db.Date)
    data_fim = db.Column(db.Date)

class Motorista(db.Model):
    __tablename__ = 'motoristas'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    telefone = db.Column(db.String(15))
    email = db.Column(db.String(100))

class Produto(db.Model):
    __tablename__ = 'produtos'
    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.String(200))
    cliente_id = db.Column(db.Integer, db.ForeignKey('clientes.id'))

class Empresa(db.Model):
    __tablename__ = 'empresa'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    endereco = db.Column(db.String(200))
    telefone = db.Column(db.String(15))
    email = db.Column(db.String(100))

class Checkin(db.Model):
    __tablename__ = 'checkins'
    id = db.Column(db.Integer, primary_key=True)
    motorista_id = db.Column(db.Integer, db.ForeignKey('motoristas.id'))
    rota_id = db.Column(db.Integer, db.ForeignKey('rotas.id'))
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'))
    local = db.Column(db.String(200))
    horario = db.Column(db.DateTime)
    data = db.Column(db.Date)
