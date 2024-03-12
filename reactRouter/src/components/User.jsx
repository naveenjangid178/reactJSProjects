import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
    const {userid} = useParams()
  return (
    <div className='flex justify-center py-5 text-3xl bg-gray-600 text-white'>User : {userid}</div>
  )
}

export default User