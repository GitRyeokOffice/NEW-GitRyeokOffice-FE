import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import psmIcon from '../../assets/PSM.png';
import { users } from '../../mocks/users';
import { devVibeTypes } from '../../mocks/devVibes';
import designIcon from '@/assets/DESIGN.png';
import planningIcon from '@/assets/PLANNING.png';

interface User {
  id: string;
  name: string;
  email: string;
  role?: 'developer' | 'designer' | 'planner';
  devVibeCode?: string;
  [key: string]: any;
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadUser = () => {
      try {
        const user = localStorage.getItem('currentUser');
        if (user) {
          const parsedUser = JSON.parse(user);
          if (parsedUser && parsedUser.name) {
            // users 배열에서 최신 사용자 정보 가져오기
            const latestUser = users.find(u => u.id === parsedUser.id || u.email === parsedUser.email);
            if (latestUser) {
              setCurrentUser(latestUser);
              localStorage.setItem('currentUser', JSON.stringify(latestUser));
            } else {
              setCurrentUser(parsedUser);
            }
          } else {
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
      }
    };

    loadUser();
    // Listen for storage changes (e.g., when user logs in from another tab)
    window.addEventListener('storage', loadUser);
    // Also listen for custom events for same-tab updates
    window.addEventListener('userLogin', loadUser);
    window.addEventListener('userLogout', loadUser);

    return () => {
      window.removeEventListener('storage', loadUser);
      window.removeEventListener('userLogin', loadUser);
      window.removeEventListener('userLogout', loadUser);
    };
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      window.dispatchEvent(new Event('userLogout'));
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  // 사용자의 역할에 따라 아이콘 가져오기
  const getUserIcon = (): string => {
    if (!currentUser) return "";
    
    if (currentUser.role === 'designer') {
      return designIcon;
    } else if (currentUser.role === 'planner') {
      return planningIcon;
    } else {
      // developer는 devVibe 아이콘 사용
      const devVibe = currentUser.devVibeCode ? devVibeTypes[currentUser.devVibeCode] : null;
      return devVibe?.icon || "";
    }
  };

  const userIcon = getUserIcon();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img src={psmIcon} alt="깃력사무소 Logo" className="h-12 w-12 object-contain" />
            <span className="text-2xl font-bold text-white">깃력사무소</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/devvibe"
              className={`text-base font-medium transition-colors cursor-pointer whitespace-nowrap ${
                isActive('/devvibe')
                  ? 'text-lime-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              개발 성향
            </Link>
            <Link
              to="/jobs"
              className={`text-base font-medium transition-colors cursor-pointer whitespace-nowrap ${
                isActive('/jobs')
                  ? 'text-lime-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              공고 찾기
            </Link>
            <Link
              to="/find-teammates"
              className={`text-base font-medium transition-colors cursor-pointer whitespace-nowrap ${
                isActive('/find-teammates')
                  ? 'text-lime-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              팀원 찾기
            </Link>
            <Link
              to="/my-projects"
              className={`text-base font-medium transition-colors cursor-pointer whitespace-nowrap ${
                isActive('/my-projects')
                  ? 'text-lime-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              내 프로젝트
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  {userIcon ? (
                    <div className="w-6 h-6 flex items-center justify-center rounded-full overflow-hidden bg-white/5">
                      <img 
                        src={userIcon} 
                        alt={currentUser.name}
                        className="w-full h-full object-contain p-0.5"
                      />
                    </div>
                  ) : (
                    <i className="ri-user-line text-lime-400"></i>
                  )}
                  <span className="text-white text-sm">{currentUser.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2 text-white font-medium hover:text-lime-400 transition-colors cursor-pointer whitespace-nowrap"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-lime-400 text-gray-900 rounded-full font-semibold hover:bg-lime-300 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
