import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#2C5F5D] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-white/20">
          <div className="flex items-center gap-3">
            <img
              src="https://static.readdy.ai/image/acf8fc365223a7d2bd60db95c29d6240/96fe11c5181c303788ed4e192691b227.png"
              alt="DevMatch Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-bold text-white">깃력사무소</span>
          </div>

          <div>
            <Link
              to="/teamInfo"
              className="text-white/80 hover:text-white transition-colors cursor-pointer text-lg"
            >
              팀 소개
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/80 text-sm">
            © 2025 GitRyeokOffice. All rights reserved.
          </div>
          <div></div>
        </div>
      </div>
    </footer>
  );
}
