const InputEmail = (
  { value, onChange } //이메일 입력 필드
) => (
  <div>
    <label htmlFor="email" className="text-sm font-semibold text-gray-600">
      이메일
    </label>
    <input
      type="email"
      id="email"
      placeholder="이메일 주소를 입력하세요"
      className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-accent"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="email"
      required
    />
  </div>
);
export default InputEmail;
