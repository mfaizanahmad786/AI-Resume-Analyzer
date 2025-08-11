import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import  ScoreCircle  from './ScoreCircle';

interface ApplicationCardProps {
  company: string;
  position: string;
  score: number;
  resumeImage: string;
  experience?: string;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  company,
  position,
  score,
  resumeImage,
  experience
}) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 rounded-xl sm:rounded-2xl overflow-hidden">
      <CardContent className="p-3 sm:p-4 pt-0">
        <div className="flex items-start sm:items-center justify-between mb-3 gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 truncate">{company}</h3>
            <p className="text-xs sm:text-sm text-gray-600 truncate">{position}</p>
            {experience && (
              <p className="text-xs text-gray-500 mt-1 truncate">{experience}</p>
            )}
          </div>
          <div className="flex-shrink-0">
            <ScoreCircle score={score} />
          </div>
        </div>
        
        <div className="relative rounded-lg sm:rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
          <img 
            src={resumeImage} 
            alt={`${company} resume`}
            className="w-full h-40 sm:h-48 lg:h-56 object-cover object-top bg-white p-1.5 sm:p-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};