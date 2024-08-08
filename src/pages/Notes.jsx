
export function NotesPage() {
  /**
   * Estado que armazena uma lista de notas.
   * 
   * @typedef {Object} Note
   * @property {string} id: Identificador único da nota
   * @property {string} client_id: Identificador do cliente 
   * @property {string} client_name: Nome do cliente
   * @property {string} product_id: Id do produto
   * @property {string} driver_id: Id do motorista
   * @property {string} route_code: Código da rota
   * @property {string} date: Data da emissão da nota
   * @property {string} address: Endereço de entrega
   * @property {} pdf: PDF da nota
   */

  /** @type {Note[]} */
  const notes = [{
    id: '123456789',
    client_id: '123123',
    client_name: 'João Lucas Cordeiro',
    product_id: '2131231',
    driver_id: '123123',
    route_code: 'saj#ja134',
    date: '12/12/2012',
    address: 'Rua dos bobo, 0',
    pdf: ''
  }]

  return (
    <div className="w-full overflow-x-auto">
     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Id da nota
          </th>
          <th scope="col" className="px-6 py-3">
            Id do cliente
          </th>
          <th scope="col" className="px-6 py-3">
            Nome do cliente
          </th>
          <th scope="col" className="px-6 py-3">
            Id do produto
          </th>
          <th scope="col" className="px-6 py-3">
            Id do motorista
          </th>
          <th scope="col" className="px-6 py-3">
            Código da rota
          </th>
          <th scope="col" className="px-6 py-3">
            Data
          </th>
          <th scope="col" className="px-6 py-3">
            Endereço
          </th>
          <th scope="col" className="px-6 py-3">
            PDF
          </th>
        </tr>
      </thead>
      <tbody>
        {
          notes.map((note) => (
              <tr key={note.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {note.id}
                </th>
                <td className="px-6 py-4">
                  {note.client_id}
                </td>
                <td className="px-6 py-4">
                  {note.client_name}
                </td>
                <td className="px-6 py-4">
                  {note.product_id}
                </td>
                <td className="px-6 py-4">
                  {note.driver_id}
                </td>
                <td className="px-6 py-4">
                  {note.route_code}
                </td>
                <td className="px-6 py-4">
                  {note.date}
                </td>
                <td className="px-6 py-4">
                  {note.address}
                </td>
                <td className="px-6 py-4">
                  {note.pdf}
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
