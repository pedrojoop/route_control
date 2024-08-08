
export function RoutesPage() {
  /**
   * @typedef {Object} Summary
   * @property {string} status: Status da rota (completed/not_completed/in_progress)
   * @property {string} delivery_date: Data de entrega
   * @property {string} id: Identificador único da rota
   */
  /**
   * @typedef {Object} Description
   * @property {string} route_code: Código da rota
   * @property {string} product_code: Código do produto
   */
  /**
   * Estado que armazena uma lista de rotas.
   * 
   * @typedef {Object} Route
   * @property {Summary} summary: Resumo da rota
   * @property {string} carrier_id: Id da transportadora
   * @property {Description} description: Códigos da rota e produto
   * @property {string} last_checkin_date: Data do último checkin
   * @property {string} status: Status da rota (completed/not_completed/in_progress)
   * @property {string} start_date: Data de início da rota
   */

  /** @type {Route[]} */
  const routes = [{
    summary: {
      status: 'not_completed',
      delivery_date: '12/12/2012',
      id: '123456'
    },
    carrier_id: '12345',
    description: {
      route_code: 'asj123na',
      product_code: 'asdj2b1b#12',
    },
    last_checkin_date: '12/12/2012 18:00',
    status: 'completed',
    start_date: '12/12/2012'
  }]

  const routeIcon = (status) => {
    if (status === 'completed') 
      return (
        <svg className="w-6 h-6 text-gray-800 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
        </svg>
      )
    else if (status == 'not_completed')
      return (
        <svg className="w-6 h-6 text-gray-800 dark:text-red-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd"/>
        </svg>
      )
    else if (status == 'in_progress')
      return (
        <svg className="w-6 h-6 text-gray-800 dark:text-orange-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm5.757-1a1 1 0 1 0 0 2h8.486a1 1 0 1 0 0-2H7.757Z" clip-rule="evenodd"/>
        </svg>
      )
  }

  return (
    <div className="w-full overflow-x-auto">
     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Resumo de rota
          </th>
          <th scope="col" className="px-6 py-3">
            Descrição da tag da rota
          </th>
          <th scope="col" className="px-6 py-3">
            Descrição
          </th>
          <th scope="col" className="px-6 py-3">
            Data do último check-in
          </th>
          <th scope="col" className="px-6 py-3">
            Status da rota
          </th>
          <th scope="col" className="px-6 py-3">
            Data de início da rota
          </th>
        </tr>
      </thead>
      <tbody>
        {
          routes.map((route) => (
              <tr key={route.summary.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="flex px-6 py-4 font-medium whitespace-nowrap">
                  <div className="flex items-center">
                    {
                      routeIcon(route.summary.status)
                    }
                  </div>
                  <div>
                    <div>asdas</div>
                    <div>asdhjas</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {route.carrier_id}
                </td>
                <td className="px-6 py-4">
                  {route.description.route_code}
                </td>
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {route.last_checkin_date}
                </th>
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {route.status}
                </th>
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {route.start_date}
                </th>
              </tr>
            )
          )
        }
      </tbody>
    </table>
    </div>
  )
}
