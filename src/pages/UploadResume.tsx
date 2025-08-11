import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UploadResume = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    jobDescription: '',
    pdfFile: null as File | null
  });

  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        pdfFile: file
      }));
    } else {
      alert('Please upload a valid PDF file');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pdfFile || !formData.companyName || !formData.jobTitle) {
      alert('Please fill all required fields and upload a PDF');
      return;
    }

    setIsUploading(true);
    
    try {
      // Convert PDF to base64 for storage
      const reader = new FileReader();
      reader.onload = () => {
        const pdfBase64 = reader.result as string;
        
        // Store in sessionStorage
        sessionStorage.setItem('uploadedPDF', pdfBase64);
        sessionStorage.setItem('pdfFileName', formData.pdfFile!.name);
        sessionStorage.setItem('companyName', formData.companyName);
        sessionStorage.setItem('jobTitle', formData.jobTitle);
        sessionStorage.setItem('jobDescription', formData.jobDescription);
        
        // Navigate to review page
        navigate('/resumereview');
      };
      
      reader.onerror = () => {
        throw new Error('Failed to read PDF file');
      };
      
      reader.readAsDataURL(formData.pdfFile);
      
    } catch (error) {
      console.error('Error processing PDF:', error);
      alert('Failed to process PDF file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-main" style={{ backgroundImage: "url('/src/assets/public/images/bg-main.svg')" }}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            className="text-gray-700 hover:text-gray-900 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            RESUMIND
          </h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Smart <span className="text-violet-600">feedback</span>
              <br />
              for your <span className="text-primary">dream job</span>
            </h2>
            <p className="text-lg text-gray-600">
              Drop your resume for an ATS score and improvement tips.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                Company Name
              </Label>
              <Input
                id="company"
                type="text"
                placeholder="JavaScript Mastery"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full bg-white"
                required
              />
            </div>

            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
                Job Title
              </Label>
              <Input
                id="jobTitle"
                type="text"
                placeholder="Frontend Developer"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                className="w-full bg-white"
                required
              />
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <Label htmlFor="jobDescription" className="text-sm font-medium text-gray-700">
                Job Description
              </Label>
              <Textarea
                id="jobDescription"
                placeholder="Write a clear & concise job description with responsibilities & expectations..."
                value={formData.jobDescription}
                onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                className="w-full min-h-32 resize-none bg-white"
              />
            </div>

            {/* Upload Resume */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Upload Resume
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <img 
                    src="/src/assets/public/images/pdf.png" 
                    alt="Upload resume" 
                    className="w-12 h-12 mx-auto mb-4 object-contain"
                  />
                  {formData.pdfFile ? (
                    <div>
                      <p className="text-green-600 font-medium mb-2">
                        ✓ {formData.pdfFile.name}
                      </p>
                      <p className="text-sm text-gray-500">Click to change file</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium text-primary cursor-pointer hover:underline">
                          Click to upload
                        </span> or drag and drop
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF only (max. 10MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full py-4 text-lg font-medium"
              size="lg"
              disabled={!formData.pdfFile || !formData.companyName || !formData.jobTitle || isUploading}
            >
              {isUploading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </div>
              ) : (
                'Save & Analyze Resume'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;