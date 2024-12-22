import Header from './Header'

const AppLayout = ({children}) => {
  return (
    <div className='font-sans antialiased bg-neutral-950'>
        <main className="min-h-screen">
            <Header/>
            {children}
        </main>
    </div>
  )
}

export default AppLayout