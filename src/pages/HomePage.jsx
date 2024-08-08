import { useState } from 'react'
import { Header } from '../components/Header'
import { SideBar } from '../components/Sidebar'
import { ProductsPage } from './ProductsPage'
import { ClientsPage } from './ClientsPage'
import { NotesPage } from './Notes'
import { RoutesPage } from './Routes'
import { DriversPage } from './DriversPage'

export function HomePage() {
  const [activeContent, setActiveContent] = useState('products')

  const renderContent = () => {
    switch (activeContent) {
      case 'products':
        return <ProductsPage />
      case 'clients':
        return <ClientsPage />
      case 'notes':
        return <NotesPage />
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
        <SideBar setActiveContent={setActiveContent}/>
        <main className='overflow-x-hidden flex-1 sm:mt-[var(--header-height)] sm:ml-[var(--aside-width)]'>
          {renderContent()}
        </main>
      </div>
    </>
  )
}
