import React from 'react';

function Title({ title = 'no title', subtitle = 'no subtitle' }) {
  return (
    <div className="my-6">
      <h1 className="px-4 text-2xl font-bold text-brand-charcoal">{title}</h1>
      {subtitle && (
        <p
          className="px-4 text-sm text-gray-500 mt-1"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      )}
    </div>
  );
}
export default Title;
