import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  // 현재 페이지의 경로(pathname) 정보를 가져옵니다.
  const { pathname } = useLocation();

  // pathname이 변경될 때마다 실행됩니다.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 이 컴포넌트는 화면에 아무것도 그리지 않습니다.
  return null;
}

export default ScrollToTop;
