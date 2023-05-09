import React, { useEffect, useState } from 'react'
import Layout from '../layouts'
import { useUsers } from '../hooks/useUsers'

const UsersPage = () => {

  const {users } = useUsers()

  return (
    <Layout>
      Users List from backend:
      <ul>
        {users.map(({ name, age})=><li className='flex gap-4' key={`${name}-${age}`}>
            <div>{name}</div>
            <div>{age}</div>
        </li>)}
      </ul>
    </Layout>
  )
}

export default UsersPage
