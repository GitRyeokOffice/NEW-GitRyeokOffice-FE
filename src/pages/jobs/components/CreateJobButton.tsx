
import { useNavigate } from 'react-router-dom';

export default function CreateJobButton() {
  const navigate = useNavigate();

  return (
    <>
      {/* 데스크톱 버전 */}
      <button
        onClick={() => navigate('/jobs/create')}
        className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#00FF94] rounded-lg font-semibold text-gray-900 hover:bg-[#00FF94]/90 transition-all shadow-lg shadow-[#00FF94]/20 whitespace-nowrap cursor-pointer"
      >
        <i className="ri-add-line text-xl"></i>
        <span>공고 생성</span>
      </button>

      {/* 모바일 플로팅 버튼 */}
      <button
        onClick={() => navigate('/jobs/create')}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#00FF94] rounded-full shadow-xl shadow-[#00FF94]/30 flex items-center justify-center hover:bg-[#00FF94]/90 transition-all z-50 cursor-pointer"
      >
        <i className="ri-add-line text-2xl text-gray-900"></i>
      </button>
    </>
  );
}
