// MyLibraryPreview.jsx
import React from 'react';

// props로 interiors 배열을 받음
function MyLibraryPreview({ interiors }) {
  function imageOnError(e) {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/200x200/cccccc/ffffff?text=Image';
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-brand-charcoal">내 라이브러리</h3>
        <a
          href="./library"
          className="text-sm font-medium text-sage-accent hover:underline"
        >
          더보기 &gt;
        </a>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {/* interiors 배열을 map으로 순회하며 이미지 렌더링 */}
        {interiors.map((item) => (
          <img
            key={item._id} // 각 요소는 고유한 key가 필요
            src={item.generated_image_url}
            className="w-full aspect-square object-cover rounded-lg"
            onError={imageOnError}
            alt={`인테리어 이미지 ${item._id}`}
          />
        ))}
        <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 font-bold">+3</span>
        </div>
      </div>
    </section>
  );
}

export default MyLibraryPreview;
