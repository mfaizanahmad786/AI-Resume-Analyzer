
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAI,getGenerativeModel,GoogleAIBackend } from 'firebase/ai';


const firebaseConfig = {
  apiKey: "AIzaSyAGYxXtC4RghTgw9vftV04Far5zJJdYu50",
  authDomain: "resume-analyzer-43953.firebaseapp.com",
  projectId: "resume-analyzer-43953",
  storageBucket: "resume-analyzer-43953.firebasestorage.app",
  messagingSenderId: "500573787788",
  appId: "1:500573787788:web:17f74e55866b7da5864da9",
  measurementId: "G-XE6526075Z"
};


const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const ai = getAI(app,{backend: new GoogleAIBackend()})
export const model = getGenerativeModel(ai,{model:"gemini-2.5-flash"})


export default app