import React from 'react'
import Card from './card'

const Modal = ({
    children,
    className,
    open
}) => {
  if(!open) return <></>
  return (
    <div className='w-screen h-screen bg-[#000000ad] fixed top-0 left-0 flex justify-center items-center'>
        <Card className={`w-[300px] px-4 py-3 ${className}`}>
            {children}
        </Card>
    </div>
  )
}

export default Modal
