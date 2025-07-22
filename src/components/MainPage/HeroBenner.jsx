import React from 'react';

function HeroBanner() {
  return (
    <section className="relative rounded-2xl overflow-hidden shadow-lg aspect-video">
      <img
        src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
        alt="메인 배너"
        className="w-full h-auto object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-5 text-white font-laundry">
        <h2 className="text-2xl md:text-3xl font-bold mb-1">
          AI로 완성하는
          <br />
          나만의 인테리어
        </h2>
        <p className="text-sm font-light">
          한 번의 클릭으로 새로운 공간을 경험해보세요
        </p>
      </div>
    </section>
  );
}

export default HeroBanner;
