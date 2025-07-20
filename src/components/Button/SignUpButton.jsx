// src/components/SignUpButton.jsx
import React from 'react';

const SignUpButton = ({ onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`w-full bg-sage-accent text-white font-bold py-4 rounded-xl text-lg hover:bg-opacity-90 transition-colors shadow-md disabled:bg-gray-400 disabled:shadow-none ${
      disabled ? 'bg-[#9CA3AF]' : 'bg-[#6B8A7A]'
    }`}
  >
    회원가입하기
  </button>
);

export default SignUpButton;
