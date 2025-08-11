import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/Context'


const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
    const auth = useAuth();
    const user = auth?.user;
    const loading = auth?.loading;

    if(loading){
        return(
            <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
        )
    }

    return user ? <>{children}</> : <Navigate to="/login" replace/>
}

export default ProtectedRoute