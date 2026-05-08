import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const REQUIRED_ENV = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_GOOGLE_MAPS_API_KEY'
];

REQUIRED_ENV.forEach(key => {
  if (!import.meta.env[key]) {
    console.warn(`Missing environment variable: ${key}`);
  }
});

console.log('Wanderlust AI Initializing...');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
