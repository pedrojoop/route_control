import { useState } from 'react'
import { Header } from '../components/Header'
import { SideBar } from '../components/Sidebar'
import { ProductsPage } from './ProductsPage'
import { ClientsPage } from './ClientsPage'
import { RoutesPage } from './RoutesPage'
import { DriversPage } from './DriversPage'

export function HomePage() {
  const [activeContent, setActiveContent] = useState('clients')

  const renderContent = () => {
    switch (activeContent) {
      case 'clients':
        return <ClientsPage />
      case 'products':
        return <ProductsPage />
      case 'routes':
        return <RoutesPage />
      case 'drivers':
        return <DriversPage />
      default:
        return <ClientsPage />
    }
  }

  return (
    <>
      <div className='flex h-screen flex-col'>
        <Header />
        <div className='flex'>
          <SideBar activeContent={activeContent} setActiveContent={setActiveContent}/>
          <main className='overflow-x-hidden w-screen'>
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  )
}
