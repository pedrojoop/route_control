from flask import Blueprint, request, jsonify
from models import db, Empresa

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/create_empresa', methods=['POST'])
def create_empresa():
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

    return jsonify({"message": "Empresa criada com sucesso", "empresa_id": nova_empresa.id}), 201
