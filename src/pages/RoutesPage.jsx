import { useEffect, useState } from "react"
import { getRoutes } from "../services/routes"

export function RoutesPage() {
   /**
   * @type {import('../services/routes'.Client[])}
   */
   const [routes, setRoutes] = useState()
   const [loading, setLoading] = useState(true)

   useEffect(() => {
     getRoutes()
       .then(response => {
          setRoutes(response.data)
          setLoading(false)
       })
       .catch(error => {
          console.error(error)
          alert('Falha ao buscar rotas')
          setLoading(false)
       })
   }, [])

  const formattedDate = (date) => {
    const dateObj = new Date(date)

    return dateObj.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const getDisplayValue = (value) => {
    if (value) return value
    return 'Não disponível'
  }

  const getRouteStatus = (dataInicio, dataFim) => {
    if (dataInicio && dataFim) return 'completed'
    if (dataInicio && !dataFim) return 'in_profess'
    if (!dataInicio && !dataFim) return 'not_completed'
  }

  const routeIcon = (status) => {
    if (status === 'completed') 
      return (
        <svg className="w-6 h-6 text-gray-800 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd"/>
        </svg>
      )
    else if (status == 'not_completed')
      return (
        <svg className="w-6 h-6 text-gray-800 dark:text-red-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd"/>
        </svg>
      )
    else if (status == 'in_progress')
      return (
        <svg className="w-6 h-6 text-gray-800 dark:text-orange-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm5.757-1a1 1 0 1 0 0 2h8.486a1 1 0 1 0 0-2H7.757Z" clipRule="evenodd"/>
        </svg>
      )
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-thead dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Resumo de rota
            </th>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Local de entrega
            </th>
            <th scope="col" className="px-6 py-3">
              Local de saída
            </th>
            <th scope="col" className="px-6 py-3">
              Data de início
            </th>
            <th scope="col" className="px-6 py-3">
              Data de conclusão
            </th>
            <th scope="col" className="px-6 py-3">
              Distância estimada
            </th>
            <th scope="col" className="px-6 py-3">
              Tempo de entrega estimado
            </th>
            <th scope="col" className="px-6 py-3">
              Id da empresa
            </th>
          </tr>
        </thead>
        <tbody>
          {
            routes?.map((route) => (
                <tr key={route.id} className="bg-white border-b border-thead dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="flex px-6 py-4 font-medium whitespace-nowrap">
                    <div className="flex items-center mr-4">
                      {
                        routeIcon(getRouteStatus(route.data_inicio, route.data_fim))
                      }
                    </div>
                    <div className="text-end">
                      <div>{formattedDate(route.data_inicio)}</div>
                      <div>{route.id}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    {getDisplayValue(route.id)}
                  </td>
                  <td className="px-6 py-4">
                    {getDisplayValue(route.local_entrega)}
                  </td>
                  <td className="px-6 py-4">
                    {getDisplayValue(route.local_saida)}
                  </td>
                  <td className="px-6 py-4">
                    {getDisplayValue(formattedDate(route.data_inicio))}
                  </td>
                  <td className="px-6 py-4">
                    {getDisplayValue(formattedDate(route.data_fim))}
                  </td>
                  <td className="px-6 py-4">
                    {getDisplayValue(route.distancia_estimada)}
                  </td>
                  <td className="px-6 py-4">
                    {getDisplayValue(route.tempo_entrega_estimado)}
                  </td>
                  <td className="px-6 py-4">
                    {getDisplayValue(route.empresa_id)}
                  </td>
                </tr>
              )
            )
          }
        </tbody>
      </table>
      {
          loading ? 
          <div className="m-auto flex justify-center text-center">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          : <></>
        }
    </div>
  )
}
