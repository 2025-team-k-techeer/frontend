// ProfileInfo.jsx
import React from 'react';
import EditIcon from '../assets/Icon/Edit.svg?react';

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
          <EditIcon className="h-4 w-4 text-brand-charcoal" />
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
