import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Context';

interface ReviewHeaderProps {
  companyName: string;
  jobTitle: string;
}

const ReviewHeader: React.FC<ReviewHeaderProps> = ({ companyName, jobTitle }) => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = async () => {
    try {
      if (auth?.logout) {
        await auth.logout();
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='bg-white border-b border-gray-200 shadow-sm'>
      <div className='mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 w-full'>
        <div className='flex items-center justify-between'>
          {/* Left side - Back button and breadcrumb */}
          <div className='flex items-center gap-2 sm:gap-4 min-w-0 flex-1'>
            <Button 
              variant={'outline'} 
              className='flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm flex-shrink-0'
              onClick={() => navigate('/')}
            >
              <img src="/src/assets/public/icons/back.svg" alt="Back" className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Back to Home</span>
              <span className="xs:hidden">Back</span>
            </Button>

            {/* Company and Job info - Hidden on mobile */}
            <div className='hidden md:flex items-center text-gray-600 min-w-0'>
              <span className='font-medium text-gray-800 truncate'>{companyName}</span>
              <span className='mx-2 text-gray-400 flex-shrink-0'>•</span>
              <span className='font-medium text-gray-800 truncate'>{jobTitle}</span>
              <span className='mx-2 text-gray-400 flex-shrink-0'>&gt;</span>
              <span className='text-violet-600 font-semibold flex-shrink-0'>Resume Analysis</span>
            </div>

            {/* Mobile-only simplified breadcrumb */}
            <div className='md:hidden flex items-center text-gray-600'>
              <span className='text-violet-600 font-semibold text-sm'>AI Analysis</span>
            </div>
          </div>

          {/* Right side - Status indicator and user actions */}
          <div className='flex items-center gap-2 sm:gap-4 flex-shrink-0'>
            {/* User info and logout - Hidden on small mobile */}
            {auth?.user && (
              <div className='hidden sm:flex items-center gap-2 sm:gap-3'>
                <span className='text-xs sm:text-sm text-gray-600'>
                  {auth.user.displayName || auth.user.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className='px-2 sm:px-3 py-1 text-xs sm:text-sm'
                >
                  Logout
                </Button>
              </div>
            )}

            {/* Status indicator */}
            <div className='flex items-center gap-2 sm:gap-3'>
              <div className='text-right'>
                <p className='text-xs sm:text-sm font-medium text-gray-800'>AI Analysis Complete</p>
                <p className='text-xs text-gray-500 hidden sm:block'>Ready for review</p>
              </div>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
            </div>

            {/* Mobile-only logout button */}
            {auth?.user && (
              <div className='sm:hidden'>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className='px-2 py-1 text-xs'
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewHeader;