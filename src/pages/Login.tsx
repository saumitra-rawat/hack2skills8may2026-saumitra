import React, { useState } from 'react';
import { useAuth } from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login: React.FC = () => {
  const { loginWithGoogle, loginWithEmail, signupWithEmail } = useAuth();
  const navigate = useNavigate();
  const [isEmailView, setIsEmailView] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert("Failed to login with Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        await signupWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      navigate('/dashboard');
    } catch (error: any) {
      alert(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      padding: '20px'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card" 
        style={{ 
          width: '100%', 
          maxWidth: '440px', 
          textAlign: 'center',
          padding: '40px' 
        }}
        role="region"
        aria-labelledby="login-title"
      >
        <div style={{ marginBottom: '32px' }}>
          <div 
            style={{ 
              width: '64px', 
              height: '64px', 
              backgroundColor: 'var(--primary)', 
              borderRadius: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
            aria-hidden="true"
          >
            <LogIn color="white" size={32} />
          </div>
          <h1 id="login-title" style={{ fontSize: '28px', marginBottom: '8px' }}>Wanderlust AI</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Your intelligent travel companion</p>
        </div>

        <AnimatePresence mode="wait">
          {!isEmailView ? (
            <motion.div
              key="social"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              role="group"
              aria-label="Social Login Options"
            >
              <button 
                onClick={handleGoogleLogin}
                className="btn-primary"
                disabled={loading}
                aria-label="Sign in with Google"
                style={{ 
                  width: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '12px',
                  padding: '14px',
                  marginBottom: '16px'
                }}
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" width="18" aria-hidden="true" />
                Continue with Google
              </button>
              
              <button 
                onClick={() => setIsEmailView(true)}
                aria-label="Continue with email and password"
                style={{ 
                  width: '100%', 
                  background: 'none', 
                  border: '1px solid var(--border-color)', 
                  padding: '14px',
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  color: 'var(--text-primary)',
                  fontWeight: 500
                }}
              >
                <Mail size={18} aria-hidden="true" /> Continue with Email
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="email"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleEmailAuth}
              aria-label={isSignup ? "Create an account" : "Sign in with email"}
            >
              <div style={{ marginBottom: '16px', textAlign: 'left' }}>
                <label htmlFor="email-input" style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>
                  Email Address
                </label>
                <input 
                  id="email-input"
                  type="email" 
                  required 
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  aria-required="true"
                />
              </div>
              <div style={{ marginBottom: '24px', textAlign: 'left' }}>
                <label htmlFor="password-input" style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>
                  Password
                </label>
                <input 
                  id="password-input"
                  type="password" 
                  required 
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  aria-required="true"
                />
              </div>
              
              <button 
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{ width: '100%', padding: '14px', marginBottom: '16px' }}
                aria-busy={loading}
              >
                {loading ? "Processing..." : (isSignup ? "Create Account" : "Sign In")}
              </button>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '14px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {isSignup ? "Already have an account?" : "Don't have an account?"}
                </span>
                <button 
                  type="button"
                  onClick={() => setIsSignup(!isSignup)}
                  style={{ background: 'none', color: 'var(--primary)', fontWeight: 600, padding: 0 }}
                  aria-label={isSignup ? "Switch to Sign In" : "Switch to Sign Up"}
                >
                  {isSignup ? "Sign In" : "Sign Up"}
                </button>
              </div>

              <button 
                type="button"
                onClick={() => setIsEmailView(false)}
                style={{ marginTop: '16px', background: 'none', color: 'var(--text-secondary)', fontSize: '14px' }}
                aria-label="Back to social login options"
              >
                Back to social login
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <footer style={{ marginTop: '32px', fontSize: '12px', color: 'var(--text-secondary)' }}>
          By continuing, you agree to Wanderlust AI's <a href="#" style={{ color: 'var(--primary)' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--primary)' }}>Privacy Policy</a>.
        </footer>
      </motion.div>
    </main>
  );
};

export default Login;
