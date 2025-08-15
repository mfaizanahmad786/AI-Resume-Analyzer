import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/Context'

const Header = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    
    if (!auth) {
        return null; // or a loading state
    }
    
    const { user, logout } = auth;

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <header className='w-full pt-4 sm:pt-6 lg:pt-8 px-2 sm:px-6'>
            <div className='flex flex-col items-center gap-6 sm:gap-8'>
                <div className='bg-white/90 backdrop-blur-sm w-full max-w-4xl rounded-2xl sm:rounded-3xl lg:rounded-4xl shadow-lg border border-gray-200/50'>
                    <div className='px-4 sm:px-6 lg:px-8 py-2 sm:py-3 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0'>
                        <div 
                            className='cursor-pointer hover:opacity-80 transition-opacity duration-200 flex items-center justify-center sm:justify-start'
                            onClick={() => navigate('/')}
                        >
                            <img 
                                src="/images/header-logo.png" 
                                alt="RESUMIND Logo" 
                                className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
                            />
                        </div>
                        <div className='flex flex-col sm:flex-row gap-2 sm:gap-0 w-full sm:w-auto'>
                            {user ? (
                                // Show Upload Resume and Logout buttons when logged in
                                <>
                                    <Button 
                                        variant={'default'} 
                                        className='bg-violet-500 hover:bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg cursor-pointer text-sm sm:text-base w-full sm:w-auto'
                                        onClick={()=> navigate('/upload')}
                                    >
                                        Upload Resume
                                    </Button>
                                    <Button 
                                        variant={'default'} 
                                        className='bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 rounded-lg cursor-pointer text-sm sm:text-base w-full sm:w-auto sm:ml-5'
                                        onClick={handleLogout}
                                    >
                                        Log Out
                                    </Button>
                                </>
                            ) : (
                                // Show only Login button when not logged in
                                <Button 
                                    variant={'default'} 
                                    className='bg-violet-500 hover:bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg cursor-pointer text-sm sm:text-base w-full sm:w-auto'
                                    onClick={()=> navigate('/login')}
                                >
                                    Log In ↗
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header