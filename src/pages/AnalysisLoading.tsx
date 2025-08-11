import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AIAnalysisService } from '@/utils/aiAnalysisService';
import { useAnalysis } from '@/context/AnalysisContext';

const AnalysisLoading = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setAnalysisData } = useAnalysis();

  const steps = [
    "Uploading resume...",
    "Analyzing document structure...", 
    "Processing content with AI...",
    "Generating feedback...",
    "Analysis complete, redirecting..."
  ];

  useEffect(() => {
    // Check if we should be on this page (coming from upload)
    const uploadInProgress = sessionStorage.getItem('uploadInProgress');
    const pendingAnalysisData = sessionStorage.getItem('pendingAnalysis');
    
    if (!uploadInProgress || !pendingAnalysisData) {
      navigate('/upload');
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let analysisStarted = false;

    const performAIAnalysis = async () => {
      try {
        // Get stored data
        const formData = JSON.parse(pendingAnalysisData);
        const pdfBase64 = sessionStorage.getItem('uploadedPDF');
        
        if (!pdfBase64) {
          throw new Error('PDF data not found');
        }

        // Convert base64 back to File object
        const base64Data = pdfBase64.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const pdfFile = new File([byteArray], formData.fileName, { type: 'application/pdf' });

        // Perform AI analysis
        const analysisResult = await AIAnalysisService.analyzeResume({
          pdfFile: pdfFile,
          jobDescription: formData.jobDescription || '',
          companyName: formData.companyName,
          jobTitle: formData.jobTitle
        });

        // Create analysis data object
        const analysisData = {
          companyName: formData.companyName,
          jobTitle: formData.jobTitle,
          jobDescription: formData.jobDescription || '',
          fileName: formData.fileName,
          analysis: analysisResult,
          pdfData: pdfBase64,
          timestamp: formData.timestamp
        };

        // Store in context
        setAnalysisData(analysisData);

        console.log('AI Analysis completed successfully');
        
        // Continue with the final steps
        setCurrentStep(4); // Analysis complete step
        
        setTimeout(() => {
          // Clean up and redirect
          sessionStorage.removeItem('uploadInProgress');
          sessionStorage.removeItem('pendingAnalysis');
          navigate('/resumereview');
        }, 1500);

      } catch (error: any) {
        console.error('AI Analysis Error:', error);
        setError(error.message || 'Failed to analyze resume. Please try again.');
        
        // Allow user to go back to upload page
        setTimeout(() => {
          sessionStorage.removeItem('uploadInProgress');
          sessionStorage.removeItem('pendingAnalysis');
          navigate('/upload');
        }, 3000);
      }
    };

    const progressThroughSteps = (stepIndex: number) => {
      if (stepIndex < 2) {
        // Visual steps before AI analysis
        setCurrentStep(stepIndex);
        timeoutId = setTimeout(() => {
          progressThroughSteps(stepIndex + 1);
        }, 2000);
      } else if (stepIndex === 2 && !analysisStarted) {
        // Start AI analysis at step 2
        analysisStarted = true;
        setCurrentStep(2);
        performAIAnalysis();
      }
    };

    // Start the progression
    progressThroughSteps(0);

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [navigate, setAnalysisData]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis Failed</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <p className="text-sm text-gray-500">Redirecting to upload page...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 flex flex-col">
      {/* Header */}
      <header className="w-full pt-6 sm:pt-8 lg:pt-10 px-4 sm:px-6">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">RESUMIND</h1>
          <button className="bg-violet-500 hover:bg-violet-600 text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors">
            Upload Resume
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-20">
        <div className="text-center max-w-2xl mx-auto">
          {/* Main Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-8 leading-tight">
            Smart feedback for your dream job
          </h2>

          {/* Status Text */}
          <p className="text-lg sm:text-xl text-gray-600">
            {steps[currentStep]}
          </p>

          {/* Resume Illustration */}
          <div className="flex justify-center mb-8">
            <img 
              src="/src/assets/public/images/resume-scan.gif" 
              alt="Resume scanning animation" 
              className="w-full max-w-lg h-auto rounded-lg "
            />
          </div>

          <p className='text-gray-600'>This may take 20 to 30 seconds, donot refresh the page</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisLoading;
