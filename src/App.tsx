import Index from "./pages/Index"
import UploadResume from "./pages/UploadResume"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ResumeReview from "./pages/ResumeReview"
import AnalysisLoading from "./pages/AnalysisLoading"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthProvider from "./context/Context"
import ProtectedRoute from "./components/ProtectedRoute"
import ForgotPassword from "./pages/ForgotPasword"
import { AnalysisProvider } from "./context/AnalysisContext"


function App() {
  return (
    <AuthProvider>
      <AnalysisProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/upload" element={<UploadResume />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/analysis-loading" element={
              
                <AnalysisLoading />
              
            } />
            <Route path="/resumereview" element={
              <ProtectedRoute>
                <ResumeReview />
              </ProtectedRoute>
            } />

          </Routes>
        </BrowserRouter>
      </AnalysisProvider>
    </AuthProvider>
  )
}

export default App