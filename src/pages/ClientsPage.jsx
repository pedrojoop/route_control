export function ClientsPage() {
  /**
   * Array que armazena uma lista de clientes.
   * 
   * @typedef {Object} Client
   * @property {string} id: Identificador único do cliente
   * @property {string} name: Nome do cliente
   * @property {string} address: Endereço do cliente
   * @property {string} registration_date: Data de cadastro do cliente no formato 'DD/MM/YYYY'
   * @property {string} cnpj_cpf: CNPJ ou CPF do cliente
   * @property {string} phone_number: Número de telefone do cliente
   * @property {string} email: E-mail do cliente
   */

  const clients = [{
    id: '123456789',
    name: 'João Lucas Cordeiro',
    address: 'Rua dos Bobo, 0',
    registration_date: '12/12/2012',
    cnpj_cpf: '123456789-12',
    phone_number: '(85) 98680-7835',
    email: 'lucasjcordeiro@outlook.com'
  },
  {
    id: '113456789',
    name: 'João Lucas Santana',
    address: 'Rua dos Bobo, 1',
    registration_date: '12/12/2013',
    cnpj_cpf: '113456789-12',
    phone_number: '(85) 98680-7832',
    email: 'lucasjcordeiro@gmail.com',
  }]

  return (
    <div className="w-full overflow-x-auto">
     <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Id
          </th>
          <th scope="col" className="px-6 py-3">
            Nome
          </th>
          <th scope="col" className="px-6 py-3">
            Endereço
          </th>
          <th scope="col" className="px-6 py-3">
            Data de cadastro
          </th>
          <th scope="col" className="px-6 py-3">
            CNPJ/CPF
          </th>
          <th scope="col" className="px-6 py-3">
            Telefone
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
        </tr>
      </thead>
      <tbody>
        {
          clients.map((client) => (
            <tr key={client.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
              {client.id}
            </th>
            <td className="px-6 py-4">
              {client.name}
            </td>
            <td className="px-6 py-4">
              {client.address}
            </td>
            <td className="px-6 py-4">
              {client.registration_date}
            </td>
            <td className="px-6 py-4">
              {client.cnpj_cpf}
            </td>
            <td className="px-6 py-4">
              {client.phone_number}
            </td>
            <td className="px-6 py-4">
              {client.email}
            </td>
          </tr>
            )
          )
        }
      </tbody>
    </table>
    </div>
  )
}
