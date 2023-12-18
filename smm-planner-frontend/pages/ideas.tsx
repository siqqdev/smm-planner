import { Button } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks'
import { handleAddIdeaClicked } from '../store/addIdeaSlice';
import axios from 'axios';


interface Idea {
  ideaTitle: string,
  ideaText: string
}

interface IdeasProps {
  ideasArray: Idea[]
}

const Ideas: React.FC<IdeasProps> = () => {

  const dispatch = useAppDispatch();

  const handleAddidea = () => {
    dispatch(handleAddIdeaClicked({ isAddIdeaOpened: true }))
  }


  
  const apiUrl: string = 'http://127.0.0.1:8000'
  const [receivedIdeasArray, setReceivedIdeasArray] = useState<Idea[]>([])
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/ideas/`);
        setReceivedIdeasArray((prevIdeas => [...prevIdeas, response.data]));
        setLoading(false);
        console.log(`${apiUrl}/api/ideas/`);
        console.log(response.data);
      } catch (err: any) {
        console.error(err.response);
        setLoading(false);
      }
    };

    if (receivedIdeasArray.length === 0 && loading) {
      fetchData();
    }
  }, [receivedIdeasArray, loading]);

  return (
    <div className='w-full mt-10'>
      <div className='flex justify-center'>
          <div>
            <Button size='lg' className='ml-3 flex justify-center p-3 items-center' onClick={handleAddidea} placeholder=' '>
              Add Idea
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </Button>
          </div>
      </div>
      {/* <div>
          {Array.isArray(receivedIdeasArray) && receivedIdeasArray.length > 0 ? (
            receivedIdeasArray.map((idea, i) => (
              <div key={i} className='font-bold flex justify-center'>
                <div>{idea.ideaTitle}</div>
                <div>{idea.ideaText}</div>
              </div>
            ))
          ) : loading ? (
            <p>Loading...</p>
          ) : (
            <p>You don't have any ideas</p>
          )}
      </div> */}
      <div className='flex justify-center mt-5'>
        <p>Ideas will be showed soon...</p>
      </div>
    </div>
  )
}

export default Ideas