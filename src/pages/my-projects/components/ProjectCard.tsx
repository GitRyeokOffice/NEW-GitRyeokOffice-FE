import { useNavigate } from 'react-router-dom';
import { users } from '../../../mocks/users';
import { devVibeTypes } from '../../../mocks/devVibes';
import designIcon from '@/assets/DESIGN.png';
import planningIcon from '@/assets/PLANNING.png';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    status: 'recruiting' | 'in-progress' | 'completed';
    createdAt: string;
    currentMembers: Array<{
      userId: string;
      userName: string;
      role: string;
      joinedAt: string;
    }>;
    maxMembers: number;
    techStack: string[];
    ownerId: string;
    ownerName: string;
  };
}

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

const calculateDaysLeft = (createdAt: string) => {
  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = now.getTime() - created.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const targetDays = 90; // 3개월 기준
  return Math.max(0, targetDays - diffDays);
};

const formatPeriod = (createdAt: string) => {
  const created = new Date(createdAt);
  const year = created.getFullYear();
  const month = String(created.getMonth() + 1).padStart(2, '0');
  return `${year}.${month} ~`;
};

// 멤버의 역할에 따라 아이콘 가져오기
const getMemberIcon = (userId: string, userName: string): string => {
  const user = users.find(u => u.id === userId || u.name === userName);
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

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const currentUserId = '1'; // 김개발
  const isLeader = project.ownerId === currentUserId;
  const daysLeft = calculateDaysLeft(project.createdAt);
  const period = formatPeriod(project.createdAt);

  return (
    <div
      onClick={() => navigate(`/my-projects/${project.id}`)}
      className="bg-navy-800 border border-white/10 rounded-2xl p-6 hover:border-teal-500/50 transition-all duration-300 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
              {project.title}
            </h3>
            {isLeader && (
              <span className="px-2 py-1 bg-teal-500/20 text-teal-400 text-xs font-semibold rounded-full">
                팀장
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
          {getStatusText(project.status)}
        </span>
        <span className="text-gray-500 text-xs">•</span>
        <span className="text-gray-400 text-xs">{period}</span>
      </div>

      {/* Team Members */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex -space-x-2">
          {project.currentMembers.slice(0, 4).map((member, index) => (
            <div
              key={index}
              className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden border-2 border-navy-800 bg-white/5"
            >
              <img 
                src={getMemberIcon(member.userId, member.userName)} 
                alt={member.userName}
                className="w-full h-full object-contain p-1"
              />
            </div>
          ))}
        </div>
        <span className="text-gray-400 text-sm">
          {project.currentMembers.length}/{project.maxMembers}명
        </span>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.slice(0, 3).map((tech, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded-md"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded-md">
            +{project.techStack.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <i className="ri-team-line"></i>
            <span>{project.currentMembers.length}/{project.maxMembers}</span>
          </div>
          <div className="flex items-center gap-1">
            <i className="ri-calendar-line"></i>
            <span>{daysLeft}일 남음</span>
          </div>
        </div>
        <i className="ri-arrow-right-line text-xl text-gray-400 group-hover:text-teal-400 group-hover:translate-x-1 transition-all"></i>
      </div>
    </div>
  );
}
