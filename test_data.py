from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Empresa, Cliente, Produto, Rota, Checkin, Motorista
from datetime import datetime, timedelta

# Configuração do banco de dados (use um banco de dados de teste)
engine = create_engine('postgresql://postgres:2303@localhost/banco_teste')
Session = sessionmaker(bind=engine)
session = Session()

# Função para criar dados fictícios
def create_test_data():
    # Criar a primeira empresa
    empresa1 = Empresa(
        nome="Empresa Teste 1",
        endereco="Endereço Teste 1",
        telefone="558586807835", 
        email="empresa1@teste.com",
        login="empresa_teste1"
    )
    empresa1.set_password("senha123")
    session.add(empresa1)
    session.commit()

    # Criar a segunda empresa
    empresa2 = Empresa(
        nome="Empresa Teste 2",
        endereco="Endereço Teste 2",
        telefone="558596877482", 
        email="empresa2@teste.com",
        login="empresa_teste2"
    )
    empresa2.set_password("senha123")
    session.add(empresa2)
    session.commit()

    # Criar um cliente para cada empresa
    cliente1 = Cliente(
        nome="Cliente Teste 1",
        endereco="Endereço Cliente 1",
        telefone="558586807835",
        email="cliente1@teste.com",
        empresa_id=empresa1.id
    )
    cliente2 = Cliente(
        nome="Cliente Teste 2",
        endereco="Endereço Cliente 2",
        telefone="558596877482",
        email="cliente2@teste.com",
        empresa_id=empresa2.id
    )
    session.add_all([cliente1, cliente2])
    session.commit()

    # Criar motoristas
    motorista1 = Motorista(
        nome="Motorista Teste 1",
        placa="ABC-1234",
        cpf_cnpj="12345678900",
        telefone="558586807835",
        email="motorista1@teste.com",
        empresa_id=empresa1.id
    )
    motorista2 = Motorista(
        nome="Motorista Teste 2",
        placa="XYZ-5678",
        cpf_cnpj="98765432100",
        telefone="558596877482",  
        email="motorista2@teste.com",
        empresa_id=empresa2.id
    )
    session.add_all([motorista1, motorista2])
    session.commit()

    # Criar produtos com nome e descrição
    produto1 = Produto(
        nome="Produto 1",
        descricao="Descrição do Produto 1",
        cliente_id=cliente1.id,
        empresa_id=empresa1.id
    )
    produto2 = Produto(
        nome="Produto 2",
        descricao="Descrição do Produto 2",
        cliente_id=cliente2.id,
        empresa_id=empresa2.id
    )
    session.add_all([produto1, produto2])
    session.commit()

    # Criar rotas
    rota1 = Rota(
        descricao="Rota Teste 1",
        local_saida="Local de Saída Teste 1",
        local_entrega="Local de Entrega Teste 1",
        data_inicio=datetime.now(),
        data_fim=datetime.now() + timedelta(days=1),
        empresa_id=empresa1.id
    )
    rota2 = Rota(
        descricao="Rota Teste 2",
        local_saida="Local de Saída Teste 2",
        local_entrega="Local de Entrega Teste 2",
        data_inicio=datetime.now(),
        data_fim=datetime.now() + timedelta(days=1),
        empresa_id=empresa2.id
    )
    session.add_all([rota1, rota2])
    session.commit()

    # Criar check-ins
    checkin1 = Checkin(
        motorista_id=motorista1.id,
        rota_id=rota1.id,
        produto_id=produto1.id,
        local="Local 1",
        horario=datetime.now(),
        tempo_restante_entrega=timedelta(hours=5, minutes=30)  # Exemplo de tempo restante
    )
    checkin2 = Checkin(
        motorista_id=motorista2.id,
        rota_id=rota2.id,
        produto_id=produto2.id,
        local="Local 2",
        horario=datetime.now() + timedelta(hours=1),
        tempo_restante_entrega=timedelta(hours=3, minutes=45)  # Exemplo de tempo restante
    )
    session.add_all([checkin1, checkin2])
    session.commit()

    print("Dados de teste criados com sucesso.")

if __name__ == "__main__":
    create_test_data()
