function ExamplePhotos() {
  return (
    <div className="mt-6">
      <h2 className="text-base font-bold text-brand-charcoal mb-2">
        예시 사진
      </h2>
      <div className="flex gap-4">
        <img
          src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop"
          alt="잘 찍은 방 사진 예시 1"
          className="w-1/2 h-24 object-cover rounded-lg shadow-sm"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://placehold.co/400x200/cccccc/ffffff?text=Example+1';
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop"
          alt="잘 찍은 방 사진 예시 2"
          className="w-1/2 h-24 object-cover rounded-lg shadow-sm"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://placehold.co/400x200/cccccc/ffffff?text=Example+2';
          }}
        />
      </div>
      <div className="mt-6">
        <h2 className="text-base font-bold text-brand-charcoal mb-3">
          AI 인식을 위한 촬영 Tip
        </h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <span className="bg-sage-accent text-white rounded-full w-5 h-5 flex items-center justify-center font-bold mr-2">
              1
            </span>
            <p className="text-gray-600">
              전체적으로 밝고, 그림자가 없는 곳에서 촬영해주세요.
            </p>
          </div>
          <div className="flex items-center">
            <span className="bg-sage-accent text-white rounded-full w-5 h-5 flex items-center justify-center font-bold mr-2">
              2
            </span>
            <p className="text-gray-600">
              가구, 벽, 바닥이 모두 나오게 방 전체를 찍어주세요.
            </p>
          </div>
          <div className="flex items-center">
            <span className="bg-sage-accent text-white rounded-full w-5 h-5 flex items-center justify-center font-bold mr-2">
              3
            </span>
            <p className="text-gray-600">
              왜곡이 없도록 정면에서 수평을 맞춰 촬영해주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ExamplePhotos;
