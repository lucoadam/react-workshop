import { createContext, useContext, useEffect, useState } from "react"
import { loginUserApi } from "../api/users"

export const UserContext = createContext()

export const useUserContext = () => useContext(UserContext)


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        email: "",
        name: "",
        address: ""
    })
    const [users, setUsers] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        console.log("Initialize User Provider")
        // restoring user from local storage
        try {
            const userListString = window.localStorage.getItem("users")
            const userString = localStorage.getItem("currentUser")

            if (!!userListString) {
                const userArray = JSON.parse(userListString)
                console.log(userArray)
                setUsers(userArray)
            }

            if (!!userString) {
                const userObject = JSON.parse(userString)
                setUser(userObject)
                setIsLoggedIn(true)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const loginUser = async ({
        email,
        password
    }) => {
        if (!password | !email) {
            return {
                error: "All fields are required"
            }
        }

        try {
            const userResponse = await loginUserApi({
                email,
                password
            })
            console.log('userdata from backend', userResponse)
            localStorage.setItem("currentUser", JSON.stringify({
                email
            }))
            localStorage.setItem("accessToken", userResponse.data.accessToken)
            setUser({
                email
            })
            setIsLoggedIn(true)
    
            return {
                success: true
            }

        } catch (e) {
            return {
                error: e?.response?.data?.message ?? "Something went wrong"
            }
        }      
    }

    const registerUser = ({
        name,
        email,
        address,
        password
    }) => {
        const response = {}
        if (!password | !email | !address | !name) {
            response.error = "All fields are required"
            return response
        }
        // "bidhan " => "bidhan" => [ "bidhan"]
        if (name.trim().split(" ").length < 2) {
            response.error = "Name with surname is required"
            response.field = "name"
            return response
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            response.error = "Valid email is required"
            response.field = "email"
            return response
        }

        if (users.filter(usr => usr.email === email).length > 0) {
            response.error = "User with the email already exists"
            response.field = "email"
            return response
        }


        setUsers(prev => {
            const updatedUserArray = [
                {
                    name,
                    email,
                    address,
                    password,
                    createdAt: Date.now()
                },
                ...prev
            ];

            const userArrayAsString = JSON.stringify(updatedUserArray) //for converting object Array to string
            window.localStorage.setItem("users", userArrayAsString) // store to local storage 
            return updatedUserArray
        })
        response.success = true
        return response
    }

    return <UserContext.Provider value={{
        user,
        users,
        setUser,
        init,
        isLoggedIn,
        registerUser,
        loginUser
    }} >
        {children}
    </UserContext.Provider>
}