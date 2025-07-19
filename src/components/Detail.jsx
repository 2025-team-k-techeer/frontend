import React from 'react';

export default function Detail({ value, onChange }) {
  return (
    <textarea
      className="w-full h-48 p-4 border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent transition"
      placeholder=" 6인용 원목 식탁을 창문 아래에 배치해주세요."
      value={value}
      onChange={onChange}
    />
  );
}
