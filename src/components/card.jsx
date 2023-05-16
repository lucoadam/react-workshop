import React from 'react'

const Card = ({children}) => {
  return (
    <div className='px-16 py-12 bg-secondary rounded-lg'>
        {children}
    </div>
  )
}

export default Card
