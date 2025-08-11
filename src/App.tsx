import { Button } from "@/components/ui/button"
import Index from "./pages/Index"
import UploadResume from "./pages/UploadResume"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ResumeReview from "./pages/ResumeReview"
import { response } from "./data/applications"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthProvider from "./context/Context"
import ProtectedRoute from "./components/ProtectedRoute"
import ForgotPassword from "./pages/ForgotPasword"


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/upload" element={<UploadResume />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/resumereview" element={
            <ProtectedRoute>
            <ResumeReview response={response} />
            </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App