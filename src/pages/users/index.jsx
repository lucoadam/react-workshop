import React, { useEffect, useState } from 'react'
import { useUsers } from '../../hooks/useUsers'
import Layout from "../../layouts/index"
import Card from '../../components/card'
import Button from '../../components/button'
import { Link, useNavigate } from 'react-router-dom'

const UsersPage = () => {
  const navigate = useNavigate()

  const { users, loading, removeUser } = useUsers()
const handleClick=(user)=>{
    removeUser(user._id)
    
}
  return (
    <Layout>
      <Card>
        <div className='flex w-full justify-between items-center'>
            <h1 className='text-2xl text-primary'>Users</h1>
            <Link to="/users/create">
            <Button text={"Create user"} />
            </Link>
        </div>
        <div>
            <table className='table-auto border-collapse border border-slate-500 text-center '>
                <tr>
                    <th className='border border-slate-600 px-3 py-2 '>Name</th>
                    <th className='border border-slate-600 px-3 py-2'>Age</th>
                    <th className='border border-slate-600 px-3 py-2'>Actions</th>

                </tr>
                {users.length === 0 && <tr>
                        <td colSpan={3}>
                            <p>{loading ? 'Loading users': 'No users Found'}</p>
                        </td>
                    </tr>}
                {users.map(user=><tr key={user._id}>
                    <td className='border border-slate-600 '>
                        {user.name}
                    </td>
                    <td className='border border-slate-600 '>
                        {user.age}
                    </td>
                    <td className='border border-slate-600 flex px-4 gap-3 '>
                        {[
                            {
                                label: 'Edit',
                                onClick: () => {
                                    navigate(`/users/${user._id}/edit`)
                                }, 
                            },
                            {
                                label: 'View',
                                onClick: () => {
                                    navigate(`/users/${user._id}`)

                                }
                            },
                            {
                                label: 'Delete',
                                onClick: (e) => {
                                    e.preventDefault()
                                    handleClick(user);
                                }

                            }
                        ].map(action=><Button key={action.label} text={action.label} onClick={action.onClick} />)
                        
                        }

                    </td>
                </tr>)}
            </table>
        </div>
      </Card>
    </Layout>
  )
}

export default UsersPage
