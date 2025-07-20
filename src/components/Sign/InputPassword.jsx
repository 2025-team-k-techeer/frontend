const InputPassword = (
  { value, onChange } //비밀번호 입력 필드
) => (
  <div>
    <label htmlFor="password" className="text-sm font-semibold text-gray-600">
      비밀번호
    </label>
    <input
      type="password"
      id="password"
      placeholder="비밀번호를 입력하세요"
      className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-accent"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="current-password"
      required
    />
  </div>
);
export default InputPassword;
