from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Empresa(db.Model):
    __tablename__ = 'empresas'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    endereco = db.Column(db.String(200))
    telefone = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(100))
    login = db.Column(db.String(50), unique=True, nullable=False)
    senha_hash = db.Column(db.String(512), nullable=False)

    # Relacionamentos
    clientes = db.relationship('Cliente', backref='empresa', lazy=True)
    motoristas = db.relationship('Motorista', backref='empresa', lazy=True)
    produtos = db.relationship('Produto', backref='empresa', lazy=True)
    rotas = db.relationship('Rota', backref='empresa', lazy=True)

    def as_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}

    def set_password(self, senha):
        self.senha_hash = generate_password_hash(senha)

    def check_password(self, senha):
        return check_password_hash(self.senha_hash, senha)

class Cliente(db.Model):
    __tablename__ = 'clientes'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    endereco = db.Column(db.String(200))
    telefone = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(100))
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresas.id'))

    def as_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}

class Motorista(db.Model):
    __tablename__ = 'motoristas'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    placa = db.Column(db.String(10))
    cpf_cnpj = db.Column(db.String(20))
    telefone = db.Column(db.String(15))
    email = db.Column(db.String(100))
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresas.id'))

    def as_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}

class Produto(db.Model):
    __tablename__ = 'produtos'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    descricao = db.Column(db.String(200))
    cliente_id = db.Column(db.Integer, db.ForeignKey('clientes.id'))
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresas.id'))

    def as_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}

class Rota(db.Model):
    __tablename__ = 'rotas'
    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.String(200))
    local_saida = db.Column(db.String(200))
    local_entrega = db.Column(db.String(200))
    data_inicio = db.Column(db.DateTime)
    data_fim = db.Column(db.DateTime)
    tempo_entrega_estimado = db.Column(db.Interval)
    distancia_estimada = db.Column(db.Float)
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresas.id'))

    def as_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}

class Checkin(db.Model):
    __tablename__ = 'checkins'
    id = db.Column(db.Integer, primary_key=True)
    motorista_id = db.Column(db.Integer, db.ForeignKey('motoristas.id'))
    rota_id = db.Column(db.Integer, db.ForeignKey('rotas.id'))
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'))
    local = db.Column(db.String(200))
    horario = db.Column(db.DateTime)
    tempo_restante_entrega = db.Column(db.Interval)

    # Relacionamento com Produto
    produto = db.relationship('Produto', backref='checkins')
