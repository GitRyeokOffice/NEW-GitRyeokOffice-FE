import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { users } from "../../mocks/users";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      // Dispatch event to update Navbar immediately
      window.dispatchEvent(new Event("userLogin"));
      navigate("/");
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <img
            src="https://static.readdy.ai/image/acf8fc365223a7d2bd60db95c29d6240/96fe11c5181c303788ed4e192691b227.png"
            alt="DevMatch Logo"
            className="h-12 w-12 object-contain"
          />
          <h1 className="text-3xl font-bold text-white">깃력사무소</h1>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">로그인</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-neon-green text-navy-900 rounded-lg font-semibold hover:bg-neon-green/90 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              로그인
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-navy-900/50 text-gray-400">또는</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-400">
              계정이 없으신가요?{" "}
              <a
                href="/signup"
                className="text-neon-green hover:underline cursor-pointer whitespace-nowrap"
              >
                회원가입
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
