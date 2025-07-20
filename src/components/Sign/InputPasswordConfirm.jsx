// src/components/InputPasswordConfirm.jsx
import React from 'react';

const InputPasswordConfirm = ({ value, onChange, isMatch, showFeedback }) => (
  <div>
    <label
      htmlFor="password-confirm"
      className="text-sm font-semibold text-gray-600"
    >
      비밀번호 확인
    </label>
    <input
      type="password"
      id="password-confirm"
      placeholder="비밀번호를 다시 한번 입력하세요"
      className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-accent"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
    <p
      className={`text-xs mt-1 h-4 ${showFeedback ? (isMatch ? 'text-green-500' : 'text-red-500') : ''}`}
    >
      {showFeedback
        ? isMatch
          ? '비밀번호가 일치합니다.'
          : '비밀번호가 일치하지 않습니다.'
        : ''}
    </p>
  </div>
);

export default InputPasswordConfirm;
