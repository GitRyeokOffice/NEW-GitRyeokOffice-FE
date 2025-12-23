export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 cursor-pointer group">
            <img 
              src="https://static.readdy.ai/image/acf8fc365223a7d2bd60db95c29d6240/96fe11c5181c303788ed4e192691b227.png" 
              alt="깃력사무소 Logo" 
              className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-2xl font-bold text-white">
              깃력사무소
            </span>
          </a>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/jobs"
              className="text-gray-300 hover:text-lime-400 transition-colors duration-300 relative group cursor-pointer whitespace-nowrap"
            >
              공고 찾기
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/find-teammates"
              className="text-lime-400 font-semibold relative group cursor-pointer whitespace-nowrap"
            >
              팀원 찾기
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-lime-400"></span>
            </a>
            <a
              href="/my-projects"
              className="text-gray-300 hover:text-lime-400 transition-colors duration-300 relative group cursor-pointer whitespace-nowrap"
            >
              내 프로젝트
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-800 rounded-lg">
              <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-lime-400 to-emerald-400 rounded-full">
                <span className="text-sm font-bold text-gray-900">김</span>
              </div>
              <span className="text-sm font-medium text-white">김개발</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}