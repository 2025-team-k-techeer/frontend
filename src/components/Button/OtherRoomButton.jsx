import React from 'react';
import { useNavigate } from 'react-router-dom';

function OtherRoomButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/upload');
  };

  return (
    <button
      onClick={handleClick}
      className="w-full h-full bg-sage-accent text-white font-bold py-3 rounded-xl hover:bg-sage-accent/90 transition-colors"
    >
      다른 방 꾸미기
    </button>
  );
}

export default OtherRoomButton;
