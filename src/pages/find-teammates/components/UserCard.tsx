import { useState } from 'react';
import { User } from '../../../mocks/users';
import { devVibeTypes } from '../../../mocks/devVibes';
import designIcon from '@/assets/DESIGN.png';
import planningIcon from '@/assets/PLANNING.png';

interface UserCardProps {
  user: User;
  canInvite: boolean;
  isRecommended: boolean;
}

const UserCard = ({ user, canInvite, isRecommended }: UserCardProps) => {
  const [isInvited, setIsInvited] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const devVibe = user.devVibeCode ? devVibeTypes[user.devVibeCode] : null;
  
  // 역할에 따라 아이콘 결정
  const getUserIcon = (): string => {
    if (user.role === 'designer') {
      return designIcon;
    } else if (user.role === 'planner') {
      return planningIcon;
    } else {
      // developer는 devVibe 아이콘 사용
      return devVibe?.icon || "https://static.readdy.ai/image/acf8fc365223a7d2bd60db95c29d6240/898ae36fcd7ef66311cd7567104e6f57.png";
    }
  };
  
  const userIcon = getUserIcon();

  const roleMap: Record<string, { label: string; color: string; icon: string }> = {
    developer: { label: '개발자', color: 'from-blue-500 to-indigo-500', icon: 'ri-code-line' },
    designer: { label: '디자이너', color: 'from-pink-500 to-rose-500', icon: 'ri-palette-line' },
    planner: { label: '기획자', color: 'from-purple-500 to-violet-500', icon: 'ri-lightbulb-line' }
  };

  const roleInfo = roleMap[user.role];

  const handleInvite = () => {
    if (!canInvite) return;
    setIsInvited(true);
    setShowInviteModal(true);
  };

  const closeInviteModal = () => {
    setShowInviteModal(false);
  };

  return (
    <>
      <div className="bg-gray-800 rounded-xl border border-gray-700 hover:border-lime-400 hover:shadow-xl hover:shadow-lime-400/20 transition-all duration-300 overflow-hidden group">
        {/* 추천 배지 */}
        {isRecommended && (
          <div className="bg-gradient-to-r from-lime-400 to-emerald-400 px-4 py-2 flex items-center gap-2">
            <i className="ri-star-fill text-gray-900 text-sm"></i>
            <span className="text-sm font-semibold text-gray-900">추천 팀원</span>
          </div>
        )}

        <div className="p-6">
          {/* 프로필 헤더 */}
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-16 h-16 flex items-center justify-center bg-gradient-to-br ${roleInfo.color} rounded-xl flex-shrink-0 overflow-hidden bg-white/5`}>
              <img 
                src={userIcon}
                alt={user.name}
                className="w-full h-full object-contain p-2"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-white truncate">
                  {user.name}
                </h3>
                {user.isNewbie && (
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full whitespace-nowrap">
                    🌱 새싹
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <i className={`${roleInfo.icon} text-base`}></i>
                <span>{roleInfo.label}</span>
              </div>
              {user.organization && (
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <i className="ri-building-line"></i>
                  <span>{user.organization}</span>
                </div>
              )}
            </div>
          </div>

          {/* Dev Vibe */}
          {devVibe && (
            <div className="mb-4 p-3 bg-gradient-to-r from-lime-400/10 to-emerald-400/10 rounded-lg border border-lime-400/30">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-white">
                  {devVibe.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="px-2 py-0.5 bg-gray-700 rounded-full">
                    {devVibe.traits.planning}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-700 rounded-full">
                    {devVibe.traits.work}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-700 rounded-full">
                    {devVibe.traits.time}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 소개 */}
          {user.bio && (
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
              {user.bio}
            </p>
          )}

          {/* 프로젝트 경험 */}
          <div className="flex items-center gap-2 mb-4">
            <i className="ri-folder-line text-gray-500"></i>
            <span className="text-sm text-gray-400">
              프로젝트 경험: <span className="font-semibold text-white">{user.projectExperience}회</span>
            </span>
          </div>

          {/* GitHub */}
          {user.githubUsername && (
            <div className="flex items-center gap-2 mb-4">
              <i className="ri-github-fill text-gray-500"></i>
              <span className="text-sm text-gray-400">
                @{user.githubUsername}
              </span>
            </div>
          )}

          {/* 기술 스택 */}
          {user.techStacks.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">기술 스택</p>
              <div className="flex flex-wrap gap-2">
                {user.techStacks.slice(0, 4).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-gray-700 text-gray-300 text-xs font-medium rounded-md"
                  >
                    {tech}
                  </span>
                ))}
                {user.techStacks.length > 4 && (
                  <span className="px-2.5 py-1 bg-gray-700 text-gray-500 text-xs font-medium rounded-md">
                    +{user.techStacks.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 버튼 */}
          <div className="flex gap-2 pt-4 border-t border-gray-700">
            <button
              onClick={() => setShowDetail(true)}
              className="flex-1 px-4 py-2.5 bg-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              상세 보기
            </button>
            <button
              onClick={handleInvite}
              disabled={!canInvite || isInvited}
              className={`flex-1 px-4 py-2.5 font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                !canInvite
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : isInvited
                  ? 'bg-lime-400/20 text-lime-400'
                  : 'bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900 hover:from-lime-500 hover:to-emerald-500'
              }`}
            >
              {!canInvite ? '초대 불가' : isInvited ? '초대 완료' : '초대하기'}
            </button>
          </div>
        </div>
      </div>

      {/* 초대 완료 모달 */}
      {showInviteModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={closeInviteModal}
        >
          <div
            className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-gray-700 animate-[scale-in_0.2s_ease-out]"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'scale-in 0.2s ease-out'
            }}
          >
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-lime-400/20 rounded-full mx-auto mb-4">
                <i className="ri-check-line text-3xl text-lime-400"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                초대 완료!
              </h3>
              <p className="text-gray-400 mb-6">
                <span className="font-semibold text-white">{user.name}</span>님에게 초대를 보냈습니다
              </p>
              <button
                onClick={closeInviteModal}
                className="w-full px-6 py-3 bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900 font-semibold rounded-lg hover:from-lime-500 hover:to-emerald-500 transition-all cursor-pointer whitespace-nowrap"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 상세 모달 */}
      {showDetail && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setShowDetail(false)}
        >
          <div
            className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* 헤더 */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className={`w-20 h-20 flex items-center justify-center bg-gradient-to-br ${roleInfo.color} rounded-xl overflow-hidden bg-white/5`}>
                    <img 
                      src={userIcon}
                      alt={user.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-white">
                        {user.name}
                      </h2>
                      {user.isNewbie && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full whitespace-nowrap">
                          🌱 새싹
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <i className={`${roleInfo.icon} text-lg`}></i>
                      <span className="font-medium">{roleInfo.label}</span>
                    </div>
                    {user.organization && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <i className="ri-building-line"></i>
                        <span>{user.organization}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowDetail(false)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl text-gray-400"></i>
                </button>
              </div>

              {/* Dev Vibe 상세 */}
              {devVibe && (
                <div className="mb-6 p-4 bg-gradient-to-r from-lime-400/10 to-emerald-400/10 rounded-xl border border-lime-400/30">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-white">
                      {devVibe.title}
                    </h3>
                    <p className="text-sm text-gray-400">{devVibe.code}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm font-medium rounded-full">
                      {devVibe.traits.planning}
                    </span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm font-medium rounded-full">
                      {devVibe.traits.work}
                    </span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm font-medium rounded-full">
                      {devVibe.traits.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                    {devVibe.description.split('\\n\\n')[0]}
                  </p>
                </div>
              )}

              {/* 소개 */}
              {user.bio && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-white mb-2">소개</h3>
                  <p className="text-gray-300 leading-relaxed">{user.bio}</p>
                </div>
              )}

              {/* 정보 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <i className="ri-folder-line"></i>
                    <span className="text-sm font-medium">프로젝트 경험</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{user.projectExperience}회</p>
                </div>
                {user.githubUsername && (
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <i className="ri-github-fill"></i>
                      <span className="text-sm font-medium">GitHub</span>
                    </div>
                    <p className="text-lg font-semibold text-white">@{user.githubUsername}</p>
                  </div>
                )}
              </div>

              {/* 기술 스택 */}
              {user.techStacks.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-white mb-3">기술 스택</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.techStacks.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gray-700 text-gray-300 text-sm font-medium rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 초대 버튼 */}
              <button
                onClick={handleInvite}
                disabled={!canInvite || isInvited}
                className={`w-full px-6 py-3 font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  !canInvite
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : isInvited
                    ? 'bg-lime-400/20 text-lime-400'
                    : 'bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900 hover:from-lime-500 hover:to-emerald-500'
                }`}
              >
                {!canInvite ? '팀장만 초대할 수 있습니다' : isInvited ? '초대 완료' : '초대하기'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default UserCard;
