import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../../home/components/Footer';

type Role = 'developer' | 'designer' | 'planner';
type PreferenceType = 'P' | 'I' | 'none';
type SustainabilityType = 'S' | 'F' | 'none';
type TimeType = 'M' | 'N' | 'none';

const TECH_STACKS = [
  'React', 'Vue', 'Angular', 'Next.js', 'Nuxt.js',
  'TypeScript', 'JavaScript', 'Python', 'Java', 'Kotlin',
  'Swift', 'Flutter', 'React Native', 'Node.js', 'Express',
  'NestJS', 'Spring', 'Django', 'FastAPI', 'Go',
  'Rust', 'C++', 'C#', 'PHP', 'Ruby',
  'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase',
  'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes',
  'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator'
];

export default function CreateJobPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [roleCount, setRoleCount] = useState<Record<Role, number>>({
    developer: 1,
    designer: 1,
    planner: 1
  });
  const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>([]);
  
  // 개발자 선호 유형
  const [preferenceType, setPreferenceType] = useState<PreferenceType>('none');
  const [sustainabilityType, setSustainabilityType] = useState<SustainabilityType>('none');
  const [timeType, setTimeType] = useState<TimeType>('none');

  const handleRoleToggle = (role: Role) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleRoleCountChange = (role: Role, value: number) => {
    if (value >= 1 && value <= 10) {
      setRoleCount(prev => ({
        ...prev,
        [role]: value
      }));
    }
  };

  const handleTechStackToggle = (stack: string) => {
    setSelectedTechStacks(prev =>
      prev.includes(stack)
        ? prev.filter(s => s !== stack)
        : [...prev, stack]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!description.trim()) {
      alert('설명을 입력해주세요.');
      return;
    }
    if (selectedRoles.length === 0) {
      alert('최소 1개 이상의 직무를 선택해주세요.');
      return;
    }
    if (selectedTechStacks.length === 0) {
      alert('최소 1개 이상의 기술 스택을 선택해주세요.');
      return;
    }

    // 공고 생성 로직 (추후 Supabase 연동)
    const recruitmentInfo = selectedRoles.map(role => ({
      role,
      count: roleCount[role]
    }));

    const newJob = {
      title,
      description,
      recruitment: recruitmentInfo,
      techStacks: selectedTechStacks,
      ...(selectedRoles.includes('developer') && {
        preferredTypes: {
          preference: preferenceType,
          sustainability: sustainabilityType,
          time: timeType
        }
      })
    };

    console.log('새 공고:', newJob);
    alert('공고가 생성되었습니다!');
    navigate('/jobs');
  };

  const isDeveloperSelected = selectedRoles.includes('developer');

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">공고 생성</h1>
            <p className="text-gray-400">팀원을 모집할 공고를 작성해주세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 제목 */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: AI 챗봇 서비스 개발 팀원 모집"
                className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent outline-none transition-all text-sm bg-gray-800 text-white placeholder-gray-500"
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-2">{title.length}/100</p>
            </div>

            {/* 설명 */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                설명 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="프로젝트에 대한 상세한 설명을 작성해주세요"
                rows={6}
                className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent outline-none transition-all resize-none text-sm bg-gray-800 text-white placeholder-gray-500"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-2">{description.length}/500</p>
            </div>

            {/* 모집 직무 */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                모집 직무 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {[
                  { value: 'developer' as Role, label: '개발자', icon: 'ri-code-s-slash-line' },
                  { value: 'designer' as Role, label: '디자이너', icon: 'ri-palette-line' },
                  { value: 'planner' as Role, label: '기획자', icon: 'ri-lightbulb-line' }
                ].map(role => (
                  <div key={role.value} className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleRoleToggle(role.value)}
                      className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                        selectedRoles.includes(role.value)
                          ? 'border-lime-400 bg-lime-400/10 text-white'
                          : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                      }`}
                    >
                      <i className={`${role.icon} text-lg`}></i>
                      <span className="font-medium text-sm">{role.label}</span>
                    </button>
                    
                    {selectedRoles.includes(role.value) && (
                      <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
                        <button
                          type="button"
                          onClick={() => handleRoleCountChange(role.value, roleCount[role.value] - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-700 border border-gray-600 text-gray-300 hover:bg-gray-600 transition-all cursor-pointer"
                        >
                          <i className="ri-subtract-line"></i>
                        </button>
                        <span className="w-12 text-center font-semibold text-white">
                          {roleCount[role.value]}명
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRoleCountChange(role.value, roleCount[role.value] + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-700 border border-gray-600 text-gray-300 hover:bg-gray-600 transition-all cursor-pointer"
                        >
                          <i className="ri-add-line"></i>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {selectedRoles.length > 0 && (
                <div className="mt-4 p-4 bg-lime-400/10 rounded-lg border border-lime-400/30">
                  <p className="text-sm font-medium text-white mb-2">총 모집 인원</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoles.map(role => {
                      const roleInfo = {
                        developer: { label: '개발자', icon: 'ri-code-s-slash-line' },
                        designer: { label: '디자이너', icon: 'ri-palette-line' },
                        planner: { label: '기획자', icon: 'ri-lightbulb-line' }
                      }[role];
                      
                      return (
                        <div key={role} className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg border border-gray-700">
                          <i className={`${roleInfo.icon} text-lime-400`}></i>
                          <span className="text-sm text-gray-300">{roleInfo.label}</span>
                          <span className="text-sm font-semibold text-white">{roleCount[role]}명</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 개발자 선호 유형 (개발자가 선택되었을 때만 표시) */}
            {isDeveloperSelected && (
              <div className="bg-gradient-to-br from-lime-400/10 to-teal-500/10 p-6 rounded-xl border border-lime-400/30">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="ri-user-star-line text-lime-400"></i>
                  개발자 선호 유형
                </h3>
                <p className="text-sm text-gray-400 mb-6">원하는 개발자의 성향을 선택해주세요</p>

                <div className="space-y-6">
                  {/* 접근 방식 */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      ① 접근 방식
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setPreferenceType('P')}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          preferenceType === 'P'
                            ? 'border-lime-400 bg-lime-400/10 text-white'
                            : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">P = Plan</div>
                        <div className="text-xs text-gray-500">계획형</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreferenceType('I')}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          preferenceType === 'I'
                            ? 'border-lime-400 bg-lime-400/10 text-white'
                            : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">I = Improvisation</div>
                        <div className="text-xs text-gray-500">즉흥형</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreferenceType('none')}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          preferenceType === 'none'
                            ? 'border-lime-400 bg-lime-400/10 text-white'
                            : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">무관</div>
                        <div className="text-xs text-gray-500">상관없음</div>
                      </button>
                    </div>
                  </div>

                  {/* 작업 리듬 */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      ② 작업 리듬
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setSustainabilityType('S')}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          sustainabilityType === 'S'
                            ? 'border-lime-400 bg-lime-400/10 text-white'
                            : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">S = Steady</div>
                        <div className="text-xs text-gray-500">지속형</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSustainabilityType('F')}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          sustainabilityType === 'F'
                            ? 'border-lime-400 bg-lime-400/10 text-white'
                            : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">F = Focus</div>
                        <div className="text-xs text-gray-500">몰입형</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSustainabilityType('none')}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          sustainabilityType === 'none'
                            ? 'border-lime-400 bg-lime-400/10 text-white'
                            : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">무관</div>
                        <div className="text-xs text-gray-500">상관없음</div>
                      </button>
                    </div>
                  </div>

                  {/* 활동 시간 */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      ③ 활동 시간
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setTimeType('M')}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          timeType === 'M'
                            ? 'border-lime-400 bg-lime-400/10 text-white'
                            : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">M = Morning</div>
                        <div className="text-xs text-gray-500">아침형</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTimeType('N')}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          timeType === 'N'
                            ? 'border-lime-400 bg-lime-400/10 text-white'
                            : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">N = Night</div>
                        <div className="text-xs text-gray-500">저녁형</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTimeType('none')}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          timeType === 'none'
                            ? 'border-lime-400 bg-lime-400/10 text-white'
                            : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">무관</div>
                        <div className="text-xs text-gray-500">상관없음</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 기술 스택 */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                기술 스택 <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {TECH_STACKS.map(stack => (
                  <button
                    key={stack}
                    type="button"
                    onClick={() => handleTechStackToggle(stack)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                      selectedTechStacks.includes(stack)
                        ? 'bg-lime-400 text-gray-900'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    {stack}
                  </button>
                ))}
              </div>
              {selectedTechStacks.length > 0 && (
                <p className="text-xs text-gray-500 mt-3">
                  {selectedTechStacks.length}개 선택됨
                </p>
              )}
            </div>

            {/* 제출 버튼 */}
            <div className="flex gap-3 pt-6">
              <button
                type="button"
                onClick={() => navigate('/jobs')}
                className="flex-1 px-6 py-4 border-2 border-gray-700 rounded-lg font-semibold text-gray-300 hover:bg-gray-800 transition-all whitespace-nowrap"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-4 bg-lime-400 rounded-lg font-semibold text-gray-900 hover:bg-lime-500 transition-all shadow-lg shadow-lime-400/20 whitespace-nowrap"
              >
                공고 생성
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
