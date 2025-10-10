import React from 'react'
import Header from '@/components/Header'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='min-h-screen text-gray-100'>
        <Header />
      <div>
        {children}
      </div>
    </main>
  )
}

export default layout
