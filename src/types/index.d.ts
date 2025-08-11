import type { User } from "firebase/auth";

interface Job {
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
}

interface Resume {
  id: string;
  companyName: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: Feedback;
  userId?: string
  createdAt?: Date
  updatedAt?: Date
}

interface Feedback {
  overallScore: number;
  ATS: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      points: string[];
    }[];
  };
  toneAndStyle: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      points: string[];
    }[];
  };
  content: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      points: string[];
    }[];
  };
  structure: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      points: string[];
    }[];
  };
  skills: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      points: string[];
    }[];
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean,
  login: (email:string,password:string) => Promise<void>;
  signup: (email:string,password:string,displayName?:string) => Promise<void>
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>
}

interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  lastLoginAt: Date;
  analysisCount: number;
}