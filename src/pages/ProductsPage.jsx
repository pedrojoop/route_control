
export function ProductsPage() {
  /**
   * Array que armazena a lista de produtos.
   * 
   * @typedef {Object} Product
   * @property {string} id: Identificador único do produto
   * @property {string} name: Nome do produto
   * @property {string} description: Descrição do produto
   */

  /** @type {Product[]} */
  const products = [{
    id: '123456789',
    name: 'Cadeira',
    description: 'Cadeira de madeira',
  },
  {
    id: '113456789',
    name: 'Cadeira',
    description: 'Cadeira de metal',
  }]

  console.log(products, 'asdjasiodj')
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
            Descrição
          </th>
        </tr>
      </thead>
      <tbody>
        {
          products.map((product) => (
              <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {product.id}
                </th>
                <td className="px-6 py-4">
                  {product.name}
                </td>
                <td className="px-6 py-4">
                  {product.description}
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
