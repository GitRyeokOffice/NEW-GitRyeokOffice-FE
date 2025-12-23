import { useState } from 'react';
import { ProjectMember } from '../../../../mocks/projects';
import { users } from '../../../../mocks/users';
import MemberDetailModal from './MemberDetailModal';

interface TeamSectionProps {
  members: ProjectMember[];
  maxMembers: number;
  onMemberClick: (member: ProjectMember) => void;
}

export default function TeamSection({ members, maxMembers, onMemberClick }: TeamSectionProps) {
  return (
    <div className="bg-navy-800 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">팀원</h2>
        <span className="text-gray-400 text-sm">{members.length}/{maxMembers}명</span>
      </div>

      <div className="space-y-4">
        {members.map((member, index) => (
          <div
            key={index}
            onClick={() => onMemberClick(member)}
            className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden bg-white/5 flex-shrink-0">
              <img 
                src="https://static.readdy.ai/image/acf8fc365223a7d2bd60db95c29d6240/898ae36fcd7ef66311cd7567104e6f57.png" 
                alt={member.userName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold group-hover:text-teal-400 transition-colors">
                {member.userName}
              </h3>
              <p className="text-gray-400 text-sm truncate">{member.role}</p>
            </div>
            <i className="ri-arrow-right-line text-gray-400 group-hover:text-teal-400 group-hover:translate-x-1 transition-all"></i>
          </div>
        ))}
      </div>
    </div>
  );
}
