from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import sqlalchemy as db
from sqlalchemy.orm import sessionmaker
from models import Checkin, Rota, Motorista, Produto, Cliente, Empresa

# Configurações do WebDriver
chrome_options = Options()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

service = Service('C:/chromedriver-win64/chromedriver-win64/chromedriver.exe')

driver = webdriver.Chrome(service=service, options=chrome_options)

driver.get("https://web.whatsapp.com")

print("Escaneie o QR code do WhatsApp Web e pressione Enter")
input("Pressione Enter após escanear o QR code...")

# Esperar a presença do elemento de busca
wait = WebDriverWait(driver, 30)

# Configuração do banco de dados (use o banco de dados de teste)
engine = db.create_engine('postgresql://postgres:2303@localhost/banco_teste')
Session = sessionmaker(bind=engine)
session = Session()

# Função para enviar mensagem via WhatsApp Web
def send_message(contact_number, message):
    try:
        # Formatar o número de telefone para a pesquisa no WhatsApp Web
        formatted_number = f"{contact_number[:2]} {contact_number[2:7]}-{contact_number[7:]}"
        
        # Inserir o número de telefone na caixa de pesquisa
        search_box = wait.until(EC.presence_of_element_located((By.XPATH, '//div[@contenteditable="true"][@data-tab="3"]')))
        search_box.clear()
        search_box.send_keys(formatted_number)
        search_box.send_keys(Keys.ENTER)
        
        # Esperar um tempo adicional para garantir que o contato foi carregado
        time.sleep(5)
        
        # Garantir que o campo de mensagem esteja presente e interativo
        message_box = wait.until(
            EC.element_to_be_clickable((By.XPATH, '//div[@contenteditable="true"][@data-tab="10"]'))
        )

        # Enviar a mensagem
        message_box.send_keys(message)
        message_box.send_keys(Keys.ENTER)

    except Exception as e:
        print(f"Erro ao enviar a mensagem para {contact_number}: {e}")

# Função para monitorar check-ins e enviar atualizações
def monitor_checkins():
    last_checkin_ids = set()

    while True:
        try:
            checkins = session.query(Checkin).all()

            for checkin in checkins:
                if checkin.id not in last_checkin_ids:
                    last_checkin_ids.add(checkin.id)

                    rota = session.query(Rota).get(checkin.rota_id)
                    motorista = session.query(Motorista).get(checkin.motorista_id)
                    cliente = session.query(Cliente).get(checkin.produto.cliente_id)
                    empresa = session.query(Empresa).get(rota.empresa_id)

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

                    send_message(cliente.telefone, message)
                    send_message(empresa.telefone, message)

            time.sleep(10)
        except Exception as e:
            print(f"Erro: {e}")
            time.sleep(10)

if __name__ == "__main__":
    try:
        monitor_checkins()
    except KeyboardInterrupt:
        print("Bot interrompido pelo usuário.")
    finally:
        driver.quit()
