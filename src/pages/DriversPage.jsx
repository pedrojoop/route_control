import { useEffect, useState } from "react"
import { getDrivers } from "../services/routes"

export function DriversPage() {
  /**
   * @type {import('../services/routes'.Driver[])}
   */
  const [drivers, setDrivers] = useState([])
  const [filteredDrivers, setFilteredDrivers] = useState([])
  const [loading, setLoading] = useState(true)

  const [filters, setFilters] = useState({
    id: '',
    nome: '',
    placa: '',
    cpf_cnpj: '',
    telefone: '',
    empresa_id: ''
  })

  useEffect(() => {
    getDrivers()
      .then(response => {
        setDrivers(response.data)
        setFilteredDrivers(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        alert('Falha ao buscar motoristas')
        setLoading(false)
      })
  }, [])

  const filterDrivers = () => {
    const { id, nome, placa, cpf_cnpj, telefone, empresa_id } = filters
    const lowerCaseFilters = {
      id: id.toLowerCase(),
      nome: nome.toLowerCase(),
      placa: placa.toLowerCase(),
      cpf_cnpj: cpf_cnpj.toLowerCase(),
      telefone: telefone.toLowerCase(),
      empresa_id: empresa_id.toLowerCase(),
    }
    const filtered = drivers.filter(driver => {
      return (
        (!lowerCaseFilters.id || driver.id.toString().includes(lowerCaseFilters.id)) &&
        (!lowerCaseFilters.nome || driver.nome.toLowerCase().includes(lowerCaseFilters.nome)) &&
        (!lowerCaseFilters.placa || driver.placa.toLowerCase().includes(lowerCaseFilters.placa)) &&
        (!lowerCaseFilters.cpf_cnpj || driver.cpf_cnpj.toLowerCase().includes(lowerCaseFilters.cpf_cnpj)) &&
        (!lowerCaseFilters.telefone || driver.telefone.toLowerCase().includes(lowerCaseFilters.telefone)) &&
        (!lowerCaseFilters.empresa_id || driver.empresa_id.toString().includes(lowerCaseFilters.empresa_id))
      )
    })
    setFilteredDrivers(filtered)
  }

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    filterDrivers()
  }, [filters, drivers])

  return (
    <div className="w-full overflow-x-auto">
      <div className="p-4">
        <input
          type="text"
          name="id"
          placeholder="Filtrar por ID"
          value={filters.id}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded mb-2 mr-2 text-slate-600"
        />
        <input
          type="text"
          name="nome"
          placeholder="Filtrar por Nome"
          value={filters.nome}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded mb-2 mr-2 text-slate-600"
        />
        <input
          type="text"
          name="placa"
          placeholder="Filtrar por Placa"
          value={filters.placa}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded mb-2 mr-2 text-slate-600"
        />
        <input
          type="text"
          name="cpf_cnpj"
          placeholder="Filtrar por CNPJ/CPF"
          value={filters.cpf_cnpj}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded mb-2 mr-2 text-slate-600"
        />
        <input
          type="text"
          name="telefone"
          placeholder="Filtrar por Telefone"
          value={filters.telefone}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded mb-2 mr-2 text-slate-600"
        />
        <input
          type="text"
          name="empresa_id"
          placeholder="Filtrar por ID da Empresa"
          value={filters.empresa_id}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded mb-2 text-slate-600"
        />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-thead dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Id</th>
            <th scope="col" className="px-6 py-3">Nome</th>
            <th scope="col" className="px-6 py-3">Placa</th>
            <th scope="col" className="px-6 py-3">CNPJ/CPF</th>
            <th scope="col" className="px-6 py-3">Telefone</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Id da empresa</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrivers.map((driver) => (
            <tr key={driver.id} className="bg-white border-b border-thead dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">{driver.id}</th>
              <td className="px-6 py-4">{driver.nome}</td>
              <td className="px-6 py-4">{driver.placa}</td>
              <td className="px-6 py-4">{driver.cpf_cnpj}</td>
              <td className="px-6 py-4">{driver.telefone}</td>
              <td className="px-6 py-4">{driver.email}</td>
              <td className="px-6 py-4">{driver.empresa_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && (
        <div className="m-auto flex justify-center text-center">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  )
}
