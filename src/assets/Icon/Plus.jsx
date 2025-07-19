import React from 'react';

function PlusIcon({ className }) {
  return (
    <div>
      <svg
        className={className}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.6112 21.3889H8.33325V18.6114H18.6112V8.3335H21.3887V18.6114H31.6666V21.3889H21.3887V31.6668H18.6112V21.3889Z"
          fill="currentColor"
          strokeWidth="2" // 👈 JSX에서는 stroke-width 대신 strokeWidth 사용 (이 경우는 문자열이라 그대로도 동작)
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default PlusIcon;
