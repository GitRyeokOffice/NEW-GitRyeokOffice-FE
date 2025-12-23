import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface User {
  name: string;
  [key: string]: any;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      const user = localStorage.getItem('currentUser');
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.name) {
          setCurrentUser(parsedUser);
        }
      }
    } catch (error) {
      console.error('Failed to parse user data from localStorage:', error);
      localStorage.removeItem('currentUser');
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder-logo.png'; // Fallback image
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-900/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 cursor-pointer group">
            <img 
              src="https://static.readdy.ai/image/acf8fc365223a7d2bd60db95c29d6240/96fe11c5181c303788ed4e192691b227.png" 
              alt="깃력사무소 Logo" 
              className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
              onError={handleImageError}
            />
            <span className="text-2xl font-bold text-white">
              깃력사무소
            </span>
          </a>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/devvibe"
              className="text-gray-300 hover:text-neon-green transition-colors duration-300 relative group cursor-pointer whitespace-nowrap"
            >
              개발 성향
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-green transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/jobs"
              className="text-gray-300 hover:text-neon-green transition-colors duration-300 relative group cursor-pointer whitespace-nowrap"
            >
              공고 찾기
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-green transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/find-teammates"
              className="text-gray-300 hover:text-neon-green transition-colors duration-300 relative group cursor-pointer whitespace-nowrap"
            >
              팀원 찾기
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-green transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/my-projects"
              className="text-gray-300 hover:text-neon-green transition-colors duration-300 relative group cursor-pointer whitespace-nowrap"
            >
              내 프로젝트
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-green transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <i className="ri-user-line text-neon-green"></i>
                  <span className="text-white text-sm">{currentUser.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-6 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <a 
                  href="/login"
                  className="px-6 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  로그인
                </a>
                <a 
                  href="/signup"
                  className="px-6 py-3 bg-neon-green text-navy-900 rounded-full font-semibold hover:bg-neon-green/90 transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  회원가입
                  <i className="ri-arrow-right-line"></i>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
