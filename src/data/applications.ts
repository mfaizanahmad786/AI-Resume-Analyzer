import type { Feedback } from "@/types";

export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/src/assets/public/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/src/assets/public/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/src/assets/public/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "4",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/src/assets/public/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "5",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/src/assets/public/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "6",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/src/assets/public/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];

export const response: Feedback = {
  overallScore: 75,
  ATS: {
    score: 70,
    tips: [
      {
        type: "good" as const,
        tip: "Keyword Alignment",
        points: [
          "The resume effectively uses keywords such as 'React', 'Node.js', 'MongoDB', 'Express.js', 'PostgreSQL', and 'JWT'",
          "These keywords are directly present in the job description",
          "This increases the chances of the resume being parsed correctly by an ATS"
        ]
      },
      {
        type: "good" as const,
        tip: "Clear Project Descriptions",
        points: [
          "The project descriptions are clear and list the technologies used",
          "This helps ATS in identifying relevant skills and experience for a full-stack role",
          "Projects demonstrate practical application of mentioned technologies"
        ]
      },
      {
        type: "improve" as const,
        tip: "Missing TypeScript/Next.js",
        points: [
          "The job description explicitly mentions 'TypeScript' and 'Next.js' as preferred skills",
          "While the resume lists JavaScript, it does not mention TypeScript",
          "Next.js is not listed, which could be a missed opportunity to align with the role's preferences"
        ]
      },
      {
        type: "improve" as const,
        tip: "Quantifiable Achievements",
        points: [
          "While some achievements are quantified (e.g., '40%', '60%', '80%'), more specific metrics would be beneficial",
          "The ATS may benefit from more quantifiable results tied to business impact or scale",
          "Consider specifying the number of users or transactions handled in your projects"
        ]
      }
    ]
  },
  toneAndStyle: {
    score: 80,
    tips: [
      {
        type: "good" as const,
        tip: "Professional Tone",
        points: [
          "The resume maintains a professional and objective tone throughout",
          "Uses action verbs and clear language to describe responsibilities and achievements",
          "Demonstrates strong communication skills through writing style"
        ]
      },
      {
        type: "good" as const,
        tip: "Concise Bullet Points",
        points: [
          "The use of bullet points makes the resume easy to read and digest",
          "Allows recruiters to quickly scan through the candidate's experience and accomplishments",
          "Information is presented in an organized, scannable format"
        ]
      },
      {
        type: "improve" as const,
        tip: "Action-Oriented Language",
        points: [
          "Some bullet points could be more impactful by starting with stronger action verbs",
          "Focus more on the outcome rather than just the action",
          "Example: Instead of 'Developed a productivity platform...', consider 'Engineered a productivity platform...' or 'Launched a productivity platform...'"
        ]
      },
      {
        type: "improve" as const,
        tip: "Consistency in Formatting",
        points: [
          "The overall formatting is good, but slight inconsistencies exist",
          "Some spacing or line breaks between sections or bullet points can detract from professionalism",
          "A final review for consistent spacing and alignment would be beneficial"
        ]
      }
    ]
  },
  content: {
    score: 60,
    tips: [
      {
        type: "good" as const,
        tip: "Relevant Project Experience",
        points: [
          "The projects listed (Itwaar Bazaar, CineFlex, TaskMate, UniDesk) showcase a range of full-stack development activities",
          "Projects align well with the job description's requirement for experience across the entire application lifecycle",
          "Demonstrates practical application of various technologies and frameworks"
        ]
      },
      {
        type: "good" as const,
        tip: "Technical Skills Summary",
        points: [
          "The 'TECHNICAL SKILLS' section clearly categorizes languages, frameworks, developer tools, and libraries",
          "Provides a quick overview of technical proficiencies",
          "Well-organized presentation of technical capabilities"
        ]
      },
      {
        type: "improve" as const,
        tip: "Bridging Experience Gaps",
        points: [
          "The job description asks for 1-2 years of real-world experience",
          "The resume lists an education period of 'Sep. 2023 - Sep 2027', which indicates the candidate is still pursuing their degree",
          "While personal projects are valuable, it's crucial to frame them to strongly imply practical, applied experience",
          "Consider adding a summary statement about applied learning or internships if any"
        ]
      },
      {
        type: "improve" as const,
        tip: "Highlighting Full-Stack Capabilities Explicitly",
        points: [
          "While the projects demonstrate full-stack work, explicitly stating 'Full-Stack Development' as a primary skill would reinforce this",
          "The job description strongly emphasizes this aspect, so it should be made very clear",
          "Consider adding this to a summary section or skills highlights"
        ]
      },
      {
        type: "improve" as const,
        tip: "Cloud and Deployment Experience",
        points: [
          "The job description mentions 'Manage deployments and hosting environments on AWS, Vercel and others'",
          "While Git and VS Code are listed under Developer Tools, there's no explicit mention of cloud platforms or deployment experience",
          "Adding this, even if it's through personal projects or learning, would be highly beneficial"
        ]
      }
    ]
  },
  structure: {
    score: 85,
    tips: [
      {
        type: "good" as const,
        tip: "Logical Flow",
        points: [
          "The resume follows a standard and logical structure: Contact Information, Education, Projects, Technical Skills, and Certifications",
          "This makes it easy for recruiters to navigate",
          "Information is organized in a predictable, professional manner"
        ]
      },
      {
        type: "good" as const,
        tip: "Clear Headings",
        points: [
          "Each section is clearly labeled with bold headings",
          "This improves readability and organization",
          "Easy to scan and find specific information quickly"
        ]
      },
      {
        type: "improve" as const,
        tip: "Consider a Summary/Objective",
        points: [
          "For a junior role, a brief summary or objective statement at the top could be beneficial",
          "This would allow the candidate to immediately highlight their enthusiasm for a full-stack role",
          "Could address the '1-2 years of experience' aspect and key strengths relevant to Lumunate's requirements"
        ]
      },
      {
        type: "improve" as const,
        tip: "Chronological Order for Projects",
        points: [
          "While the current order is fine, presenting projects in reverse chronological order (most recent first) is a common convention",
          "This can highlight the most relevant and recent experience",
          "Shows progression and current skill level more effectively"
        ]
      }
    ]
  },
  skills: {
    score: 65,
    tips: [
      {
        type: "good" as const,
        tip: "Broad Technical Stack",
        points: [
          "The resume demonstrates a good breadth of skills across languages, frameworks, and tools",
          "Covers many aspects of full-stack development as required by the job description",
          "Shows versatility and adaptability across different technologies"
        ]
      },
      {
        type: "good" as const,
        tip: "Project-Based Skill Demonstration",
        points: [
          "Skills are effectively demonstrated through the detailed descriptions of projects",
          "Shows how they were applied in practical scenarios",
          "Provides context for technical abilities rather than just listing them"
        ]
      },
      {
        type: "improve" as const,
        tip: "Missing Core Technologies from JD",
        points: [
          "The job description specifically calls out 'TypeScript' and 'Next.js'",
          "These are critical preferred skills and should be added to the 'Frameworks' or a dedicated 'Frontend' section",
          "If not experienced, acquiring basic familiarity with these could significantly boost the application"
        ]
      },
      {
        type: "improve" as const,
        tip: "Incorporate Cloud/DevOps Skills",
        points: [
          "The job description emphasizes 'basic DevOps' and cloud services (AWS, Vercel)",
          "The resume currently lacks any mention of these technologies",
          "If the candidate has any exposure, even through personal projects (e.g., deploying an app on Vercel or Heroku), this should be explicitly stated",
          "Consider adding these to the 'Developer Tools' or a new 'DevOps' section"
        ]
      },
      {
        type: "improve" as const,
        tip: "Clarify SQL Dialect",
        points: [
          "While 'SQL (Postgres)' is listed, the job description mentions 'MongoDB, MySQL or PostgreSQL'",
          "It would be stronger to list 'PostgreSQL' specifically if that is the primary SQL experience",
          "Potentially add 'MySQL' if applicable to better match job requirements"
        ]
      }
    ]
  }
}

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";
          tip: string; //give 3-4 tips
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
    }`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
  AIResponseFormat,
}: {
  jobTitle: string;
  jobDescription: string;
  AIResponseFormat: string;
}) =>
  `You are an expert in ATS (Applicant Tracking System) and resume analysis.
  Please analyze and rate this resume and suggest how to improve it.
  The rating can be low if the resume is bad.
  Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
  If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
  If available, use the job description for the job user is applying to to give more detailed feedback.
  If provided, take the job description into consideration.
  The job title is: ${jobTitle}
  The job description is: ${jobDescription}
  Provide the feedback using the following format: ${AIResponseFormat}
  Return the analysis as a JSON object, without any other text and without the backticks.
  Do not include any other text or comments.`;