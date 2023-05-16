import React from 'react'
import Layout from '../../layouts'
import Card from '../../components/card'

import {Link, useParams } from 'react-router-dom'
import { useUsers } from '../../hooks/useUsers'
import Button from '../../components/button'

const ViewUser = () => {
  const params = useParams()

  const {getUserById} = useUsers()

  const [data, setData] = React.useState({
    name: '',
    age: ''
  })

  React.useEffect(()=>{
    if(params.id){
      getUserById(params.id).then((res)=>{
        setData(res)
      })
    }
  }, [params.id])
  
  return (
    <Layout>
     
      <Card>
        <div className='flex justify-between gap-3 items-center'>
        View User
      <Link to="/users">
            <Button text={"Users List"} />
       </Link>
        </div>
        {data.name} {data.age}
        </Card>
    </Layout>
  )
}

export default ViewUser
