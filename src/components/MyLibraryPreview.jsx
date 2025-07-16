// MyLibraryPreview.jsx
import React from 'react';

function MyLibraryPreview() {
  const imageOnError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/200x200/cccccc/ffffff?text=Image';
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-brand-charcoal">내 라이브러리</h3>
        <a
          href="./library.html"
          className="text-sm font-medium text-sage-accent hover:underline"
        >
          더보기 &gt;
        </a>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        <img
          src="https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1932&auto=format&fit=crop"
          className="w-full aspect-square object-cover rounded-lg"
          onError={imageOnError}
          alt="Library Item 1"
        />
        <img
          src="https://images.unsplash.com/photo-1567688993206-439ce1124f13?q=80&w=2070&auto=format&fit=crop"
          className="w-full aspect-square object-cover rounded-lg"
          onError={imageOnError}
          alt="Library Item 2"
        />
        <img
          src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2127&auto=format&fit=crop"
          className="w-full aspect-square object-cover rounded-lg"
          onError={imageOnError}
          alt="Library Item 3"
        />
        <img
          src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2080&auto=format&fit=crop"
          className="w-full aspect-square object-cover rounded-lg"
          onError={imageOnError}
          alt="Library Item 4"
        />
        <img
          src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1974&auto=format&fit=crop"
          className="w-full aspect-square object-cover rounded-lg"
          onError={imageOnError}
          alt="Library Item 5"
        />
        <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 font-bold">+3</span>
        </div>
      </div>
    </section>
  );
}

export default MyLibraryPreview;
