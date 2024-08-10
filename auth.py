from flask import Blueprint, request, jsonify
from models import db, Empresa

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    nome = data.get('nome')
    endereco = data.get('endereco')
    telefone = data.get('telefone')
    email = data.get('email')
    login = data.get('login')
    senha = data.get('senha')

    if Empresa.query.filter_by(login=login).first():
        return jsonify({"error": "Login já existe"}), 400

    nova_empresa = Empresa(nome=nome, endereco=endereco, telefone=telefone, email=email, login=login)
    nova_empresa.set_password(senha)
    db.session.add(nova_empresa)
    db.session.commit()

    return jsonify({"message": "Empresa registrada com sucesso"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    login = data.get('login')
    senha = data.get('senha')

    empresa = Empresa.query.filter_by(login=login).first()

    if empresa is None or not empresa.check_password(senha):
        return jsonify({"error": "Login ou senha incorretos"}), 401

    return jsonify({"message": "Login realizado com sucesso"}), 200
