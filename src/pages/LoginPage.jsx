// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const { login, logout, user, isLoggedIn } = useAuth();
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (!name.trim()) return;
    // 같은 이름이면 같은 user.id가 되도록
    const mockUser = {
      id: name, // 실무에선 이메일/DB userId
      name,
      token: 'sample_token_' + Date.now(),
    };
    login(mockUser);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h2>로그인 페이지</h2>
      {isLoggedIn ? (
        <>
          <p>안녕하세요, {user.name}님!</p>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleLogin}>로그인</button>
        </>
      )}
    </div>
  );
}

export default LoginPage;
