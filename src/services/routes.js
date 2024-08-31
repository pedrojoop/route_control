import axios from 'axios'

const apiLink = 'http://127.0.0.1:5000/'

/**
 * 
 * @returns {Promise<Client[]>}
 */
export async function getClients() {
  return await axios.get(apiLink+'/api/clientes')
}

/**
 * 
 * @returns {Promise<Driver[]>}
 */
export async function getDrivers() {
  return await axios.get(apiLink+'api/motoristas')
}

/**
 * 
 * @returns {Promise<Product[]>}
 */
export async function getProducts() {
  return await axios.get('http://127.0.0.1:5000/api/produtos')
}

/**
 * 
 * @returns {Promise<Route[]>}
 */
export async function getRoutes() {
  return await axios.get('http://127.0.0.1:5000/api/rotas')
}

/**
 * 
 * @returns {Promise<Company[]>}
 */
export async function getCompanies() {
  return await axios.get('http://127.0.0.1:5000/api/empresa')
}

/**
 * @typedef {Object} Client
 * @property {string} email - O endereço de e-mail do cliente.
 * @property {number} empresa_id - O ID da empresa com a qual o cliente está associado.
 * @property {string} endereco - O endereço do cliente.
 * @property {number} id - O identificador único do cliente.
 * @property {string} nome - O nome do cliente.
 * @property {string} telefone - O número de telefone do cliente.
 */

/**
 * @typedef {Object} Driver
 * @property {string} cpf_cnpj - O CPF ou CNPJ do motorista.
 * @property {string} email - O endereço de e-mail do motorista.
 * @property {number} empresa_id - O ID da empresa com a qual o motorista está associado.
 * @property {number} id - O identificador único do motorista.
 * @property {string} nome - O nome do motorista.
 * @property {string} placa - A placa do veículo do motorista.
 * @property {string} telefone - O número de telefone do motorista.
 */

/**
 * @typedef {Object} Route
 * @property {string} data_fim - A data e hora de término da rota em formato GMT.
 * @property {string} data_inicio - A data e hora de início da rota em formato GMT.
 * @property {string} descricao - A descrição da rota.
 * @property {number|null} distancia_estimada - A distância estimada da rota, ou `null` se não estiver disponível.
 * @property {number} empresa_id - O ID da empresa responsável pela rota.
 * @property {number} id - O identificador único da rota.
 * @property {string} local_entrega - O local de entrega da rota.
 * @property {string} local_saida - O local de saída da rota.
 * @property {number|null} tempo_entrega_estimado - O tempo estimado para a entrega, ou `null` se não estiver disponível.
 */

/**
 * @typedef {Object} Product
 * @property {number} cliente_id - O ID do cliente associado ao produto.
 * @property {string} descricao - A descrição do produto.
 * @property {number} empresa_id - O ID da empresa responsável pelo produto.
 * @property {number} id - O identificador único do produto.
 */

/**
 * @typedef {Object} Company
 * @property {string} email - O endereço de e-mail da empresa.
 * @property {string} endereco - O endereço da empresa.
 * @property {number} id - O identificador único da empresa.
 * @property {string} login - O nome de usuário de login da empresa.
 * @property {string} nome - O nome da empresa.
 * @property {string} senha_hash - A senha hash da empresa.
 * @property {string} telefone - O número de telefone da empresa.
 */