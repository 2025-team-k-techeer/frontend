import React from 'react';
import ArrowCycleIcon from '../../assets/Icon/ArrowCycle.jsx';

function RegenerateButton({ onRegenerate, isLoading = false }) {
  return (
    <button
      onClick={onRegenerate}
      disabled={isLoading}
      className="bg-black/30 text-white rounded-full p-2 hover:bg-black/50 transition-colors disabled:opacity-50"
    >
      <ArrowCycleIcon className="w-7 h-7" color="white" />
    </button>
  );
}

export default RegenerateButton;
