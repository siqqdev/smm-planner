import React, { useEffect, useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths, subMonths, setMonth } from 'date-fns';
import { useAppDispatch } from '@/hooks';
import { handleAddPostClicked } from '@/store/addPostSlice';
import Head from 'next/head';
import axios, { AxiosResponse } from 'axios';

interface CalendarProps {
 handlePostClicked?: () => void,
}

const apiUrl = 'http://127.0.0.1:8000/'

const Calendar: React.FC<CalendarProps> = () => {
  let currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(currentDate)
  const firstRenderDays = eachDayOfInterval( {start: startOfMonth(currentMonth), end: endOfMonth(currentMonth)} )
  const [daysInMonth, setDaysInMonth] = useState<Date[]>(firstRenderDays)
  const invAddPostStyle: string = 'flex border-2 border-black rounded-md w-20 h-10 justify-center items-center p-10 hover:bg-green-100 transition-all duration-300 shadow-md'
  const defAddPostStyle: string = 'flex border-2 border-black rounded-md w-20 h-10 justify-center items-center p-10 mt-3 hover:bg-yellow-100 transition-all duration-300 shadow-md'
  const [hoveredDays, setHoveredDays] = useState<Record<string, boolean>>({});
  const [receivedDays, setReceivedDays] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    const startDay = startOfMonth(currentMonth);
    const endDay = endOfMonth(currentMonth);
    const daysArray = eachDayOfInterval( {start: startDay, end: endDay} )
    setDaysInMonth(daysArray)
  }, [currentMonth])

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const nextMonth = addMonths(prevMonth, 1);
      fetchMonthData(nextMonth);
      return nextMonth;
    });
  };
  
  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      const nextMonth = subMonths(prevMonth, 1);
      fetchMonthData(nextMonth);
      return nextMonth;
    });
  };
  


  const handleMouseEnter = (day: Date) => {
    if (isClient) {
      setHoveredDays((prevHoveredDays) => ({
        ...prevHoveredDays,
        [format(day, 'yyyy-MM-dd')]: true,
      }));
    }
  };

  const handleMouseLeave = (day: Date) => {
    if (isClient) {
      setHoveredDays((prevHoveredDays) => ({
        ...prevHoveredDays,
        [format(day, 'yyyy-MM-dd')]: false,
      }));
    }
  };
  const handleAddPost = (day: Date) => {
    dispatch(handleAddPostClicked( {isAddPostOpened: true, openedDate: day} ));
  }

  const fetchMonthData = (date: Date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    console.log(`${apiUrl}/api/posts/get_days/?month=${month}&year=${year}`);
    axios.get(`${apiUrl}/api/posts/get_days/?month=${month}&year=${year}`)
      .then((res: AxiosResponse<any, any>) => {
        console.log(res.data);
  
        const daysWithPosts = res.data?.days_with_posts || [];
  
        const receivedDaysArray = daysWithPosts.map((day: number) => day.toString());
  
        setReceivedDays(receivedDaysArray);
        console.log('data', receivedDaysArray);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  
  
  useEffect(() => {
    fetchMonthData(currentDate);
  }, []);
  
  return (
      <div>
        <Head>
          <title>Calendar</title>
          <meta name='description' content='SMM Calendar'/>
        </Head>
        <div className='flex justify-center mt-10'>
          <div>
            <button onClick={handlePreviousMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            </button>
          </div>
          <div className=' text-lg '>
            {format(currentMonth, 'MMMM yyyy')}
          </div>
          <div>
            <button onClick={handleNextMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            </button>
          </div>
        </div>
    <div className='grid grid-cols-7 gap-3 justify-center items-center mx-auto max-w-screen-md mt-4'>
    {daysInMonth.map((day) => (
  <div
    key={format(day, 'yyyy-MM-dd')}
    className={`${hoveredDays[format(day, 'yyyy-MM-dd')] ? invAddPostStyle : defAddPostStyle} cursor-pointer ${
      Array.isArray(receivedDays) && receivedDays.includes(day.getDate().toString()) ? 'bg-yellow-200' : ''
    }`}
    onMouseEnter={() => handleMouseEnter(day)}
    onMouseLeave={() => handleMouseLeave(day)}
    onClick={() => handleAddPost(day)}
  >
    {hoveredDays[format(day, 'yyyy-MM-dd')] ? (
      <button>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-9 h-9'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 4.5v15m7.5-7.5h-15'
          />
        </svg>
      </button>
    ) : (
      <p>{format(day, 'dd')}</p>
    )}
  </div>
))}

    </div>
      </div>
    
  );
};

export default Calendar;
