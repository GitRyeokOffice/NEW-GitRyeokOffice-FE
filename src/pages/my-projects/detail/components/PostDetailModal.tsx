import { useState } from 'react';
import { ProjectPost, PostComment } from '../../../../mocks/projects';
import { users } from '../../../../mocks/users';
import { devVibeTypes } from '../../../../mocks/devVibes';
import designIcon from '@/assets/DESIGN.png';
import planningIcon from '@/assets/PLANNING.png';

interface PostDetailModalProps {
  post: ProjectPost;
  onClose: () => void;
  comments: PostComment[];
  onAddComment: (postId: string, content: string) => void;
}

// 작성자의 역할에 따라 아이콘 가져오기
const getAuthorIcon = (authorName: string, authorId?: string): string => {
  const user = users.find(u => u.id === authorId || u.name === authorName);
  if (!user) return "https://static.readdy.ai/image/acf8fc365223a7d2bd60db95c29d6240/898ae36fcd7ef66311cd7567104e6f57.png";
  
  if (user.role === 'designer') {
    return designIcon;
  } else if (user.role === 'planner') {
    return planningIcon;
  } else {
    // developer는 devVibe 아이콘 사용
    const devVibe = user.devVibeCode ? devVibeTypes[user.devVibeCode] : null;
    return devVibe?.icon || "https://static.readdy.ai/image/acf8fc365223a7d2bd60db95c29d6240/898ae36fcd7ef66311cd7567104e6f57.png";
  }
};

export default function PostDetailModal({ post, onClose, comments, onAddComment }: PostDetailModalProps) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-navy-800 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-navy-800 border-b border-white/10 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">게시글</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl text-gray-400"></i>
          </button>
        </div>

        {/* Post Content */}
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden bg-white/5 flex-shrink-0">
              <img 
                src={getAuthorIcon(post.authorName, post.authorId)} 
                alt={post.authorName}
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white font-semibold">{post.authorName}</span>
                <span className="text-gray-500 text-sm">•</span>
                <span className="text-gray-400 text-sm">
                  {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{post.title}</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-1">
              <i className="ri-eye-line"></i>
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <i className="ri-chat-3-line"></i>
              <span>{comments.length}</span>
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-4 mb-6">
            <h4 className="text-lg font-bold text-white">댓글 {comments.length}개</h4>
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden bg-white/5 flex-shrink-0">
                  <img 
                    src={getAuthorIcon(comment.authorName, comment.authorId)} 
                    alt={comment.authorName}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-sm">{comment.authorName}</span>
                    <span className="text-gray-500 text-xs">•</span>
                    <span className="text-gray-400 text-xs">
                      {new Date(comment.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comment Form */}
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              등록
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
