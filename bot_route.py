from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import urllib.parse
import sqlalchemy as db
from sqlalchemy.orm import sessionmaker
from models import Checkin, Rota, Motorista, Produto, Empresa, Cliente

# Configurações do WebDriver
chrome_options = Options()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

service = Service('C:/chromedriver-win64/chromedriver-win64/chromedriver.exe')

driver = webdriver.Chrome(service=service, options=chrome_options)

driver.get("https://web.whatsapp.com")

print("Escaneie o QR code do WhatsApp Web e pressione Enter")
input("Pressione Enter após escanear o QR code...")

# Esperar a presença do elemento de busca (máximo 30 segundos)
wait = WebDriverWait(driver, 30)

# Configuração do banco de dados
engine = db.create_engine('postgresql://postgres:2303@localhost/controle_rota')
Session = sessionmaker(bind=engine)
session = Session()

# Função para enviar mensagem via WhatsApp usando Click to Chat
def send_message(contact_number, message):
    message_encoded = urllib.parse.quote(message)
    url = f"https://wa.me/{contact_number}?text={message_encoded}"
    
    # Acessar a URL de Click to Chat
    driver.get(url)
    
    # Esperar a presença do botão de envio
    send_button = wait.until(EC.presence_of_element_located((By.XPATH, '//button[@data-testid="compose-btn-send"]')))
    send_button.click()

# Função para monitorar check-ins e enviar atualizações para a empresa e o cliente
def monitor_checkins():
    last_checkin_ids = set()

    while True:
        try:
            checkins = session.query(Checkin).all()

            for checkin in checkins:
                if checkin.id not in last_checkin_ids:
                    last_checkin_ids.add(checkin.id)

                    # Obter dados relacionados ao check-in
                    rota = session.query(Rota).get(checkin.rota_id)
                    cliente = session.query(Cliente).get(checkin.produto.cliente_id)
                    empresa = session.query(Empresa).get(rota.empresa_id)
                    motorista = session.query(Motorista).get(checkin.motorista_id)

                    # Formatar tempo restante de entrega
                    if checkin.tempo_restante_entrega:
                        tempo_restante = str(checkin.tempo_restante_entrega)
                    else:
                        tempo_restante = "Não disponível"

                    message = (
                        f"Check-in atualizado:\n"
                        f"Motorista: {motorista.nome}\n"
                        f"Produto: {checkin.produto.descricao}\n"
                        f"Local: {checkin.local}\n"
                        f"Horário: {checkin.horario.strftime('%H:%M')}\n"
                        f"Data: {checkin.horario.strftime('%Y-%m-%d')}\n"
                        f"Tempo Restante de Entrega: {tempo_restante}"
                    )

                    # Enviar mensagem para o cliente
                    send_message(cliente.telefone, message)

                    # Enviar mensagem para a empresa
                    send_message(empresa.telefone, message)

            time.sleep(10)
        except Exception as e:
            print(f"Erro: {e}")
            time.sleep(10)

# Iniciar a monitorização de check-ins
monitor_checkins()

try:
    monitor_checkins()
except KeyboardInterrupt:
    print("Bot interrompido pelo usuário.")
finally:
    driver.quit()
