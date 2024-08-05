from flask import Blueprint, request, jsonify
from models import db, Cliente, Rota, Motorista, Produto, Empresa, Checkin

bp = Blueprint('api', __name__)

@bp.route('/clientes', methods=['GET'])
def get_clientes():
    clientes = Cliente.query.all()
    return jsonify([cliente.as_dict() for cliente in clientes])

@bp.route('/rotas', methods=['GET'])
def get_rotas():
    rotas = Rota.query.all()
    return jsonify([rota.as_dict() for rota in rotas])

@bp.route('/motoristas', methods=['GET'])
def get_motoristas():
    motoristas = Motorista.query.all()
    return jsonify([motorista.as_dict() for motorista in motoristas])

@bp.route('/produtos', methods=['GET'])
def get_produtos():
    produtos = Produto.query.all()
    return jsonify([produto.as_dict() for produto in produtos])

@bp.route('/empresa', methods=['GET'])
def get_empresa():
    empresas = Empresa.query.all()
    return jsonify([empresa.as_dict() for empresa in empresas])

@bp.route('/checkin', methods=['POST'])
def create_checkin():
    data = request.json
    novo_checkin = Checkin(
        motorista_id=data['motorista_id'],
        rota_id=data['rota_id'],
        produto_id=data['produto_id'],
        local=data['local'],
        horario=data['horario'],
        data=data['data']
    )
    db.session.add(novo_checkin)
    db.session.commit()
    return jsonify({'message': 'Check-in registrado com sucesso'})
