import React from 'react'
import Header from '@/components/Header'
import {ApplicationCard} from '@/components/ApplicationCard'
import {resumes} from '@/data/applications'


const Index = () => {
  return (
    <div 
      className='min-h-screen bg-cover bg-center bg-no-repeat bg-fixed'
      style={{ backgroundImage: "url('/src/assets/public/images/bg-main.svg')" }}
    >
      <div className='min-h-screen bg-white/5 backdrop-blur-[0.5px]'>
        <Header/>
        
        {/* Application Cards Section */}
        <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
            {resumes.map((resume)=>(
              <ApplicationCard
                key={resume.id}
                company={resume.companyName}
                position={resume.jobTitle ?? ""}
                resumeImage={resume.imagePath}
                score={resume.feedback.overallScore}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index