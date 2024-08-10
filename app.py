from flask import Flask, request, jsonify
from config import Config
from models import db, Rota, Checkin, Empresa, Cliente, Motorista, Produto
from routes import bp
from admin import admin_bp
from auth import auth_bp
from flask_cors import CORS
from flask_migrate import Migrate
from geopy.geocoders import Nominatim
import requests
from datetime import datetime, timedelta

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

with app.app_context():
    db.create_all()

app.register_blueprint(bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(admin_bp, url_prefix='/admin')

# Configurações da API
mapbox_api_key = 'sk.eyJ1IjoicGVkcm9qb29wIiwiYSI6ImNsemlkZTdjYjBlcjUyaXByMzBuOWVjeDcifQ.NXMbPaK1-krq17xrlu3gpw'
geolocator = Nominatim(user_agent="route_control")

def geocode_local(local):
    location = geolocator.geocode(local)
    if location:
        return [location.longitude, location.latitude]
    return None

def calcular_tempo_distancia(local_saida, local_entrega):
    coords_saida = geocode_local(local_saida)
    coords_entrega = geocode_local(local_entrega)
    if not coords_saida or not coords_entrega:
        raise ValueError("Não foi possível geocodificar os locais de saída ou entrega")
    
    url = f"https://api.mapbox.com/directions/v5/mapbox/driving/{coords_saida[0]},{coords_saida[1]};{coords_entrega[0]},{coords_entrega[1]}"
    params = {
        'access_token': mapbox_api_key,
        'geometries': 'geojson',
        'overview': 'full',
        'steps': 'true'
    }
    response = requests.get(url, params=params)
    data = response.json()

    if 'routes' not in data or len(data['routes']) == 0:
        raise ValueError(f"Erro ao obter rotas: {data}")

    tempo_estimado = data['routes'][0]['duration']  # Em segundos
    distancia = data['routes'][0]['distance']  # Em metros
    return timedelta(seconds=tempo_estimado), distancia / 1000  # Converta a distância para quilômetros

def calcular_tempo_restante(local_atual, local_entrega):
    coords_atual = geocode_local(local_atual)
    coords_entrega = geocode_local(local_entrega)
    if not coords_atual or not coords_entrega:
        raise ValueError("Não foi possível geocodificar os locais atuais ou de entrega")
    
    url = f"https://api.mapbox.com/directions/v5/mapbox/driving/{coords_atual[0]},{coords_atual[1]};{coords_entrega[0]},{coords_entrega[1]}"
    params = {
        'access_token': mapbox_api_key,
        'geometries': 'geojson',
        'overview': 'full',
        'steps': 'true'
    }
    response = requests.get(url, params=params)
    data = response.json()

    if 'routes' not in data or len(data['routes']) == 0:
        raise ValueError(f"Erro ao obter rotas: {data}")

    tempo_restante = data['routes'][0]['duration']  # Em segundos
    return timedelta(seconds=tempo_restante)

def formatar_tempo(timedelta_obj):
    total_seconds = int(timedelta_obj.total_seconds())
    days, remainder = divmod(total_seconds, 86400)  # 86400 segundos em um dia
    hours, remainder = divmod(remainder, 3600)
    minutes, seconds = divmod(remainder, 60)
    if days > 0:
        return f"{days} dias, {hours} horas, {minutes} minutos"
    else:
        return f"{hours} horas, {minutes} minutos, {seconds} segundos"

# Função para criar uma nova rota associada à empresa
def criar_rota(descricao, local_saida, local_entrega, empresa_id):
    with app.app_context():
        rota = Rota(
            descricao=descricao,
            local_saida=local_saida,
            local_entrega=local_entrega,
            data_inicio=datetime.now(),
            data_fim=datetime.now() + timedelta(days=1),
            empresa_id=empresa_id
        )
        rota.tempo_entrega_estimado, rota.distancia_estimada = calcular_tempo_distancia(rota.local_saida, rota.local_entrega)
        db.session.add(rota)
        db.session.commit()
        return rota

# Função para criar um novo check-in associado à empresa
def criar_checkin(motorista_id, rota_id, produto_id, local):
    with app.app_context():
        checkin = Checkin(
            motorista_id=motorista_id,
            rota_id=rota_id,
            produto_id=produto_id,
            local=local,
            horario=datetime.now(),
            tempo_restante_entrega=calcular_tempo_restante(local, Rota.query.get(rota_id).local_entrega)
        )
        db.session.add(checkin)
        db.session.commit()
        return checkin

if __name__ == '__main__':
    app.run(debug=True)
