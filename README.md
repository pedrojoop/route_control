# Documentação do Bot de WhatsApp

## Visão Geral

Este bot de WhatsApp é construído usando Python e Selenium, com integração ao ChatGPT da OpenAI. O bot permite enviar mensagens automáticas para contatos específicos no WhatsApp, baseado em uma rota fictícia.

## Estrutura do Projeto

```
route_control/
├── bot.py
```

# Dependências

As seguintes bibliotecas são necessárias:

```
├── selenium
├── openai
└── requests
```

# Configuração do Ambiente

- Instalar as dependências:
```
pip install selenium openai requests
```

- Instalar o ChromeDriver:
Certifique-se de que o ChromeDriver está instalado e configurado no seu sistema.

# Como Usar

- Execute o script no Terminal:
  
```
python bot.py
```

- Escanear o QR Code:
- Abra o WhatsApp Web no navegador aberto pelo Selenium.
- Escaneie o QR code com o aplicativo do WhatsApp no seu telefone.

Esta documentação fornece uma visão geral do bot de WhatsApp, incluindo a estrutura do projeto, as dependências necessárias, a configuração do ambiente, e as instruções para executar e usar o bot. Adicionalmente, menciona futuras integrações com um banco de dados para obter informações em tempo real.
