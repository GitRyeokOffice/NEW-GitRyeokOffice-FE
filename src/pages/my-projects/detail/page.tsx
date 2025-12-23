import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeamSection from './components/TeamSection';
import PostList from './components/PostList';
import WritePostModal from './components/WritePostModal';
import PostDetailModal from './components/PostDetailModal';
import MemberDetailModal from './components/MemberDetailModal';
import { mockProjects, mockProjectPosts, mockPostComments, PostComment } from '../../../mocks/projects';

const getStatusColor = (status: string) => {
  const colors = {
    'recruiting': 'bg-orange-100 text-orange-700',
    'in-progress': 'bg-teal-100 text-teal-700',
    'completed': 'bg-gray-100 text-gray-700'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
};

const getStatusText = (status: string) => {
  const texts = {
    'recruiting': '팀원 모집 중',
    'in-progress': '진행 중',
    'completed': '완료'
  };
  return texts[status as keyof typeof texts] || status;
};

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [posts, setPosts] = useState(mockProjectPosts);
  const [comments, setComments] = useState<PostComment[]>(mockPostComments);

  const currentUserId = '1';
  const project = mockProjects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">프로젝트를 찾을 수 없습니다</h2>
          <button
            onClick={() => navigate('/my-projects')}
            className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            프로젝트 목록으로
          </button>
        </div>
      </div>
    );
  }

  const handleWritePost = (title: string, content: string, isNotice: boolean) => {
    const newPost = {
      id: `post-${Date.now()}`,
      projectId: project.id,
      authorId: currentUserId,
      authorName: '김개발',
      title: isNotice ? `[공지사항] ${title}` : title,
      content,
      isNotice,
      createdAt: new Date().toISOString(),
      views: 0,
      comments: 0
    };

    setPosts([newPost, ...posts]);
    setIsWriteModalOpen(false);
  };

  const handleAddComment = (postId: string, content: string) => {
    const newComment: PostComment = {
      id: `comment-${Date.now()}`,
      postId,
      authorId: currentUserId,
      authorName: '김개발',
      content,
      createdAt: new Date().toISOString()
    };

    setComments([...comments, newComment]);
  };

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
  };

  const handleMemberClick = (member: any) => {
    setSelectedMember(member);
  };

  return (
    <div className="min-h-screen bg-navy-900 pt-20">
      <main className="max-w-7xl mx-auto px-6 py-24">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-white">{project.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
              </div>
              <p className="text-gray-400 text-lg">{project.description}</p>
            </div>
          </div>

          {/* Project Info */}
          <div className="flex flex-wrap gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <i className="ri-calendar-line text-teal-400"></i>
              <span>{new Date(project.createdAt).toLocaleDateString('ko-KR')}</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-team-line text-teal-400"></i>
              <span>{project.currentMembers.length}/{project.maxMembers}명</span>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Posts */}
          <div className="lg:col-span-2">
            <div className="bg-navy-800 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">프로젝트 피드</h2>
                <button
                  onClick={() => setIsWriteModalOpen(true)}
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-add-line"></i>
                  글쓰기
                </button>
              </div>
              <PostList posts={posts} comments={comments} onAddComment={handleAddComment} onPostClick={handlePostClick} />
            </div>
          </div>

          {/* Right Column - Team */}
          <div className="lg:col-span-1">
            <TeamSection members={project.currentMembers} maxMembers={project.maxMembers} onMemberClick={handleMemberClick} />
          </div>
        </div>
      </main>

      {/* Modals */}
      {isWriteModalOpen && (
        <WritePostModal onClose={() => setIsWriteModalOpen(false)} onSubmit={handleWritePost} />
      )}
      {selectedPost && (
        <PostDetailModal 
          post={selectedPost} 
          comments={comments.filter(c => c.postId === selectedPost.id)}
          onClose={() => setSelectedPost(null)}
          onAddComment={handleAddComment}
        />
      )}
      {selectedMember && (
        <MemberDetailModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </div>
  );
}
