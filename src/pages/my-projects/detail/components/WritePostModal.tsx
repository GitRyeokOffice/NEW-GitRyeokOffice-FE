import { useState } from 'react';

interface WritePostModalProps {
  onClose: () => void;
  onSubmit: (title: string, content: string, isNotice: boolean) => void;
}

export default function WritePostModal({ onClose, onSubmit }: WritePostModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isNotice, setIsNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      return;
    }

    onSubmit(title, content, isNotice);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-navy-800 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">새 글 작성</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              카테고리 *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-green transition-colors text-sm cursor-pointer"
              required
            >
              <option value="notice" className="bg-navy-800">공지사항</option>
              <option value="progress" className="bg-navy-800">진행상황</option>
              <option value="question" className="bg-navy-800">질문</option>
              <option value="discussion" className="bg-navy-800">논의</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              제목 *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors text-sm"
              placeholder="제목을 입력하세요"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              내용 *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors resize-none text-sm"
              rows={10}
              placeholder="내용을 입력하세요"
              required
            />
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
              작성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
