import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      alert("Failed to login. Check console for details.");
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card" 
        style={{ 
          width: '100%', 
          maxWidth: '400px', 
          textAlign: 'center',
          padding: '48px' 
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            backgroundColor: 'var(--primary)', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <LogIn color="white" size={32} />
          </div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Wanderlust AI</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Plan your next adventure with AI</p>
        </div>

        <button 
          onClick={handleLogin}
          className="btn-primary"
          style={{ 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px',
            padding: '12px'
          }}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" />
          Sign in with Google
        </button>

        <p style={{ marginTop: '24px', fontSize: '12px', color: 'var(--text-secondary)' }}>
          By signing in, you agree to our terms and conditions.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
