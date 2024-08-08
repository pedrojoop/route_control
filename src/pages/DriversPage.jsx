
export function DriversPage() {
  /**
   * Estado que armazena uma lista de motoristas.
   * 
   * @typedef {Object} Driver
   * @property {string} id: Identificador único do motorista
   * @property {string} name: Nome do motorista
   * @property {string} carrier_id: Identificador da transportadora
   * @property {string} license_plate: Placa do carro
   * @property {string} cnpj_cpf: CNPJ ou CPF do motorista
   * @property {string} phone_number: Número de telefone do motorista
   * @property {string} email: E-mail do motorista
   */

  /** @type {Driver[]} */
  const drivers = [{
    id: '123456789',
    name: 'Motoristas',
    carrier_id: '1231241',
    license_plate: 'nve4320',
    cnpj_cpf: '2131231234',
    phone_number: '(12) 91234-5678',
    email: 'asif@asf.com'
  },
  ]

  return (
    <div className="w-full overflow-x-auto">
     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Id
          </th>
          <th scope="col" className="px-6 py-3">
            Nome
          </th>
          <th scope="col" className="px-6 py-3">
            Id da Transportadora
          </th>
          <th scope="col" className="px-6 py-3">
            Placa
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
          drivers.map((driver) => (
              <tr key={driver.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {driver.id}
                </th>
                <td className="px-6 py-4">
                  {driver.name}
                </td>
                <td className="px-6 py-4">
                  {driver.carrier_id}
                </td>
                <td className="px-6 py-4">
                  {driver.license_plate}
                </td>
                <td className="px-6 py-4">
                  {driver.cnpj_cpf}
                </td>
                <td className="px-6 py-4">
                  {driver.phone_number}
                </td>
                <td className="px-6 py-4">
                  {driver.email}
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
