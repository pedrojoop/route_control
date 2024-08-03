# Documentação do Projeto: Bot de Controle de Rotas

## Visão Geral

Este projeto tem como objetivo criar um sistema automatizado de controle de rotas que integra um bot de WhatsApp, um banco de dados PostgreSQL, um servidor backend e uma aplicação frontend. O sistema gerencia dados de clientes, rotas, motoristas, produtos e informações da empresa, permitindo a comunicação automatizada entre motoristas, clientes e a empresa.

## Componentes do Sistema

### Banco de Dados PostgreSQL
- Armazena dados de clientes, rotas, motoristas, produtos e informações da empresa.

### Servidor Backend (Python)
- Integra o banco de dados PostgreSQL.
- Fornece uma API para a aplicação frontend.
- Integra o bot de WhatsApp para comunicação automatizada.

### Bot de WhatsApp (Python)
- Interage com motoristas para check-ins de rotas.
- Envia atualizações automatizadas para clientes e a empresa sobre o status das entregas.

### Aplicação Frontend
- Interface para gerenciar clientes, rotas, motoristas, produtos e informações da empresa.
- Visualiza dados e status das entregas.

## Fluxo de Trabalho

### Inicialização e Configuração
1. Configurar o banco de dados PostgreSQL.
2. Configurar o servidor backend.
3. Configurar e inicializar o bot de WhatsApp.

### Entrada de Dados
- Inserir dados iniciais de clientes, rotas, motoristas, produtos e informações da empresa no banco de dados através do frontend.

### Check-in do Motorista
- O motorista faz o check-in em determinados pontos da rota usando o bot de WhatsApp.
- O bot registra o local, horário e data do check-in no banco de dados.

### Notificações Automatizadas
- O bot envia notificações automáticas ao cliente e à empresa com informações sobre o produto, local, horário e data do último check-in, além da estimativa de chegada.

## Detalhes de Implementação

### 1. Banco de Dados PostgreSQL

**Tabelas**:
- `clientes`
- `rotas`
- `motoristas`
- `produtos`
- `empresa`
- `checkins`

### 2. Servidor Backend (Python)

**Requisitos**:
- Flask
- SQLAlchemy (para integração com PostgreSQL)
- psycopg2 (driver PostgreSQL)

### 3. Bot de WhatsApp (Python)

**Requisitos**:
- selenium
- openai
- requests

### 4. Aplicação Frontend

**Tecnologias Sugeridas**:
- React.js
- Axios (para chamadas de API)

## Conclusão

Este projeto abrange a criação de um sistema automatizado de controle de rotas utilizando um bot de WhatsApp, um banco de dados PostgreSQL, um servidor backend em Python e uma aplicação frontend. A documentação fornece uma visão geral e exemplos de implementação para cada componente do sistema.

