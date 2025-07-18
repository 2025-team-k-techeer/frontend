import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBack from '../components/HeaderBack';
import LoginTitle from '../components/LoginTitle';
import InputEmail from '../components/InputEmail';
import InputPassword from '../components/InputPassword';
import LoginErrorMessage from '../components/LoginErrorMessage';
import ActionButton from '../components/ButtonAction';
import { useAuth } from '../hooks/useAuth'; //전역 상태 관리를 위함

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); //전역 상태 관리를 위함

  //API 연동 예정
  //handleLogin 함수 내부에서 fetch로 요청을 보냄.
  //로그인 성공 시 토큰 저장 후 메인 페이지로 이동
  //로그인 실패 시 에러 메시지 표시
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json(); //이 부분이 서버에서 응답받은 JSON 데이터를 파싱하는 부분
      if (data.status === 'success' && data.token) {
        //API 응답 상태 코드 확인 (명세서 참고)
        login({ token: data.token }); //로그인 성공 시 전역 상태 관리를 위함
        localStorage.setItem('token', data.token); //로그인 성공 시 로컬스토리지에 토큰 저장
        navigate('/'); //로그인 성공 시 메인 페이지로 이동
      } else {
        setErrorMsg(data.message || '로그인에 실패했습니다.'); //API 응답 메시지 표시
        setPassword(''); //비밀번호 입력 필드 초기화
        setTimeout(() => setErrorMsg(''), 1000); //1초 후 에러 메시지 초기화
      }
    } catch {
      setErrorMsg('네트워크 오류가 발생했습니다.'); //네트워크 오류 시 에러 메시지 표시
      setPassword(''); //비밀번호 입력 필드 초기화
      setTimeout(() => setErrorMsg(''), 1000); //1초 후 에러 메시지 초기화
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col min-h-screen px-4">
      <HeaderBack title="" bgColor="bg-white" showBorder={false} />
      <main className="flex-1 flex flex-col justify-center items-center">
        <LoginErrorMessage message={errorMsg} />
        <LoginTitle />
        <form className="w-full space-y-4" onSubmit={handleLogin}>
          <InputEmail value={email} onChange={setEmail} />
          <InputPassword value={password} onChange={setPassword} />
          <ActionButton
            onClick={handleLogin}
            isDisabled={!email || !password || loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </ActionButton>
        </form>
        <div className="mt-10 mb-4 text-center text-sm">
          <a href="/find-account" className="text-gray-500 hover:underline">
            아이디/비밀번호 찾기
          </a>
          <span className="text-gray-300 mx-2">|</span>
          <a
            href="/signup"
            className="text-brand-charcoal font-semibold hover:underline"
          >
            회원가입
          </a>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
