import { useEffect, useState } from "react"
import { getUserDetail, getUsers, postUser, updateUser, deleteUser } from "../api/users";

export const useUsers = () => {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setLoading(true)
        getUsers()
            .then(usersResponse => {
                setUsers(usersResponse)
                setLoading(false)
            })
    }, [])

    const fetchUsers = async () => {
        setLoading(true)
        const userResponse = await getUsers();
        setUsers(userResponse)
        setLoading(false)
    }

    const getUserById = async (id) => {
        setLoading(true)
        const userResponse = await getUserDetail({
            _id: id
        })
        setLoading(false)
        return userResponse
    }

    const removeUser = async (_id) => {
        setLoading(true)
        const userResponse = await deleteUser({ _id })
        setUsers(prevUser => prevUser.filter(user => user._id !== _id));
        setLoading(false)
    }

    const createUser = async (data) => {
        setLoading(true)
        try {
            await postUser(data)
        } catch (err) {
            throw err
        }
        setLoading(false)
    }


    const editUser = async ({
        id, ...data
    }) => {
        setLoading(true)

        const userResponse = await updateUser({ _id: id, ...data })
        setLoading(false)
    }
    return {
        users,
        fetchUsers,
        getUserById,
        removeUser,
        editUser,
        createUser,
        loading
    }
}