import { Button } from '@material-tailwind/react'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className='mt-5 flex flex-col justify-center items-center'>
        <div className=''>
            <div className='font-bold mb-2'>
                <p>Do you have new content for us?</p>
            </div>
            <div className='flex justify-center'>
                <Link href='/calendar'>See the calendar</Link>
            </div>
        </div>
    </div>
  )
}

export default Home