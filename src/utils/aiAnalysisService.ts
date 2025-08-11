import { model } from '../utils/firebaseConfig';
import type { Feedback } from '../types';

export interface AnalysisRequest {
  pdfFile: File;
  jobDescription: string;
  companyName: string;
  jobTitle: string;
}

export class AIAnalysisService {
  static async analyzeResume(request: AnalysisRequest): Promise<Feedback> {
    try {
      // Convert PDF file to base64 for Gemini
      const base64Data = await this.fileToBase64(request.pdfFile);
      
      const prompt = this.createAnalysisPrompt(request);
      
      // Use Gemini with PDF file
      const response = await model.generateContent([
        prompt,
        {
          inlineData: {
            mimeType: 'application/pdf',
            data: base64Data
          }
        }
      ]);

      // Parse the response
      const analysisResult = this.parseAIResponse(response.response.text());
      return analysisResult;
      
    } catch (error) {
      console.error('AI Analysis Error:', error);
      throw new Error('Failed to analyze resume. Please try again.');
    }
  }

  private static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data URL prefix (data:application/pdf;base64,)
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  private static createAnalysisPrompt(request: AnalysisRequest): string {
    return `
You are an expert resume analyst and ATS specialist. Please analyze the attached PDF resume against the provided job description and give detailed, actionable feedback.

**Company:** ${request.companyName}
**Job Title:** ${request.jobTitle}

**Job Description:**
${request.jobDescription}

Please carefully read and analyze the attached PDF resume document. Extract all relevant information including:
- Personal information and contact details
- Education background
- Work experience and projects
- Technical skills and certifications
- Overall formatting and structure

Provide comprehensive feedback in the following JSON format:

{
  "overallScore": [number between 0-100],
  "ATS": {
    "score": [number between 0-100],
    "tips": [
      {
        "type": "good" | "improve",
        "tip": "[specific tip title]",
        "points": ["detailed point 1", "detailed point 2", "detailed point 3"]
      }
    ]
  },
  "toneAndStyle": {
    "score": [number between 0-100],
    "tips": [
      {
        "type": "good" | "improve",
        "tip": "[specific tip title]",
        "points": ["detailed point 1", "detailed point 2", "detailed point 3"]
      }
    ]
  },
  "content": {
    "score": [number between 0-100],
    "tips": [
      {
        "type": "good" | "improve",
        "tip": "[specific tip title]",
        "points": ["detailed point 1", "detailed point 2", "detailed point 3"]
      }
    ]
  },
  "structure": {
    "score": [number between 0-100],
    "tips": [
      {
        "type": "good" | "improve",
        "tip": "[specific tip title]",
        "points": ["detailed point 1", "detailed point 2", "detailed point 3"]
      }
    ]
  },
  "skills": {
    "score": [number between 0-100],
    "tips": [
      {
        "type": "good" | "improve",
        "tip": "[specific tip title]",
        "points": ["detailed point 1", "detailed point 2", "detailed point 3"]
      }
    ]
  }
}

**Detailed Analysis Guidelines:**

1. **ATS Score (0-100)**: 
   - Keyword matching with job description
   - Resume formatting compatibility with ATS systems
   - Proper section headers and organization
   - File format and readability

2. **Tone & Style (0-100)**:
   - Professional language and consistency
   - Use of action verbs and quantifiable achievements
   - Writing clarity and conciseness
   - Overall professionalism

3. **Content (0-100)**:
   - Relevance to the specific job requirements
   - Quality and depth of experience descriptions
   - Education and certification alignment
   - Project relevance and impact

4. **Structure (0-100)**:
   - Logical flow and organization
   - Visual hierarchy and readability
   - Consistent formatting
   - Appropriate section ordering

5. **Skills (0-100)**:
   - Technical skills alignment with job requirements
   - Missing critical skills from job description
   - Skills demonstration through projects/experience
   - Skill categorization and presentation

**Important Instructions:**
- Provide at least 2-4 specific, actionable tips per section
- Include both "good" (what's working well) and "improve" (what needs work) feedback
- Be specific about what to change and why
- Reference specific elements from both the resume and job description
- Focus on practical improvements that will increase interview chances

Return ONLY the JSON response with no additional formatting, markdown, or explanatory text.
`;
  }

  private static parseAIResponse(responseText: string): Feedback {
    try {
      // Clean the response text - remove any markdown formatting or extra text
      const cleanedText = responseText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .replace(/^[^{]*/, '') // Remove anything before the first {
        .replace(/[^}]*$/, '') // Remove anything after the last }
        .trim();

      const parsed = JSON.parse(cleanedText);
      
      // Validate the structure
      if (!this.isValidFeedback(parsed)) {
        console.warn('Invalid feedback structure, using fallback');
        return this.getFallbackResponse();
      }

      return parsed as Feedback;
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      console.log('Raw response:', responseText);
      
      // Return a fallback response
      return this.getFallbackResponse();
    }
  }

  private static isValidFeedback(obj: any): boolean {
    const requiredSections = ['ATS', 'toneAndStyle', 'content', 'structure', 'skills'];
    
    if (!obj.overallScore || typeof obj.overallScore !== 'number') {
      console.log('Missing or invalid overallScore');
      return false;
    }
    
    for (const section of requiredSections) {
      if (!obj[section] || typeof obj[section].score !== 'number' || !Array.isArray(obj[section].tips)) {
        console.log(`Missing or invalid section: ${section}`);
        return false;
      }
      
      // Validate tips structure
      for (const tip of obj[section].tips) {
        if (!tip.type || !tip.tip || !Array.isArray(tip.points)) {
          console.log(`Invalid tip structure in section: ${section}`);
          return false;
        }
      }
    }
    
    return true;
  }

  private static getFallbackResponse(): Feedback {
    return {
      overallScore: 70,
      ATS: {
        score: 70,
        tips: [{
          type: "improve",
          tip: "Analysis Processing Error",
          points: [
            "There was an issue processing your resume analysis.",
            "Please ensure your PDF is readable and try again.",
            "If the problem persists, try uploading a different format or contact support."
          ]
        }]
      },
      toneAndStyle: {
        score: 70,
        tips: [{
          type: "improve",
          tip: "Unable to Analyze Tone",
          points: [
            "Could not complete tone and style analysis.",
            "Please try uploading your resume again.",
            "Ensure the PDF contains readable text content."
          ]
        }]
      },
      content: {
        score: 70,
        tips: [{
          type: "improve",
          tip: "Content Analysis Error",
          points: [
            "Unable to analyze resume content fully.",
            "Please verify your PDF is not password protected.",
            "Try re-uploading with a cleaner PDF format."
          ]
        }]
      },
      structure: {
        score: 70,
        tips: [{
          type: "improve",
          tip: "Structure Analysis Incomplete",
          points: [
            "Could not complete structure analysis.",
            "Ensure your resume has clear section headings.",
            "Try uploading again or use a different PDF."
          ]
        }]
      },
      skills: {
        score: 70,
        tips: [{
          type: "improve",
          tip: "Skills Analysis Error",
          points: [
            "Unable to analyze skills section completely.",
            "Please ensure your skills are clearly listed in the resume.",
            "Try re-uploading or contact support if issues persist."
          ]
        }]
      }
    };
  }
}