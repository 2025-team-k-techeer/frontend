// ProfileInfo.jsx
import React from 'react';

function ProfileInfo() {
  return (
    <section className="flex items-center gap-5 p-5 bg-sage-bg rounded-2xl mb-8">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop"
          className="w-20 h-20 rounded-full object-cover border-2 border-white"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/80x80/cccccc/ffffff?text=User';
          }}
          alt="Profile"
        />
        <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-brand-charcoal"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold text-brand-charcoal">Gemini</h2>
        <p className="text-sm text-gray-600">gemini.user@email.com</p>
      </div>
    </section>
  );
}

export default ProfileInfo;
