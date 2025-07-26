const LoginErrorMessage = (
  { message } //로그인 실패 시 에러 메시지 표시
) =>
  message ? (
    <div className="text-red-500 text-center mb-2 font-semibold">{message}</div>
  ) : null;
export default LoginErrorMessage;
