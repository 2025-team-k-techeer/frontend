// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import HeaderBack from '../components/Header/HeaderBack';
import InputNickname from '../components/Sign/InputNickname';
import InputEmail from '../components/Sign/InputEmail';
import InputPassword from '../components/Sign/InputPassword';
import InputPasswordConfirm from '../components/Sign/InputPasswordConfirm';
import SignUpButton from '../components/Button/SignUpButton';
import { postSignup } from '../api/signupApi';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [nickname, setNickname] = useState(''); // 닉네임
  const [email, setEmail] = useState(''); // 이메일
  const [password, setPassword] = useState(''); // 비밀번호
  const [passwordConfirm, setPasswordConfirm] = useState(''); // 비밀번호 확인
  const [message, setMessage] = useState(''); // 메시지
  const [messageType, setMessageType] = useState(''); // 'success' | 'error'
  const [loading, setLoading] = useState(false); // 로딩 상태

  const setUser = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const isPasswordMatch =
    password && passwordConfirm && password === passwordConfirm;
  const showPasswordFeedback = passwordConfirm.length > 0;

  const isFormValid =
    nickname.trim() &&
    email.trim() &&
    password &&
    passwordConfirm &&
    isPasswordMatch;

  const handleSignUp = async () => {
    if (!isFormValid || loading) return;
    setLoading(true);
    try {
      const data = await postSignup({
        name: nickname,
        email,
        password,
      });
      console.log('post 성공', data);

      setMessage(data.message);
      setMessageType(data.status);
      if (data.status === 'success') {
        setUser({
          user_id: data.user_id,
          name: nickname,
          email,
        });
        setTimeout(() => {
          setMessage('');
          navigate('/login');
        }, 1000);
      } else {
        setTimeout(() => setMessage(''), 1000);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.message || '서버 오류가 발생했습니다.');
      setMessageType('error');
      setTimeout(() => setMessage(''), 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col min-h-screen bg-white">
      <HeaderBack title="회원가입" />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 sm:p-8">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
          >
            <InputNickname value={nickname} onChange={setNickname} />
            <InputEmail value={email} onChange={setEmail} />
            <InputPassword value={password} onChange={setPassword} />
            <InputPasswordConfirm
              value={passwordConfirm}
              onChange={setPasswordConfirm}
              isMatch={isPasswordMatch}
              showFeedback={showPasswordFeedback}
            />
            <div className="pt-4">
              <SignUpButton
                onClick={handleSignUp}
                disabled={!isFormValid || loading}
              />
            </div>
            {message && (
              <div
                className={`text-center mt-2 text-sm font-semibold ${
                  messageType === 'success' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
