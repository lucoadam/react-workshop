import axiosInstance from "./axiosInstance"

// callback hell  ===> asynchronous call inside the normal function
// const getUsers = () => {
//     let data = []  // data = []
//     const promise = axiosInstance.get("/api/users") // promise<pending>
//     promise.then((axiosResponse)=>{
//         console.log(axiosResponse)
//         data = axiosResponse.data
//         return data
//     }) // 4 sec
//     .catch((error)=>{
//         console.log(error)
//     })

//     return promise /// 0.2 ms
// }

// completely asynchronos which returns promise as a whole
export const loginUserApi = async ({
    email,
    password
}) => {
    const result = await axiosInstance.post("/api/login", {
        email,
        password
    })

    return result.data
}



export const registerUserApi = async ({
    name, password, email, address
}) => {
    const result = await axiosInstance.post("/api/register", {
        name, password, email, address
    })

    return result.data
}

export const getUsers = async () => {
    //start
    const result = await axiosInstance.get("/api/users")  // fulfilled, rejected
    //stop
    return result.data
}

// alternate way
export const getUsersThroughCallback = () => {
    return axiosInstance.get("/api/users")
        .then(res => {
            return res.data
        })
}

export const postUser = async (data) => {
    const result = await axiosInstance.post("/api/users", data)
    return result.data
}

export const updateUser = async ({
    _id,
    ...data
}) => {
    const result = await axiosInstance.put(`/api/users/${_id}`, data)
    return result.data
}

export const deleteUser = async ({
    _id
}) => {
    const result = await axiosInstance.delete(`/api/users/${_id}`)
    return result.data
}

export const getUserDetail = async ({
    _id
}) => {
    const result = await axiosInstance.get(`/api/users/${_id}`)
    return result.data
}