// src/components/InputNickname.jsx
import React from 'react';

const InputNickname = ({ value, onChange }) => (
  <div>
    <label htmlFor="nickname" className="text-sm font-semibold text-gray-600">
      닉네임
    </label>
    <input
      type="text"
      id="nickname"
      placeholder="사용하실 닉네임을 입력하세요"
      className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-accent"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  </div>
);

export default InputNickname;
