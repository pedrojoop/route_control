import time
from datetime import datetime, timedelta
from app import app, db
from models import Rota, Checkin, Empresa, Cliente, Motorista, Produto
from geopy.geocoders import Nominatim
import requests

mapbox_api_key = 'sk.eyJ1IjoicGVkcm9qb29wIiwiYSI6ImNsemlkZTdjYjBlcjUyaXByMzBuOWVjeDcifQ.NXMbPaK1-krq17xrlu3gpw'

# Inicializar o geolocalizador Nominatim
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
    days, remainder = divmod(total_seconds, 86400)
    hours, remainder = divmod(remainder, 3600)
    minutes, seconds = divmod(remainder, 60)
    if days > 0:
        return f"{days} dias, {hours} horas, {minutes} minutos"
    else:
        return f"{hours} horas, {minutes} minutos, {seconds} segundos"

# Configuração dos dados de teste
def setup_test_data():
    with app.app_context():
        # Criar uma empresa
        empresa = Empresa(nome="Empresa Teste", endereco="Endereço Teste", telefone="123456789", email="teste@empresa.com")
        db.session.add(empresa)
        db.session.commit()

        # Criar um cliente
        cliente = Cliente(nome="Cliente Teste", endereco="Endereço Cliente", telefone="987654321", email="cliente@teste.com", empresa_id=empresa.id)
        db.session.add(cliente)
        db.session.commit()

        # Criar um motorista
        motorista = Motorista(nome="Motorista Teste", telefone="111222333", email="motorista@teste.com", empresa_id=empresa.id)
        db.session.add(motorista)
        db.session.commit()

        # Criar um produto
        produto = Produto(descricao="Produto Teste", cliente_id=cliente.id, empresa_id=empresa.id)
        db.session.add(produto)
        db.session.commit()

        # Criar uma rota
        rota = Rota(
            descricao="Rota Teste",
            local_saida="São Paulo, Brasil",
            local_entrega="Rio de Janeiro, Brasil",
            data_inicio=datetime.now(),
            data_fim=datetime.now() + timedelta(days=1),
            empresa_id=empresa.id
        )
        rota.tempo_entrega_estimado, rota.distancia_estimada = calcular_tempo_distancia(rota.local_saida, rota.local_entrega)
        db.session.add(rota)
        db.session.commit()

        # Criar um check-in inicial
        checkin = Checkin(
            motorista_id=motorista.id,
            rota_id=rota.id,
            produto_id=produto.id,
            local="São José dos Campos, Brasil",
            horario=datetime.now(),
            tempo_restante_entrega=calcular_tempo_restante("São José dos Campos, Brasil", rota.local_entrega)
        )
        db.session.add(checkin)
        db.session.commit()

        return rota.id, checkin.id

# Atualizar o check-in após 30 segundos
def update_checkin(checkin_id):
    with app.app_context():
        time.sleep(30)

        checkin = db.session.get(Checkin, checkin_id)
        checkin.local = "Taubaté, Brasil"
        checkin.horario = datetime.now()
        checkin.tempo_restante_entrega = calcular_tempo_restante("Taubaté, Brasil", checkin.rota.local_entrega)
        db.session.commit()

        return checkin

if __name__ == "__main__":
    # Configurar os dados de teste
    rota_id, checkin_id = setup_test_data()
    
    with app.app_context():
        rota = db.session.get(Rota, rota_id)
        checkin = db.session.get(Checkin, checkin_id)
        print(f"Rota criada: {rota.descricao}, Tempo estimado: {formatar_tempo(rota.tempo_entrega_estimado)}, Distância estimada: {rota.distancia_estimada:.2f} km")
        print(f"Check-in inicial: Local: {checkin.local}, Tempo restante de entrega: {formatar_tempo(checkin.tempo_restante_entrega)}")

    # Atualizar o check-in após 30 segundos
    checkin = update_checkin(checkin_id)
    
    with app.app_context():
        checkin = db.session.get(Checkin, checkin_id)
        print(f"Check-in atualizado: Local: {checkin.local}, Tempo restante de entrega: {formatar_tempo(checkin.tempo_restante_entrega)}")
