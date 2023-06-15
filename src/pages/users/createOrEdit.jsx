import React, { useEffect, useState } from 'react'
import Layout from '../../layouts'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Card from '../../components/card'
import Button from '../../components/button'
import { useUsers } from '../../hooks/useUsers'
import { toast } from 'react-hot-toast'
import { useUserContext } from '../../contexts/usercontext'

const CreateOrEditUser = () => {

  const params = useParams()
  const navigate = useNavigate()
  const { getUserById, createUser, editUser } = useUsers()
  // page specific access control
  // const {user: currentUser} = useUserContext()

  // useEffect(()=>{
  //   if(currentUser.role !== 'admin'){
  //     navigate('/users')
  //   }
  // }, [currentUser.role])

  const [data, setData] = useState({
    name: '',
    age: ''
  })

  useEffect(() => {
    if (params.id) {
      getUserById(params.id).then((res) => {
        setData(res)
      })
    }
  }, [params.id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let message;
    if (params.id) {
      await editUser({
        id: params.id,
        ...data,
      })
      message = "User updated successfully."
    } else {
      await createUser({
        name: data.name,
        age: data.age,
        email: data.email,
        address: data.address,
        role: data.role
      })
      message = "User created successfully."
    }
    toast.success(message)
    navigate("/users")

    // setTimeout(()=>{
    // }, 500) // delay navigation by 0.5 sec
  }
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
            {/* Name */}
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

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={
                    (e) => {
                      setData({
                        ...data,
                        email: e.target.value
                      })
                    }
                  }
                />
              </div>

            </div>
            {/* Address */}
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="address"
                  value={data.address}
                  onChange={
                    (e) => {
                      setData({
                        ...data,
                        address: e.target.value
                      })
                    }
                  }
                />
              </div>

            </div>
            {/* Age */}
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

            {/* Role */}
            <div className='mb-4'>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <div className="mt-1">
                <select
                  name="role"
                  value={data.role}
                  onChange={
                    (e) => {
                      setData({
                        ...data,
                        role: e.target.value
                      })
                    }
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <Button text={params.id ? "Update" : "Create"} />
            </div>
          </form>
        </div>
      </Card>
    </Layout>
  )
}

export default CreateOrEditUser
