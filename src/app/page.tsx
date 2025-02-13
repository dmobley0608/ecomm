import { getCurrentSession } from '@/actions/auth';
import React from 'react'

const page = async() => {
  const {user} = await getCurrentSession();
  return (
    <div>
      {JSON.stringify(user)}
    </div>
  )
}

export default page
