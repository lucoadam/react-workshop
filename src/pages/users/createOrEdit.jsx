import React, { useEffect, useState } from 'react'
import Layout from '../../layouts'
import { Link, useParams } from 'react-router-dom'
import Card from '../../components/card'
import Button from '../../components/button'
import { useUsers } from '../../hooks/useUsers'

const CreateOrEditUser = () => {

  const params = useParams()
  const {getUserById} = useUsers()

  const [data, setData] = useState({
    name: '',
    age: ''
  })

  useEffect(()=>{
    if(params.id){
      getUserById(params.id).then((res)=>{
        setData(res)
      })
    }
  }, [params.id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(params.id){
      console.log('edit')
    }else{
      console.log('create')
    }

    
  }
  console.log('value of params', params)
  return (
    <Layout>
      <Card>
        <div className='flex w-full justify-between items-center gap-8'>
        <h1 className='text-2xl text-primary'>{params.id ? "Edit" : "Create"} user</h1>

            <Link to="/users">
            <Button text={"Users List"} />
            </Link>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1">
                <input
                type="text"
                name="name"
                value={data.name}
                onChange={
                  (e) => {
                    setData({
                      ...data,
                      name: e.target.value
                    })
                  }
                }
                />
              </div>
            
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <div className="mt-1">
                <input
                type="number"
                name="age"
                value={data.age}
                onChange={
                  (e) => {
                    setData({
                      ...data,
                      age: e.target.value
                    })
                  }
                }
                />
              </div>
              </div>
              <div className="mb-4">
                <Button text={params.id ? "Update" : "Create"}/>
              </div>
          </form>
        </div>
      </Card>
    </Layout>
  )
}

export default CreateOrEditUser
