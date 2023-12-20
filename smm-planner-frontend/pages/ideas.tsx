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
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getData = () => {
    try {
      axios.get(`${apiUrl}/api/ideas/`)
      .then(res => {
        setReceivedIdeasArray(res.data['Ideas list']);
        console.log(res.data['Ideas list'])
      }
      )
      .catch(err => console.log(err.error)) 
      console.log(receivedIdeasArray)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
      getData()
  }, []);

  const refreshIdeas = () => {
    getData();
  }

  const openModal = (idea: Idea) => {
    setSelectedIdea(idea);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedIdea(null);
    setIsModalOpen(false);
  };

  return (
    <div className='w-full mt-10'>
      <div className=''>
          <div className='flex justify-center items-center space-x-4'>
            <Button size='lg' className='ml-3 flex justify-center p-3 items-center' onClick={handleAddidea} placeholder=' '>
              Add Idea
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </Button>
            <Button onClick={refreshIdeas} variant='outlined' className='flex justify-center p-3' placeholder=' '>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </Button>
          </div>
      </div>
      {isModalOpen && selectedIdea && (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md w-1/2 h-1/2'>
          <button onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
            <div className='flex justify-center flex-col items-center'>
              <div className='font-bold text-xl'>{selectedIdea.ideaTitle}</div>
              <div>{selectedIdea.ideaText}</div>
            </div>
        </div>
      )}
      <div className='mt-10 justify-center items-center flex-col max-w-5xl mx-auto grid grid-cols-5 gap-8'>
          {
            receivedIdeasArray.map((idea, i) => (
              <div key={i} onClick={() => openModal(idea)} className='w-50 h-40 overflow-hidden text-overflow-ellipsis border-2 border-gray hover:bg-gray-300 transition-all cursor-pointer rounded-md'>
                {idea && idea.ideaTitle && (
                  <div className=' p-2'>
                    <div className='font-bold'>
                      {idea.ideaTitle}
                    </div>
                    <div className=''>
                      {idea.ideaText}
                    </div>
                  </div>
                )}
              </div>
            ))
          
            }
      </div>
    </div>
  )
}

export default Ideas