import React from 'react';
import { useNavigate } from 'react-router-dom';

function ResultHeader() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <button
      onClick={handleBack}
      className="bg-black/30 text-white rounded-full p-2 hover:bg-black/50 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

export default ResultHeader;
