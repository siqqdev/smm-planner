import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'

const Content = () => {

  const apiUrl = 'http://127.0.0.1:8000/'

  const [receivedPosts, setReceivedPosts] = useState<any[]>([])

  useEffect(() => {
    axios.get(`${apiUrl}/api/posts/`)
    .then((res: AxiosResponse<any, any>) => {
      setReceivedPosts(res.data)
      console.log(res.data);
      
    })
    .catch(err => console.log(err.response)
    )
  },[])

  return (
    <div className='flex justify-center mt-5'>
        <div className='mt-10 justify-center items-center flex-col max-w-5xl mx-auto grid grid-cols-5 gap-8'>
          {
            receivedPosts.map((post, i) => (
              <div className='w-40 h-60 border-2 border-gray rounded-md flex flex-col items-center hover:bg-gray-200 cursor-pointer transition-all'>
                <div className='font-bold text-2xl'>
                  {post.postDay}.{post.postMonth}.{post.postYear}
                </div>
                <div className='font-bold'>
                  {post.socialMedia}
                </div>
                <div>
                  {post.postType}
                </div>
                <div className='w-36 h-36'>
                  {post.postFile && <img src={post.postFile} alt="Post Image" />}
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Content