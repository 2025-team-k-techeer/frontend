import React, { useEffect } from 'react';

function ToastMessage({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-brand-charcoal text-white text-sm font-semibold py-2 px-4 rounded-full opacity-100 transform translate-y-0 z-40 transition-all duration-300">
      {message} ✨
    </div>
  );
}

export default ToastMessage;
