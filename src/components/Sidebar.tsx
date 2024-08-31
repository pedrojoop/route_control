import React, { useState } from 'react'

export function SideBar({ setActiveContent, activeContent }) {
  const [showSideBar, setShowSideBar] = useState(false)

  const changeSideBarStatus = () => {
    if (showSideBar) setShowSideBar(false)
    if (!showSideBar) setShowSideBar(true)
  }

  return (
    <>
      <aside 
        id="default-sidebar" 
        className={`h-screen transition-width duration-500 ease-in-out ${showSideBar ? 'w-64' : 'w-16'}`} 
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-aside dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <div>
                <span
                  onClick={() => changeSideBarStatus()} 
                  className={`w-full cursor-pointer transition-all duration-300 ease-in-out flex ${showSideBar ? 'justify-end' : 'justify-start'} p-2 text-asidetext rounded-lg dark:text-white hover:bg-asidetexthover dark:hover:bg-gray-700 group`}
                >
                  <svg className={`w-6 h-6 ${showSideBar ? 'scale-x-[-1]' : 'scale-x-[1]'}`} aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                  </svg>
                </span>
              </div>
              {
                !showSideBar ? <></>
                : <>
                <li>
                    <span 
                      onClick={() => setActiveContent('clients')} 
                      className={`cursor-pointer flex items-center p-2 text-asidetext rounded-lg dark:text-white ${activeContent === 'clients' ? 'bg-asidetexthover dark:bg-gray-700' : ''} hover:bg-asidetexthover dark:hover:bg-gray-700 group`}
                    >
                      <svg className="flex-shrink-0 w-5 h-5 text-asidetext transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                          <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                      </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">Clientes</span>
                    </span>
                </li>
                <li>
                    <span 
                      onClick={() => setActiveContent('products')} 
                      className={`cursor-pointer flex items-center p-2 text-asidetext rounded-lg dark:text-white ${activeContent === 'products' ? 'bg-asidetexthover dark:bg-gray-700' : ''} hover:bg-asidetexthover dark:hover:bg-gray-700 group`}
                    >
                      <svg className="flex-shrink-0 w-5 h-5 text-asidetext transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                          <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                      </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                    </span>
                </li>
                <li>
                    <span 
                      onClick={() => setActiveContent('drivers')} 
                      className={`cursor-pointer flex items-center p-2 text-asidetext rounded-lg dark:text-white ${activeContent === 'drivers' ? 'bg-asidetexthover dark:bg-gray-700' : ''} hover:bg-asidetexthover dark:hover:bg-gray-700 group`}
                    >
                      <svg className="w-6 h-6 flex-shrink-0 text-asidetext transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M4 4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.535a3.5 3.5 0 1 0 6.93 0h3.07a3.5 3.5 0 1 0 6.93 0H21a1 1 0 0 0 1-1v-4a.999.999 0 0 0-.106-.447l-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Zm14.192 11.59.016.02a1.5 1.5 0 1 1-.016-.021Zm-10 0 .016.02a1.5 1.5 0 1 1-.016-.021Zm5.806-5.572v-2.02h4.396l1 2.02h-5.396Z" clipRule="evenodd"/>
                      </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">Motoristas</span>
                    </span>
                </li>
                <li>
                    <span 
                      onClick={() => setActiveContent('routes')} 
                      className={`cursor-pointer flex items-center p-2 text-asidetext rounded-lg dark:text-white ${activeContent === 'routes' ? 'bg-asidetexthover dark:bg-gray-700' : ''} hover:bg-asidetexthover dark:hover:bg-gray-700 group`}
                    >
                      <svg className="w-6 h-6 flex-shrink-0 text-asidetext transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16h13M4 16l4-4m-4 4 4 4M20 8H7m13 0-4 4m4-4-4-4"/>
                      </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">Rotas</span>
                    </span>
                </li>
                <li>
                    <span 
                      className="cursor-pointer flex items-center p-2 text-asidetext rounded-lg dark:text-white hover:bg-asidetexthover dark:hover:bg-gray-700 group"
                    >
                      <svg className="flex-shrink-0 w-5 h-5 text-asidetext transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                      </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">Sair</span>
                    </span>
                </li>
                </>
              }
            </ul>
        </div>
      </aside>
    </>
  )
}
