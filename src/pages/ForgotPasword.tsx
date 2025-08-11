import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { annotate } from "rough-notation";
import { useAuth } from "@/context/Context";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth()
  const ref = useRef(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous messages
    setError("");
    setMessage("");

    // Validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      if (auth?.resetPassword) {
        await auth.resetPassword(email);
        setMessage("Check your email for password reset instructions. If you don't see the email, check your spam folder.");
        setEmail(""); // Clear the email field
      } else {
        setError('Password reset function is not available.');
      }
    } catch (error: any) {
      console.log('Password reset error:', error);
      
      // Handle specific Firebase error codes
      let errorMessage = 'Failed to send reset email. Please try again.';
      
      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email address. Please check your email or sign up for a new account.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address. Please enter a valid email.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many password reset requests. Please wait a few minutes before trying again.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your internet connection and try again.';
            break;
          default:
            errorMessage = error.message || 'Failed to send reset email. Please try again.';
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ref.current) {
      const annotation = annotate(ref.current, {
        type: "underline",
        color: '#8E24AA',
        padding: 5,
        multiline: true,
      });
      annotation.show();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat bg-fixed" 
         style={{ backgroundImage: "url('/src/assets/public/images/bg-small.svg')" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8" ref={ref}>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Reset Your <span className="text-primary">Password</span>
          </h1>
          <p className="text-muted-foreground">
            Enter your email to receive reset instructions
          </p>
        </div>

        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-lg">
          {/* Success Message */}
          {message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">{message}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                className=""
              />
              <p className="text-xs text-muted-foreground">
                We'll send password reset instructions to this email
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending Reset Email...
                </>
              ) : (
                "Send Reset Email"
              )}
            </Button>
          </form>

          <div className="text-center mt-6 space-y-2">
            <p className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Back to Login
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;