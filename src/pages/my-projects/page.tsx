
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './components/ProjectCard';
import CreateProjectModal from './components/CreateProjectModal';
import { mockProjects } from '../../mocks/projects';
import { User, users } from '../../mocks/users';

export default function MyProjectsPage() {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projects, setProjects] = useState(mockProjects);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('currentUser');
      if (userStr) {
        const parsedUser = JSON.parse(userStr) as User;
        if (parsedUser && parsedUser.name) {
          // users 배열에서 최신 사용자 정보 가져오기 (isTeamLeader 필드 포함)
          const latestUser = users.find(u => u.id === parsedUser.id || u.email === parsedUser.email);
          if (latestUser) {
            // 최신 정보로 업데이트
            setCurrentUser(latestUser);
            // localStorage도 최신 정보로 업데이트
            localStorage.setItem('currentUser', JSON.stringify(latestUser));
          } else {
            setCurrentUser(parsedUser);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load user from localStorage:', error);
    }
  }, []);

  // 내가 속한 프로젝트만 필터링
  const myProjects = currentUser
    ? projects.filter(project => 
        project.currentMembers.some(member => member.userId === currentUser.id)
      )
    : [];

  const handleCreateProject = (title: string, description: string, techStack: string[], maxMembers: number) => {
    if (!currentUser) return;
    
    const newProject = {
      id: `project-${Date.now()}`,
      title,
      description,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      techStack,
      currentMembers: [
        {
          userId: currentUser.id,
          userName: currentUser.name,
          role: '팀장',
          joinedAt: new Date().toISOString()
        }
      ],
      maxMembers,
      createdAt: new Date().toISOString(),
      status: 'recruiting' as const
    };

    setProjects([newProject, ...projects]);
    setIsCreateModalOpen(false);
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/my-projects/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <main className="max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">내 프로젝트</h1>
          <p className="text-gray-400 text-lg">참여 중인 프로젝트를 관리하고 팀원들과 협업하세요</p>
        </div>

        {/* Create Project Button */}
        <div className="mb-8">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 bg-neon-green text-navy-900 rounded-lg font-semibold hover:bg-neon-green/90 transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line text-xl"></i>
            새 프로젝트 만들기
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <CreateProjectModal 
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateProject}
        />
      )}
    </div>
  );
}
