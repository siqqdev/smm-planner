'use client'

import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks';
import { handleAddPostClicked } from '../store/addPostSlice';
import { Button, Radio, Textarea } from '@material-tailwind/react';
import { animated } from 'react-spring';
import { RootState } from '@/store';
import axios from 'axios';
import { useSelector } from 'react-redux';



interface AddPostProps {}

const AddPost: React.FC<AddPostProps> = () => {

  const [inputFile, setInputFile] = useState<File | undefined>()
  const dispatch = useAppDispatch();
  const [filePreview, setFilePreview] = useState<string | undefined>()
  const [instagramChosen, setInstagramChosen] = useState<boolean>(false)
  const [tiktokChosen, setTiktokChosen] = useState<boolean>(false)
  const [facebookChosen, setFacebookChosen] = useState<boolean>(false)

  type variant = "filled" | "outlined" | "gradient" | "text";

  const choosedButtonStyles: variant = 'filled'
  const defaultButtonStyles: variant = 'outlined'

  const [instaButtonStyles, setInstaButtonStyles] = useState<variant>(defaultButtonStyles)
  const [tiktokButtonStyles, setTiktokButtonStyles] = useState<variant>(defaultButtonStyles)
  const [facebookButtonStyles, setFacebookButtonStyles] = useState<variant>(defaultButtonStyles)
  const [chosenSocialMedia, setChosenSocialMedia] = useState<string>('')


  const [contentType, setContentType] = useState<string>('')
  const [postText, setPostText] = useState<string>('')
  const [postDay, setPostDay] = useState<number>();
  const [postMonth, setPostMonth] = useState<number>();
  const [postYear, setPostYear] = useState<number>();

  const apiUrl = 'http://127.0.0.1:8000/'


  const handleClose = () => {
    dispatch(handleAddPostClicked( {isAddPostOpened: false, openedDate: undefined} ))
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }
    setInstagramChosen(false)
    setTiktokChosen(false)
    setFacebookChosen(false)
  }

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInputFile(file);
      const filePreviewUrl = URL.createObjectURL(file)
      setFilePreview(filePreviewUrl)
    }
  }

  const handleInstagram = () => {
    if (!instagramChosen) {
    setInstagramChosen(true)
    setFacebookChosen(false)
    setTiktokChosen(false)
    setInstaButtonStyles(choosedButtonStyles)
    setFacebookButtonStyles(defaultButtonStyles)
    setTiktokButtonStyles(defaultButtonStyles)
    }
    setChosenSocialMedia('Instagram')
  }

  const handleFacebook = () => {
    if(!facebookChosen) {
      setFacebookChosen(true)
      setInstagramChosen(false)
      setTiktokChosen(false)
      setFacebookButtonStyles(choosedButtonStyles)
      setInstaButtonStyles(defaultButtonStyles)
      setTiktokButtonStyles(defaultButtonStyles)
    }
    setChosenSocialMedia('Facebook')
  }

  const handleTiktok = () => {
    if(!tiktokChosen) {
      setTiktokChosen(true)
      setInstagramChosen(false)
      setTiktokChosen(false)
      setTiktokButtonStyles(choosedButtonStyles)
      setFacebookButtonStyles(defaultButtonStyles)
      setInstaButtonStyles(defaultButtonStyles)
      setChosenSocialMedia('Tiktok')
    }
  }

  const openedDate = useSelector((state: RootState) => state.addPost.openedDate)

  const handlePostType = () => {
    setContentType('Post')
  }

  const handleStoryType = () => {
    setContentType('Story')
  }

  const formatDate = () => {
    setPostDay(openedDate?.getDate());
    setPostMonth(openedDate?.getMonth());
    setPostYear(openedDate?.getFullYear());
    if (postMonth !== undefined) {
      setPostMonth(postMonth + 1)
    }

  }

  useEffect(() => {
    formatDate();
  }, [openedDate])

  const handleSubmit = () => {
  console.log(contentType);
  console.log(postText);
  console.log(inputFile);
  console.log(chosenSocialMedia);
  console.log(postDay);
  console.log(postMonth);
  console.log(postYear);

  const formData = new FormData();

  formData.append('socialMedia', chosenSocialMedia);
  formData.append('postDay', postDay !== undefined ? postDay.toString() : '');
  formData.append('postMonth', postMonth !== undefined ? postMonth.toString() : '');
  formData.append('postYear', postYear !== undefined ? postYear.toString() : '');

  formData.append('postText', postText);
  if (inputFile) {
    formData.append('postFile', inputFile);
  }
  formData.append('postType', contentType);

  axios.post(`${apiUrl}api/posts/`, formData)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.error(err.response);
    });

  setContentType('');
  setPostText('');
  setInputFile(undefined);
  setContentType('');
};

  const [receivedData, setReceivedData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (postDay !== undefined && postMonth !== undefined && postYear !== undefined) {
        try {
          const res = await axios.get(`${apiUrl}api/posts/get/?day=${postDay}&month=${postMonth}&year=${postYear}/`);
          setReceivedData(res.data);
        } catch (err: any) {
          console.error(err.response);
        }
      }
    };

    fetchData();
  }, [postDay, postMonth, postYear]);
  
  return (
    
    <animated.div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 max-w-full max-h-full bg-gray-200 rounded-md z-50">
        <div className='p-2 w-1/20'>
          <button className='hover:bg-gray-200' onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className='w-full flex ml-10'>
          <div className="w-1/5">
            <div className="flex flex-col h-full items-center">
              <div>
                <p className='p-2 font-bold font-roboto'>Choose Social Media</p>
              </div>
              <Button onClick={handleInstagram} variant={instaButtonStyles} size='md' className='m-2 w-40' color='blue-gray' placeholder=' '>
                Instagram
              </Button>
              <Button onClick={handleTiktok} variant={tiktokButtonStyles} className='m-2 w-40' color='blue-gray' placeholder=' '>
                Tik Tok
              </Button>
              <Button onClick={handleFacebook} variant={facebookButtonStyles} className='m-2 w-40' color='blue-gray' placeholder=' '>
                Facebook
              </Button>
              <Button onClick={handleSubmit} variant='filled' className='m-2 w-44 mt-5' placeholder=' '>
                Sumbit
              </Button>
            </div>
          </div>
          <div className="w-4/5 flex">
            <div className="w-1/2 flex flex-col justify-center mt-1">
              <div>
                <p className='font-bold pb-2 mt-1 font-roboto'>Add photo/video and text</p>
              </div>
              <div className=''>
                <Button size='sm' className='flex w-full justify-center' variant='outlined' placeholder=' '>
                  <input type="file" className='hidden max-w-5' id='fileInput' onChange={handleAddFile} multiple={false}/>
                  <label htmlFor="fileInput" className='text-black p-3 rounded-md cursor-pointer flex justify-center w-full h-full'>
                    Choose File
                  </label>
                </Button>
                <div className='h-full mt-2'>
                  <Textarea variant='outlined' size='lg' placeholder='Text for post' onChange={(e) => setPostText(e.target.value)}/>
                </div>
              </div>
              <div className='flex'>
                <Radio onClick={handlePostType} name='type' label='Post' color='gray' crossOrigin={undefined}/>
                <Radio onClick={handleStoryType} name='type' label='Story' color='gray' crossOrigin={undefined} />
              </div>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center pr-9 overflow-auto">
              <p className='font-bold font-roboto'>Your content:</p>
              <div className='flex flex-wrap justify-center max-h-96 overflow-auto'>
                {
                  Array.isArray(receivedData) ? receivedData.map((post) => (
                    <div key={post.id} className='flex flex-col items-center p-2'>
                      <div>
                        <p>{post.postText}</p>  
                      </div>
                      <div className='h-32 w-32'>
                        {post.postFile && <img src={post.postFile} alt="Post Image" />}
                      </div>
                    </div>
                  ))
                  : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default AddPost;
