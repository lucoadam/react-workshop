import React from 'react'
import Layout from '../layouts'
import Button from '../components/button'
import { useNavigate } from 'react-router-dom'

const NotAuthorized = () => {
  const navigate = useNavigate()
  return (
    <Layout>
        <div className='text-2xl text-primary'>
            <p> You are not authorized to view this page.</p>
        </div>
        <Button text="Go to Home" onClick={()=>{
            navigate("/")
        }
        }/>
    </Layout>
  )
}

export default NotAuthorized
