import React from 'react'
import AppLayout from '../components/AppLayout'
import ServiceApp from '../components/ServiceApp'
export const revalidate=0;
const Home = () => {
  return (
    <AppLayout>
      <ServiceApp />
    </AppLayout>
  )
}

export default Home