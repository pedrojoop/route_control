# Controle de Rotas - Backend

Este projeto é um sistema de controle de rotas que inclui gerenciamento de empresas, autenticação, criação e monitoramento de rotas, check-ins de motoristas e integração com WhatsApp para notificações automáticas. O backend foi desenvolvido em Python utilizando Flask, SQLAlchemy, e PostgreSQL.

## Funcionalidades

- **Autenticação de Empresas**: Gerenciamento de login e senha para empresas, com controle de acesso.
- **Gerenciamento de Rotas**: Criação e monitoramento de rotas, incluindo cálculo de tempo estimado e distância.
- **Check-ins de Motoristas**: Registro de check-ins dos motoristas, calculando o tempo restante de entrega.
- **Integração com Mapbox**: Cálculo de rotas e geocodificação utilizando a API do Mapbox.

## Tecnologias Utilizadas

- **Python**: Linguagem de programação principal.
- **Flask**: Framework web para Python.
- **SQLAlchemy**: ORM para gerenciamento de banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **Mapbox**: API para geocodificação e cálculo de rotas.
- **Werkzeug**: Biblioteca para hashing de senhas.

## Configuração do Projeto

### Pré-requisitos

- Python 3.7+
- PostgreSQL
- Virtualenv (recomendado)

### Instalação

1. **Clone o repositório:**

   ```
   git clone https://github.com/seu-usuario/route_control.git
   cd route_control
   ```

2. **Crie e ative um ambiente virtual:**

  ```
    python -m venv venv
    source `venv\Scripts\activate`
  ```

# Configure as variáveis de ambiente:

1. ***Crie um arquivo .env na raiz do projeto e adicione as configurações necessárias, como a string de conexão com o banco de dados PostgreSQL e a chave da API do Mapbox.**

  ```
    DATABASE_URL=postgresql://usuario:senha@localhost/nome_do_banco
    MAPBOX_API_KEY=sua_chave_da_api_mapbox
  ```

2. **Inicialize o banco de dados:**

3. **Se estiver usando scripts SQL manuais:**

  ```
    psql -U seu_usuario -d seu_banco_de_dados -f migracoes/001_add_auth_fields.sql
  ```

4. **Execute a aplicação:**

  ```
    python app.py
  ```

# Estrutura do Projeto

- app.py: Arquivo principal da aplicação Flask.
- models.py: Definições dos modelos de dados usando SQLAlchemy.
- auth.py: Rotas para autenticação de empresas.
- admin.py: Rotas para criação e gerenciamento de empresas.
- routes.py: Rotas relacionadas ao controle de rotas e check-ins.
- config.py: Configurações da aplicação Flask.

# Rotas da API:

1. **Autenticação:**

- POST /auth/login: Autentica uma empresa com login e senha.

2. **Gerenciamento de Empresas:**

- POST /admin/create_empresa: Cria uma nova empresa com login e senha.

3. **Gerenciamento de Rotas:**

- POST /api/criar_rota: Cria uma nova rota para uma empresa.

4. **Gerenciamento de Check-ins:**

- POST /api/criar_checkin: Cria um check-in para uma rota específica.