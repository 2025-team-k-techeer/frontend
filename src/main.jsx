import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { useAuthStore } from './store/useAuthStore';

useAuthStore.getState().initialize(); //로컬스토리지에 저장된 사용자 정보 초기화

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
