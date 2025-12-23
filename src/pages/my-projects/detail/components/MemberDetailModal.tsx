import { ProjectMember } from '../../../../mocks/projects';
import { users } from '../../../../mocks/users';
import { devVibeTypes } from '../../../../mocks/devVibes';
import designIcon from '@/assets/DESIGN.png';
import planningIcon from '@/assets/PLANNING.png';

interface MemberDetailModalProps {
  member: ProjectMember;
  onClose: () => void;
}

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

export default function MemberDetailModal({ member, onClose }: MemberDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-navy-800 border border-white/10 rounded-2xl max-w-md w-full">
        {/* Header */}
        <div className="border-b border-white/10 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">팀원 정보</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl text-gray-400"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-24 h-24 flex items-center justify-center rounded-full overflow-hidden bg-white/5 mb-4">
              <img 
                src={getMemberIcon(member.userId, member.userName)} 
                alt={member.userName}
                className="w-full h-full object-contain p-2"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{member.userName}</h3>
            <p className="text-teal-400 font-semibold mb-1">{member.role}</p>
            <p className="text-gray-400 text-sm">
              {new Date(member.joinedAt).toLocaleDateString('ko-KR')} 참여
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap">
              <i className="ri-message-3-line"></i>
              메시지 보내기
            </button>
            <button className="w-full px-4 py-3 bg-white/5 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap">
              <i className="ri-user-line"></i>
              프로필 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
