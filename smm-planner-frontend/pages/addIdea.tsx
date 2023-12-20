'use client'

import React, { useState } from 'react'
import { animated } from 'react-spring'
import { useAppDispatch } from '../hooks'
import { handleAddIdeaClicked } from '../store/addIdeaSlice';
import { Button, Input, Textarea } from '@material-tailwind/react';
import axios from 'axios';
import { setId } from '@material-tailwind/react/components/Tabs/TabsContext';

interface Idea {
  title: string,
  text: string
}

interface AddIdeaProps {
  ideasArray: Idea[]
}

type color = 'black' | 'green' | 'red'

const AddIdea: React.FC<AddIdeaProps> = ({}) => {

const [ideaTitle, setIdeaTitle] = useState<string>('')
const [ideaText, setIdeaText] = useState<string>('')
const [isIdeaAdded, setIdeaAdded] = useState<color>('black')

const dispatch = useAppDispatch();

const handleAddIdeaClose = () => {
  dispatch(handleAddIdeaClicked({ isAddIdeaOpened: false }))
  setIdeaAdded('black')
}

const apiUrl = 'http://127.0.0.1:8000/'

const handleAddNewIdea = () => {
  const formData = new FormData();
  formData.append('ideaTitle', ideaTitle)
  formData.append('ideaText', ideaText)
  
  axios.post(`${apiUrl}/api/ideas/`, formData)
      .then(res => {
        if (res.status === 200) {
          setIdeaAdded('green');
          console.log('data sent:', res.data);
          setIdeaText('');
          setIdeaTitle('');
          setTimeout(() => {
            dispatch(handleAddIdeaClicked({ isAddIdeaOpened: false }))
          }, 1000)
        }
      })
      .catch(err => {
        setIdeaAdded('red');
        console.log('err', err.response);
        setIdeaText('Try to fill idea again');
        setIdeaTitle('');
      });
  }

  const buttonColor = isIdeaAdded === 'green' ? 'green' : (isIdeaAdded === 'red' ? 'red' : 'black');

  return (
    <animated.div>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/6 h-2/5 max-w-full max-h-full bg-gray-200 rounded-md z-1000'>
        <div className='w-1/20 p-2'>
          <button onClick={handleAddIdeaClose}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className='w-full flex justify-center'>
            <div className=''> 
              <div className='flex flex-col gap-y-2 w-full'>
                <Input label='Idea Title' value={ideaTitle} onChange={(e) => { setIdeaTitle(e.target.value); } } crossOrigin={undefined}/>
                <Textarea label='Write your idea here...' value={ideaText} onChange={(e) => {setIdeaText(e.target.value)}}></Textarea> 
                <Button onClick={handleAddNewIdea} color={buttonColor} placeholder=' '>Add Idea</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  )
}

export default AddIdea