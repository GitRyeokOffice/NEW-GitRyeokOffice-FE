import { useState } from 'react';
import { ProjectPost, PostComment } from '../../../../mocks/projects';
import PostDetailModal from './PostDetailModal';

interface PostListProps {
  posts: ProjectPost[];
  comments: PostComment[];
  onAddComment: (postId: string, content: string) => void;
  onPostClick: (post: ProjectPost) => void;
}

export default function PostList({ posts, comments, onAddComment, onPostClick }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <i className="ri-file-list-3-line text-6xl text-gray-600 mb-4"></i>
          <p className="text-gray-400">아직 작성된 글이 없습니다</p>
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            onClick={() => onPostClick(post)}
            className="p-5 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden bg-white/5 flex-shrink-0">
                <img 
                  src="https://static.readdy.ai/image/acf8fc365223a7d2bd60db95c29d6240/898ae36fcd7ef66311cd7567104e6f57.png" 
                  alt={post.authorName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold">{post.authorName}</span>
                  <span className="text-gray-500 text-sm">•</span>
                  <span className="text-gray-400 text-sm">
                    {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-teal-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-3">{post.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <i className="ri-eye-line"></i>
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="ri-chat-3-line"></i>
                    <span>{comments.filter(c => c.postId === post.id).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
