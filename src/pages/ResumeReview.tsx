import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewHeader from '@/components/ReviewHeader';
import ScoreGauge from '@/components/ScoreGauge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { convertPdfToImage, getPdfPageCount } from '../utils/pdfToImage';

import { useAnalysis } from '@/context/AnalysisContext';

interface AnalysisData {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  fileName: string;
  pdfData: string;
}

const ResumeReview = () => {
  const { analysisData: aiResponse, isAnalysisAvailable } = useAnalysis()

  const [pdfDisplayData, setPdfDisplayData] = useState<AnalysisData | null>(null);
  const [resumeImage, setResumeImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have analysis data from context
    if (!isAnalysisAvailable || !aiResponse) {
      navigate('/upload');
      return;
    }

    const loadAnalysisData = async () => {
      try {
        // Get data from sessionStorage for PDF display
        const pdfData = sessionStorage.getItem('uploadedPDF');
        const fileName = sessionStorage.getItem('pdfFileName');
        const companyName = sessionStorage.getItem('companyName');
        const jobTitle = sessionStorage.getItem('jobTitle');
        const jobDescription = sessionStorage.getItem('jobDescription');

        if (!pdfData || !fileName || !companyName || !jobTitle) {
          navigate('/upload');
          return;
        }

        const data: AnalysisData = {
          pdfData,
          fileName,
          companyName,
          jobTitle,
          jobDescription: jobDescription || ''
        };

        setPdfDisplayData(data);

        // Get PDF info
        setIsConverting(true);
        const pageCount = await getPdfPageCount(pdfData);
        setTotalPages(pageCount);

        // Convert first page to image
        const imageDataUrl = await convertPdfToImage(pdfData, {
          pageNumber: 1,
          scale: 2.0,
          format: 'png'
        });

        setResumeImage(imageDataUrl);

      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Failed to load resume. Please try uploading again.');
      } finally {
        setIsConverting(false);
      }
    };

    loadAnalysisData();
  }, [navigate, isAnalysisAvailable, aiResponse]);

  const handlePageChange = async (pageNumber: number) => {
    if (!pdfDisplayData || pageNumber === currentPage) return;

    try {
      setIsConverting(true);
      setCurrentPage(pageNumber);

      const imageDataUrl = await convertPdfToImage(pdfDisplayData.pdfData, {
        pageNumber,
        scale: 2.0,
        format: 'png'
      });

      setResumeImage(imageDataUrl);
    } catch (err) {
      console.error('Error converting page:', err);
      setError(`Failed to load page ${pageNumber}`);
    } finally {
      setIsConverting(false);
    }
  };

  const getCategory = (score: number): string => {
        if (score >= 80) {
      return "Strong";
    } else if (score < 80 && score > 70) {
      return "Good Start"
    } else {
      return "Needs Improvement";
    }

  }

  const getCategoryStyle = (score: number) => {
    const category = getCategory(score);
    switch (category) {
      case "Strong":
        return "bg-green-100 text-green-800";
      case "Good Start":
        return "bg-yellow-100 text-yellow-800";
      case "Needs Improvement":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  const getATSCategory = (score:number) =>{
    if(score>=70){
      return "good"
    }else if(score<70 && score>=60){
      return "warning"
    }else{
      return "bad"
    }
  }

  const getAtsStyle = (score: number) => {
    const category: string = getATSCategory(score);

    switch (category) {
      case "good":
        return "bg-gradient-to-r from-teal-50 to-cyan-50";
      case "warning":
        return "bg-gradient-to-r from-yellow-50 to-orange-50";
      case "bad":
        return "bg-gradient-to-r from-red-50 to-pink-50";
      default:
        return "bg-gradient-to-r from-gray-50 to-gray-100";
    }
  }

  const getATSIcon = (score: number) => {
    const category: string = getATSCategory(score);

    switch (category) {
      case "good":
        return "src/public/ats-good.svg";
      case "warning":
        return "src/public/ats-warning.svg";
      case "bad":
        return "src/public/ats-bad.svg";
      default:
        return "src/public/ats-good.svg";
    }
  }

  if (!pdfDisplayData && !error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ReviewHeader
        companyName={pdfDisplayData?.companyName || ''}
        jobTitle={pdfDisplayData?.jobTitle || ''}
      />

      <div className="mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 lg:py-8 w-full">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 sm:mb-6 text-center text-sm">
            {error}
            <button
              onClick={() => navigate('/upload')}
              className="ml-4 underline hover:no-underline"
            >
              Upload New Resume
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">

          {/* PDF Display Section */}
          <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 lg:p-6 order-2 xl:order-1" style={{
            backgroundImage: "url('src/assets/public/images/bg-small.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold">Resume Preview</h2>

              {/* Page Navigation */}
              {totalPages > 1 && (
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm text-gray-600">Page:</span>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      disabled={isConverting}
                      className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded transition-colors ${currentPage === i + 1
                        ? 'bg-violet-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        } disabled:opacity-50`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2">
                    of {totalPages}
                  </span>
                </div>
              )}
            </div>

            {/* PDF Image Display */}
            <div className="border rounded-lg overflow-hidden bg-white">
              {isConverting ? (
                <div className="flex items-center justify-center py-12 sm:py-16 lg:py-32">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Converting PDF page...</p>
                  </div>
                </div>
              ) : resumeImage ? (
                <img
                  src={resumeImage}
                  alt={`Resume page ${currentPage}`}
                  className="w-full h-auto object-contain shadow-sm max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[600px] xl:max-h-[800px]"
                />
              ) : (
                <div className="flex items-center justify-center py-12 sm:py-16 lg:py-32 text-gray-500">
                  <p className="text-xs sm:text-sm lg:text-base">No resume preview available</p>
                </div>
              )}
            </div>
          </div>

          {/* Analysis Results Section */}
          <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 lg:p-6 order-1 xl:order-2">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">Resume Review</h2>

            {/* Overall Score with ScoreGauge */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <div className="text-center mb-4">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2">Your Resume Score</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">This score is calculated based on the variables listed below</p>
                <ScoreGauge score={aiResponse?.analysis?.overallScore || 0} />
                
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-4 sm:mb-6 lg:mb-8">
              <div className="flex justify-between items-center bg-[#FAFAFA] p-2 sm:p-3 rounded">
                <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                  <span className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base truncate">Tone & Style</span>
                  <span className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0 ${getCategoryStyle(aiResponse?.analysis?.toneAndStyle?.score || 0)}`}>{getCategory(aiResponse?.analysis?.toneAndStyle?.score || 0)}</span>
                </div>
                <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 flex-shrink-0">{aiResponse?.analysis?.toneAndStyle?.score || 0}/100</span>
              </div>
              

              <div className="flex justify-between items-center bg-[#FAFAFA] p-2 sm:p-3 rounded">
                <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                  <span className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base truncate">Content</span>
                  <span className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0 ${getCategoryStyle(aiResponse?.analysis?.content?.score || 0)}`}>{getCategory(aiResponse?.analysis?.content?.score || 0)}</span>
                </div>
                <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 flex-shrink-0">{aiResponse?.analysis?.content?.score || 0}/100</span>
              </div>
              

              <div className="flex justify-between items-center bg-[#FAFAFA] p-2 sm:p-3 rounded">
                <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                  <span className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base truncate">Structure</span>
                  <span className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0 ${getCategoryStyle(aiResponse?.analysis?.structure?.score || 0)}`}>{getCategory(aiResponse?.analysis?.structure?.score || 0)}</span>
                </div>
                <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 flex-shrink-0">{aiResponse?.analysis?.structure?.score || 0}/100</span>
              </div>
              

              <div className="flex justify-between items-center bg-[#FAFAFA] p-2 sm:p-3 rounded">
                <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                  <span className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base truncate">Skills</span>
                  <span className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0 ${getCategoryStyle(aiResponse?.analysis?.skills?.score || 0)}`}>{getCategory(aiResponse?.analysis?.skills?.score || 0)}</span>
                </div>
                <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 flex-shrink-0">{aiResponse?.analysis?.skills?.score || 0}/100</span>
              </div>
            
            </div>

            {/* ATS Score Section */}
            <div className={`rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border shadow-md ${getAtsStyle(aiResponse?.analysis?.ATS?.score || 0)} ${
              getATSCategory(aiResponse?.analysis?.ATS?.score || 0) === 'good' ? 'border-teal-200' : 
              getATSCategory(aiResponse?.analysis?.ATS?.score || 0) === 'warning' ? 'border-yellow-200' : 'border-red-200'
            }`}>
              <div className="flex items-start sm:items-center gap-3 mb-3">
                <img src={getATSIcon(aiResponse?.analysis?.ATS?.score || 0)} alt={`${getATSCategory(aiResponse?.analysis?.ATS?.score || 0)} ATS Score`} className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">ATS Score - {aiResponse?.analysis?.ATS?.score || 0}/100</h3>
                  <p className="text-xs sm:text-sm text-gray-600">How well does your resume pass through Applicant Tracking Systems?</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 mb-4">Your resume matches some keywords and skills preferred by the employer: Here's how it performed:</p>

              <div className="space-y-2">
                {aiResponse?.analysis?.ATS?.tips?.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs sm:text-sm">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      tip.type === 'good' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}>
                      <span className="text-white text-xs">
                        {tip.type === 'good' ? '✓' : '!'}
                      </span>
                    </div>
                    <span className={tip.type === 'good' ? 'text-green-700' : 'text-yellow-700'}>
                      {tip.tip}
                    </span>
                  </div>
                )) || []}
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mt-4 italic">Want a better score? Improve your resume by applying the suggestions listed below</p>
            </div>

            {/* Accordion Sections */}
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="tone-style" className="border rounded-lg px-2 sm:px-4">
                <AccordionTrigger className="hover:no-underline text-left">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium mr-2 text-sm sm:text-base">Tone & Style</span>
                    <span className={`text-xs px-2 py-1 rounded ${getCategoryStyle(aiResponse?.analysis?.toneAndStyle?.score || 0)}`}>{aiResponse?.analysis?.toneAndStyle?.score || 0}/100</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {/* Summary Tips Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      {aiResponse?.analysis?.toneAndStyle?.tips?.map((tip, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <img 
                            src={tip.type === 'good' ? "src/public/check.svg" : "src/public/warning.svg"} 
                            alt={tip.type === 'good' ? "Good" : "Warning"} 
                            className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5' 
                          />
                          <span className="text-xs sm:text-sm font-medium text-gray-700">{tip.tip}</span>
                        </div>
                      )) || []}
                    </div>

                    {/* Detailed Explanation Boxes */}
                    <div className="space-y-3 sm:space-y-4">
                      {aiResponse?.analysis?.toneAndStyle?.tips?.map((tip, index) => (
                        <div key={index} className={`${
                          tip.type === 'good' ? 'bg-teal-50 border-teal-200' : 'bg-yellow-50 border-yellow-200'
                        } border rounded-lg p-3 sm:p-4`}>
                          <div className='flex gap-2'>
                            <div>
                              <img 
                                src={tip.type === 'good' ? "src/public/check.svg" : "src/public/warning.svg"} 
                                alt={tip.type === 'good' ? "Check" : "Warning"} 
                                className='w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0' 
                              />
                            </div>
                            <div>
                              <h5 className={`font-medium text-xs sm:text-sm mb-2 ${
                                tip.type === 'good' ? 'text-teal-800' : 'text-yellow-800'
                              }`}>{tip.tip}</h5>
                              <ul className={`text-xs sm:text-sm list-disc list-inside space-y-1 ${
                                tip.type === 'good' ? 'text-teal-700' : 'text-yellow-700'
                              }`}>
                                {tip.points?.map((point, pointIndex) => (
                                  <li key={pointIndex}>{point}</li>
                                )) || []}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )) || []}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="content" className="border rounded-lg px-2 sm:px-4">
                <AccordionTrigger className="hover:no-underline text-left">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium mr-2 text-sm sm:text-base">Content</span>
                    <span className={`text-xs px-2 py-1 rounded ${getCategoryStyle(aiResponse?.analysis?.content?.score || 0)}`}>{aiResponse?.analysis?.content?.score || 0}/100</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {/* Summary Tips Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      {aiResponse?.analysis?.content?.tips?.map((tip, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <img 
                            src={tip.type === 'good' ? "src/public/check.svg" : "src/public/warning.svg"} 
                            alt={tip.type === 'good' ? "Good" : "Warning"} 
                            className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5' 
                          />
                          <span className="text-xs sm:text-sm font-medium text-gray-700">{tip.tip}</span>
                        </div>
                      )) || []}
                    </div>

                    {/* Detailed Explanation Boxes */}
                    <div className="space-y-3 sm:space-y-4">
                      {aiResponse?.analysis?.content?.tips?.map((tip, index) => (
                        <div key={index} className={`${
                          tip.type === 'good' ? 'bg-teal-50 border-teal-200' : 'bg-yellow-50 border-yellow-200'
                        } border rounded-lg p-3 sm:p-4`}>
                          <div className='flex gap-2'>
                            <div>
                              <img 
                                src={tip.type === 'good' ? "src/public/check.svg" : "src/public/warning.svg"} 
                                alt={tip.type === 'good' ? "Check" : "Warning"} 
                                className='w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0' 
                              />
                            </div>
                            <div>
                              <h5 className={`font-medium text-xs sm:text-sm mb-2 ${
                                tip.type === 'good' ? 'text-teal-800' : 'text-yellow-800'
                              }`}>{tip.tip}</h5>
                              <ul className={`text-xs sm:text-sm list-disc list-inside space-y-1 ${
                                tip.type === 'good' ? 'text-teal-700' : 'text-yellow-700'
                              }`}>
                                {tip.points?.map((point, pointIndex) => (
                                  <li key={pointIndex}>{point}</li>
                                )) || []}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )) || []}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="structure" className="border rounded-lg px-2 sm:px-4">
                <AccordionTrigger className="hover:no-underline text-left">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium mr-2 text-sm sm:text-base">Structure</span>
                    <span className={`text-xs px-2 py-1 rounded ${getCategoryStyle(aiResponse?.analysis?.structure?.score || 0)}`}>{aiResponse?.analysis?.structure?.score || 0}/100</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {/* Summary Tips Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      {aiResponse?.analysis?.structure?.tips?.map((tip, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <img 
                            src={tip.type === 'good' ? "src/public/check.svg" : "src/public/warning.svg"} 
                            alt={tip.type === 'good' ? "Good" : "Warning"} 
                            className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5' 
                          />
                          <span className="text-xs sm:text-sm font-medium text-gray-700">{tip.tip}</span>
                        </div>
                      )) || []}
                    </div>

                    {/* Detailed Explanation Boxes */}
                    <div className="space-y-3 sm:space-y-4">
                      {aiResponse?.analysis?.structure?.tips?.map((tip, index) => (
                        <div key={index} className={`${
                          tip.type === 'good' ? 'bg-teal-50 border-teal-200' : 'bg-yellow-50 border-yellow-200'
                        } border rounded-lg p-3 sm:p-4`}>
                          <div className='flex gap-2'>
                            <div>
                              <img 
                                src={tip.type === 'good' ? "src/public/check.svg" : "src/public/warning.svg"} 
                                alt={tip.type === 'good' ? "Check" : "Warning"} 
                                className='w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0' 
                              />
                            </div>
                            <div>
                              <h5 className={`font-medium text-xs sm:text-sm mb-2 ${
                                tip.type === 'good' ? 'text-teal-800' : 'text-yellow-800'
                              }`}>{tip.tip}</h5>
                              <ul className={`text-xs sm:text-sm list-disc list-inside space-y-1 ${
                                tip.type === 'good' ? 'text-teal-700' : 'text-yellow-700'
                              }`}>
                                {tip.points?.map((point, pointIndex) => (
                                  <li key={pointIndex}>{point}</li>
                                )) || []}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )) || []}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="skills" className="border rounded-lg px-2 sm:px-4">
                <AccordionTrigger className="hover:no-underline text-left">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium mr-2 text-sm sm:text-base">Skills</span>
                    <span className={`text-xs px-2 py-1 rounded ${getCategoryStyle(aiResponse?.analysis?.skills?.score || 0)}`}>{aiResponse?.analysis?.skills?.score || 0}/100</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {/* Summary Tips Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      {aiResponse?.analysis?.skills?.tips?.map((tip, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <img 
                            src={tip.type === 'good' ? "src/public/check.svg" : "src/public/warning.svg"} 
                            alt={tip.type === 'good' ? "Good" : "Warning"} 
                            className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5' 
                          />
                          <span className="text-xs sm:text-sm font-medium text-gray-700">{tip.tip}</span>
                        </div>
                      )) || []}
                    </div>

                    {/* Detailed Explanation Boxes */}
                    <div className="space-y-3 sm:space-y-4">
                      {aiResponse?.analysis?.skills?.tips?.map((tip, index) => (
                        <div key={index} className={`${
                          tip.type === 'good' ? 'bg-teal-50 border-teal-200' : 'bg-yellow-50 border-yellow-200'
                        } border rounded-lg p-3 sm:p-4`}>
                          <div className='flex gap-2'>
                            <div>
                              <img 
                                src={tip.type === 'good' ? "src/public/check.svg" : "src/public/warning.svg"} 
                                alt={tip.type === 'good' ? "Check" : "Warning"} 
                                className='w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0' 
                              />
                            </div>
                            <div>
                              <h5 className={`font-medium text-xs sm:text-sm mb-2 ${
                                tip.type === 'good' ? 'text-teal-800' : 'text-yellow-800'
                              }`}>{tip.tip}</h5>
                              <ul className={`text-xs sm:text-sm list-disc list-inside space-y-1 ${
                                tip.type === 'good' ? 'text-teal-700' : 'text-yellow-700'
                              }`}>
                                {tip.points?.map((point, pointIndex) => (
                                  <li key={pointIndex}>{point}</li>
                                )) || []}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )) || []}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeReview;