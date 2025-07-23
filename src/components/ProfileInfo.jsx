// ProfileInfo.jsx
import React from 'react';
import EditIcon from '../assets/Icon/Edit.svg?react';

// props로 user 객체를 받음
function ProfileInfo({ user }) {
  // user 데이터가 없으면 렌더링하지 않거나 로딩 상태 표시
  if (!user) return null;
  return (
    <section className="flex items-center gap-5 p-5 bg-sage-bg rounded-2xl mb-8">
      <div className="relative">
        <img
          // API에서 받은 프로필 이미지 URL 사용
          src={user.profile_image_url}
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
        {/* API에서 받은 사용자 이름과 이메일 사용 */}
        <h2 className="text-xl font-bold text-brand-charcoal">{user.name}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
    </section>
  );
}

export default ProfileInfo;
