# Documentação do Backend

## Visão Geral

Este backend é construído usando Flask, Flask-SQLAlchemy e Flask-CORS, e se conecta a um banco de dados PostgreSQL. Ele fornece uma API RESTful para gerenciar clientes, rotas, motoristas, produtos, informações da empresa e check-ins.

## Estrutura do Projeto

```plaintext
meu_projeto/
├── app.py
├── models.py
├── routes.py
├── config.py
└── __init__.py
```

# Dependências

As seguintes bibliotecas são necessárias:

```
├── Flask
├── Flask-SQLAlchemy
├── Flask-CORS
└── psycopg2-binary
```

# Configuração do Ambiente

Instalar as dependências:
```
pip install flask flask_sqlalchemy flask_cors psycopg2-binary
```

# Configurar o Banco de Dados PostgreSQL:

Certifique-se de que o PostgreSQL está instalado e configurado no seu sistema. Crie um banco de dados para o seu projeto:

```
CREATE DATABASE my_bank;
```

Configuração dos Arquivos

config.py:
- Define a configuração do banco de dados.

models.py:
- Define os modelos de dados usando SQLAlchemy.

routes.py:
- Define as rotas da API para interagir com os dados.

app.py:
- Arquivo principal do aplicativo Flask.

__init__.py:
- Arquivo de inicialização do pacote. Pode ser deixado vazio ou usado para inicializações adicionais se necessário.

# Criação do Banco de Dados

Para criar as tabelas no banco de dados, execute o seguinte comando:

```
python app.py
```

# Testar a API

Para testar a API, execute o servidor Flask:

```
python app.py
```

- A API estará disponível em http://localhost:5000/api

# Endpoints da API:

GET /api/clientes:
- Retorna uma lista de todos os clientes.

GET /api/rotas:
- Retorna uma lista de todas as rotas.

GET /api/motoristas:
- Retorna uma lista de todos os motoristas.

GET /api/produtos:
- Retorna uma lista de todos os produtos.

GET /api/empresa:
- Retorna uma lista de todas as empresas.

POST /api/checkin:
- Cria um novo check-in.

Esta documentação fornece uma visão geral do backend, incluindo a estrutura do projeto, as dependências necessárias, a configuração do ambiente, a criação do banco de dados, a inicialização do servidor Flask e os endpoints da API disponíveis.
