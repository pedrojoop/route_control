from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


# Configurações do WebDriver
chrome_options = Options()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

service = Service('C:/chromedriver-win64/chromedriver-win64/chromedriver.exe')

driver = webdriver.Chrome(service=service, options=chrome_options)

driver.get("https://web.whatsapp.com")

print("Escaneie o QR code do WhatsApp Web e pressione Enter")
input("Pressione Enter após escanear o QR code...")

# Esperar a presença do elemento de busca (máximo 30 segundos, possibilidade de aumento futuro para sem limite de tempo)
wait = WebDriverWait(driver, 30)
search_box = wait.until(EC.presence_of_element_located((By.XPATH, '//div[@contenteditable="true"][@data-tab="3"]')))

# Função para obter resposta do ChatGPT
def get_chatgpt_response(question):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=question,
        max_tokens=150
    )
    return response.choices[0].text.strip()

# Função para enviar mensagem
def send_message(contact, message):
    search_box.clear()
    search_box.send_keys(contact)
    search_box.send_keys(Keys.ENTER)
    
    # Esperar a presença da caixa de mensagem (máximo 30 segundos)
    message_box = wait.until(EC.presence_of_element_located((By.XPATH, '//div[@contenteditable="true"][@data-tab="10"]')))
    message_box.send_keys(message)
    message_box.send_keys(Keys.ENTER)

# Rota fictícia
rota = [
    {
        "produto": "Produto A",
        "local": "Local 1",
        "horario": "10:00",
        "data": "2024-07-16"
    },
    {
        "produto": "Produto B",
        "local": "Local 2",
        "horario": "11:00",
        "data": "2024-07-16"
    },
    {
        "produto": "Produto C",
        "local": "Local 3",
        "horario": "12:00",
        "data": "2024-07-16"
    }
]

# Função para simular os check-ins de rota
def simulate_route(contact):
    for checkin in rota:
        message = (
            f"Check-in realizado:\n"
            f"Produto: {checkin['produto']}\n"
            f"Local: {checkin['local']}\n"
            f"Horário: {checkin['horario']}\n"
            f"Data: {checkin['data']}"
        )
        send_message(contact, message)
        time.sleep(5)  # Intervalo de tempo entre check-ins

# Enviar mensagem de boas-vindas com o nome do usuário definido
send_message("Nome do Contato", "Bem-vindo(a)! Como posso ajudar você hoje?")

# Simular rota e enviar mensagens de check-in
simulate_route("Nome do Contato")

# Mantém o bot rodando e escutando mensagens recebidas
def listen_and_respond():
    while True:
        try:
            messages = driver.find_elements(By.XPATH, '//div[@class="_1Gy50"]')
            for message in messages:
                msg_text = message.text
                if msg_text:
                    print(f"Mensagem recebida: {msg_text}")
                    response = get_chatgpt_response(msg_text)
                    print(f"Resposta do ChatGPT: {response}")
                    
                    send_message("Nome do Contato", response)
                    
                    message.click()
            time.sleep(10)
        except Exception as e:
            print(f"Erro: {e}")
            time.sleep(10)

try:
    listen_and_respond()
except KeyboardInterrupt:
    print("Bot interrompido pelo usuário.")
finally:
    driver.quit()
