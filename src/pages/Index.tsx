import Header from '@/components/Header'
import { useAuth } from '@/context/Context'


const Index = () => {
  const auth = useAuth();
  
  if (!auth) {
    return null; // or a loading state
  }
  

  return (
    <div 
      className='min-h-screen bg-cover bg-center bg-no-repeat bg-fixed'
      style={{ backgroundImage: "url('/src/assets/public/images/bg-main.svg')" }}
    >
      <div className='min-h-screen bg-white/10 backdrop-blur-[0.5px]'>
        <Header/>
        
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Turn your resumes into stunning,{' '}
              <br className="hidden sm:block" />
              <span className="text-indigo-600">AI-powered insights.</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              Convert your complex resume analysis into visually engaging feedback that 
              simplifies improvement, boosts job prospects, and skyrockets your success.
            </p>
            
            {/* CTA Button */}
            <button 
              onClick={() => window.location.href = '/signup'}
              className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl "
            >
              Analyze for free ↗
            </button>
            
            {/* User Stats */}
        
          </div>
        </div>

        {/* Resume Examples Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-10">
          <div className="flex justify-center items-end gap-0 -space-x-4 sm:-space-x-8 lg:-space-x-12">
            <img 
              src="/src/assets/public/images/resume_01.png" 
              alt="Resume 1" 
              className="w-full max-w-[120px] sm:max-w-sm lg:max-w-md h-auto rounded-lg hover:shadow-xl transition-all duration-300 z-10 border-[10px] border-[rgba(144,215,255,0.27)] shadow-[0px_4px_30px_rgba(14,15,42,0.15),0px_15px_60px_rgba(14,15,42,0.2)]"
            />
            <img 
              src="/src/assets/public/images/resume_02.png" 
              alt="Resume 2" 
              className="w-full max-w-[120px] sm:max-w-sm lg:max-w-md h-auto rounded-lg hover:shadow-2xl transition-all duration-300 -translate-y-4 sm:-translate-y-8 lg:-translate-y-25 z-30 border-[10px] border-[rgba(144,215,255,0.27)] shadow-[0px_4px_30px_rgba(14,15,42,0.15),0px_15px_60px_rgba(14,15,42,0.2)]"
            />
            <img 
              src="/src/assets/public/images/resume_03.png" 
              alt="Resume 3" 
              className="w-full max-w-[120px] sm:max-w-sm lg:max-w-md h-auto rounded-lg hover:shadow-xl transition-all duration-300 z-10 border-[10px] border-[rgba(144,215,255,0.27)] shadow-[0px_4px_30px_rgba(14,15,42,0.15),0px_15px_60px_rgba(14,15,42,0.2)]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index