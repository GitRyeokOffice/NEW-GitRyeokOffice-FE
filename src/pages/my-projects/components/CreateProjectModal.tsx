import { useState } from 'react';

interface CreateProjectModalProps {
  onClose: () => void;
  onSubmit: (title: string, description: string, techStack: string[], maxMembers: number) => void;
}

export default function CreateProjectModal({ onClose, onSubmit }: CreateProjectModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techInput, setTechInput] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [maxMembers, setMaxMembers] = useState(5);

  const handleAddTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechStack(techStack.filter(t => t !== tech));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim() && techStack.length > 0) {
      onSubmit(title, description, techStack, maxMembers);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-navy-800 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">새 프로젝트 만들기</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              프로젝트 이름 *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors text-sm"
              placeholder="프로젝트 이름을 입력하세요"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              프로젝트 설명 *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors resize-none text-sm"
              rows={4}
              placeholder="프로젝트에 대해 설명해주세요"
              required
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              기술 스택
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors text-sm"
                placeholder="기술 스택을 입력하세요"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-4 py-3 bg-neon-green text-navy-900 rounded-lg font-semibold hover:bg-neon-green/90 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                추가
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-lg flex items-center gap-2"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <i className="ri-close-line text-sm"></i>
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/5 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-neon-green text-navy-900 rounded-lg font-semibold hover:bg-neon-green/90 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              프로젝트 만들기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
