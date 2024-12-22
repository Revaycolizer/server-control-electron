import React from 'react'

const Wrapper = ({children, title}) => {
  return (
    <div className="container mx-auto p-6 bg-neutral-900 text-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>
        {children}
    </div>
  )
}

export default Wrapper