import ARPage from '../pages/ARPage';

const ARPageWrapper = () => {
  const mockModels = [
    {
      label: '의자',
      model_url: 'https://example.com/model1.glb',
      image_url: 'https://example.com/image1.png',
      width_cm: 50,
      height_cm: 80,
      depth_cm: 50,
      scale: 1.0,
    },
  ];

  const location = {
    state: {
      models: mockModels,
    },
  };

  // location을 직접 넘기기 어렵다면 useLocation을 쓰는 ARPage를 감싸는 것도 가능
  return <ARPage location={location} />;
};

export default ARPageWrapper;
