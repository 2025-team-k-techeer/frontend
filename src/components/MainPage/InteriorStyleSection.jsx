import React from 'react';
import StyleCard from '/src/components/MainPage/StyleCard'; // StyleCard 컴포넌트를 import 합니다.

const InteriorStyleSection = ({ styles }) => {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold font-laundry text-brand-charcoal">
          인테리어 스타일
        </h3>
      </div>
      <div className="flex space-x-4 overflow-x-auto -mx-4 px-4">
        {styles.map((style, index) => (
          <StyleCard
            key={index}
            imageUrl={style.image_url}
            title={style.name}
            description={style.description}
          />
        ))}
      </div>
    </section>
  );
};

export default InteriorStyleSection;
