import { useState } from 'react';
import { Job } from '../../../mocks/jobs';
import { devVibeTypes } from '../../../mocks/devVibes';

interface ApplyModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplyModal({ job, isOpen, onClose }: ApplyModalProps) {
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // creatorDevVibe에서 devVibe 코드 추출 (예: "차분한 설계자 (PSM)" -> "P-S-M")
  const getDevVibeCode = (creatorDevVibe?: string): string | null => {
    if (!creatorDevVibe) return null;
    const match = creatorDevVibe.match(/\(([A-Z]{3})\)/);
    if (match) {
      const code = match[1]; // "PSM"
      // "PSM" -> "P-S-M" 형식으로 변환
      return `${code[0]}-${code[1]}-${code[2]}`;
    }
    return null;
  };

  const devVibeCode = getDevVibeCode(job.creatorDevVibe);
  const devVibe = devVibeCode ? devVibeTypes[devVibeCode] : null;
  const creatorIcon = devVibe?.icon || "https://static.readdy.ai/image/acf8fc365223a7d2bd60db95c29d6240/898ae36fcd7ef66311cd7567104e6f57.png";

  if (!isOpen) return null;

  const handleTechStackToggle = (tech: string) => {
    setSelectedTechStack(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 제출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // 2초 후 모달 닫기
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setSelectedTechStack([]);
      setMessage('');
    }, 2000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setIsSubmitted(false);
      setSelectedTechStack([]);
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
          <div className="flex-1 pr-4">
            <h2 className="text-xl font-bold text-white mb-1">공고 지원하기</h2>
            <p className="text-sm text-gray-400 line-clamp-1">{job.title}</p>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* 공고 정보 */}
          <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/5 flex items-center justify-center">
                <img 
                  src={creatorIcon} 
                  alt={job.creatorName}
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{job.creatorName}</p>
                <p className="text-xs text-gray-400">{job.creatorRole}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <i className="ri-team-line"></i>
                <span>{job.currentMembers}/{job.teamSize}명</span>
              </div>
              <div className="flex items-center gap-1">
                <i className="ri-time-line"></i>
                <span>{job.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <i className="ri-bookmark-line"></i>
                <span>{job.projectType}</span>
              </div>
            </div>
          </div>

          {/* 선호 기술스택 */}
          {job.techStack.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-3">
                선호 기술스택
                <span className="text-gray-500 font-normal ml-2">(선택사항)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {job.techStack.map(tech => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => handleTechStackToggle(tech)}
                    className={`text-sm px-4 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                      selectedTechStack.includes(tech)
                        ? 'bg-lime-400 text-gray-900 font-medium'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
              {selectedTechStack.length > 0 && (
                <p className="text-xs text-lime-400 mt-2">
                  {selectedTechStack.length}개 선택됨
                </p>
              )}
            </div>
          )}

          {/* 팀장에게 전할 메시지 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-3">
              팀장에게 전할 메시지
              <span className="text-red-400 ml-1">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={500}
              placeholder="자기소개, 지원 동기, 관련 경험 등을 자유롭게 작성해주세요."
              className="w-full h-32 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">
                프로젝트에 대한 열정과 기여할 수 있는 부분을 어필해보세요
              </p>
              <p className="text-xs text-gray-400">
                {message.length}/500
              </p>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="flex-1 px-6 py-3 bg-lime-400 text-gray-900 rounded-lg hover:bg-lime-300 transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  제출 중...
                </>
              ) : isSubmitted ? (
                <>
                  <i className="ri-check-line"></i>
                  제출 완료!
                </>
              ) : (
                '지원서 제출'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}