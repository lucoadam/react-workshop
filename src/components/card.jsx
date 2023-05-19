import React from 'react'

const Card = ({children, className}) => {
  return (
    <div className={`px-16 py-12 bg-secondary rounded-lg ${className}`}>
        {children}
    </div>
  )
}

export default Card
