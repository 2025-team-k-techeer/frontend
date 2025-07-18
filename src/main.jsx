import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
//import { AuthProvider } from './contexts/AuthProvider.jsx';
//import { TodoProvider } from './contexts/TodoProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
