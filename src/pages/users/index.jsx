import React, { useEffect, useState } from 'react'
import { useUsers } from '../../hooks/useUsers'
import Layout from "../../layouts/index"
import Card from '../../components/card'
import Button from '../../components/button'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../../components/modal'
import { toast } from 'react-hot-toast'
import { useUserContext } from '../../contexts/usercontext'

const UsersPage = () => {
    const navigate = useNavigate()
    const { users, loading, removeUser } = useUsers()
    const { user: currentUser } = useUserContext()

    const [showDelete, setShowDelete] = useState(false)
    // const [showView, setShowView] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})


    const handleClick = async (user) => {
        await removeUser(user._id)
        setSelectedUser({})
        setShowDelete(false)
        toast.success("User deleted successfully.")
    }
    return (
        <Layout>
            <Modal
                open={showDelete}
                className="w-[400px]"
            >
                <div className='text-2xl'>
                    <p> Do you really want to delete ?</p>
                    <small className='text-sm'>You are about to delete a user with {selectedUser?.name} and of age {selectedUser?.age}.</small>
                </div>
                <div className='flex justify-end gap-4'>
                    <Button
                        onClick={
                            () => {
                                handleClick(selectedUser)
                            }
                        }
                        text="Yes"
                    />
                    <Button text="Cancel" onClick={
                        () => setShowDelete(false)
                    } />
                </div>
            </Modal>
            {/* <Modal
                open={showView}
            >

            </Modal> */}
            <Card>
                <div className='flex w-full justify-between items-center'>
                    <h1 className='text-2xl text-primary'>Users</h1>
                    {currentUser.role === 'admin' && <Link to="/users/create">
                        <Button text={"Create user"} />
                    </Link>}
                </div>
                <div>
                    <table className='table-auto border-collapse border border-slate-500 text-center '>
                        <tr>
                            <th className='border border-slate-600 px-3 py-2 '>Name</th>
                            <th className='border border-slate-600 px-3 py-2'>Email</th>
                            <th className='border border-slate-600 px-3 py-2'>Address</th>

                            <th className='border border-slate-600 px-3 py-2'>Age</th>
                            <th className='border border-slate-600 px-3 py-2'>Role</th>
                            <th className='border border-slate-600 px-3 py-2'>Actions</th>

                        </tr>
                        {users.length === 0 && <tr>
                            <td colSpan={3}>
                                <p>{loading ? 'Loading users' : 'No users Found'}</p>
                            </td>
                        </tr>}
                        {users.map(user => <tr key={user._id}>
                            <td className='border px-4 text-left border-slate-600 '>
                                {user.name}
                            </td>
                            <td className='border border-slate-600 '>
                                {user.email}
                            </td>
                            <td className='border border-slate-600 '>
                                {user.address}
                            </td>
                            <td className='border border-slate-600 '>
                                {user.age}
                            </td>
                            <td className='border border-slate-600 '>
                                {user.role ?? 'User'}
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
                                        onClick: () => {
                                            if(currentUser.email === user.email){
                                                toast.error("You cannot delete yourself.")
                                                return
                                            }
                                            setShowDelete(true)
                                            setSelectedUser(user)
                                        }

                                    }
                                ].filter(
                                    actionButton =>
                                        currentUser.role === 'user' && ['View'].includes(actionButton.label)
                                        || currentUser.role === 'admin' && ['Edit', 'View', 'Delete'].includes(actionButton.label)
                                ).map(action => <Button key={action.label} text={action.label} onClick={action.onClick} />)

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
