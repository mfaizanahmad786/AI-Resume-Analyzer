import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate();

    return (
        <header className='w-full pt-6 sm:pt-8 lg:pt-10 px-4 sm:px-6'>
            <div className='flex flex-col items-center gap-6 sm:gap-8'>
                <div className='bg-white/90 backdrop-blur-sm w-full max-w-4xl rounded-2xl sm:rounded-3xl lg:rounded-4xl shadow-lg border border-gray-200/50'>
                    <div className='px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0'>
                        <h1 className='font-bold text-xl sm:text-2xl text-gray-800'>RESUMIND</h1>
                        <div className='flex flex-col sm:flex-row gap-2 sm:gap-0 w-full sm:w-auto'>
                        <Button 
                            variant={'default'} 
                            className='bg-violet-500 hover:bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg cursor-pointer text-sm sm:text-base w-full sm:w-auto'
                            onClick={()=> navigate('/upload')}
                        >
                            Upload Resume
                        </Button>
                        <Button 
                            variant={'default'} 
                            className='bg-violet-500 hover:bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg cursor-pointer text-sm sm:text-base w-full sm:w-auto sm:ml-5'
                            onClick={()=> navigate('/login')}
                        >
                            Log In
                        </Button>
                        </div>
                    </div>
                </div>

                <div className='text-center mt-3 sm:mt-5 px-4'>
                    <h1 className='text-2xl sm:text-4xl lg:text-6xl font-semibold text-black mb-3 sm:mb-4 leading-tight' style={{ 
                        textShadow: '0 0 20px rgba(0,0,0,0.1), -10px 0 20px rgba(0,0,0,0.05), 10px 0 20px rgba(0,0,0,0.05)'
                    }}>
                        Track Your Applications <br className='hidden sm:block' /> 
                        <span className='sm:hidden'>& </span>
                        <span className='hidden sm:inline'>& </span>Resume Ratings
                    </h1>
                    <p className='text-sm sm:text-base lg:text-lg text-black/80 max-w-2xl mx-auto' style={{ 
                        textShadow: '0 0 15px rgba(0,0,0,0.08), -8px 0 15px rgba(0,0,0,0.03), 8px 0 15px rgba(0,0,0,0.03)'
                    }}>
                        Review your submisions and check AI powered feedback
                    </p>
                </div>
            </div>
        </header>
    )
}

export default Header