
import { useState, useMemo, useEffect } from 'react';
import UserCard from './components/UserCard';
import FilterSection from './components/FilterSection';
import { users } from '../../mocks/users';
import { jobs } from '../../mocks/jobs';
import { devVibeTypes } from '../../mocks/devVibes';
import { User } from '../../mocks/users';

const FindTeammatesPage = () => {
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedTechStack, setSelectedTechStack] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
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
  
  // 현재 유저가 올린 공고 찾기
  const userJob = currentUser ? jobs.find(job => job.creatorName === currentUser.name) : undefined;
  
  // 공고를 올렸는지 여부
  const hasPostedJob = !!userJob;
  
  // 팀장인지 여부 (팀장만 팀원 초대 가능)
  const canInvite = currentUser?.isTeamLeader ?? false;
  
  // 추천 팀원 계산 (공고의 기술 스택과 선호 Dev Vibe 기반)
  const recommendedUsers = useMemo(() => {
    if (!userJob || !currentUser) return [];
    
    return users
      .filter(user => user.id !== currentUser.id)
      .map(user => {
        let score = 0;
        
        // 기술 스택 매칭 점수
        const matchingTechStacks = user.techStacks.filter(tech => 
          userJob.techStack.includes(tech)
        );
        score += matchingTechStacks.length * 10;
        
        // Dev Vibe 매칭 점수
        if (user.devVibeCode && userJob.preferredVibes) {
          const userDevVibe = devVibeTypes[user.devVibeCode];
          if (userDevVibe) {
            const vibeMatch = userJob.preferredVibes.some(vibe => 
              vibe.includes(userDevVibe.emoji)
            );
            if (vibeMatch) score += 20;
          }
        }
        
        // 역할 매칭 점수
        const roleMap: Record<string, string> = {
          'developer': '개발자',
          'designer': '디자이너',
          'planner': '기획자'
        };
        if (userJob.requiredRoles.includes(roleMap[user.role])) {
          score += 15;
        }
        
        return { user, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.user);
  }, [userJob, currentUser]);
  
  // 전체 유저 필터링
  const filteredUsers = useMemo(() => {
    if (!currentUser) return [];
    
    return users
      .filter(user => user.id !== currentUser.id)
      .filter(user => {
        if (selectedRole !== 'all' && user.role !== selectedRole) return false;
        if (selectedTechStack !== 'all' && !user.techStacks.includes(selectedTechStack)) return false;
        if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
      });
  }, [selectedRole, selectedTechStack, searchQuery, currentUser]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 헤더 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            팀원 찾기
          </h1>
          <p className="text-lg text-gray-300">
            {hasPostedJob 
              ? '프로젝트에 맞는 최적의 팀원을 찾아보세요' 
              : '다양한 팀원들을 만나보세요'}
          </p>
        </div>
        
        {/* 추천 팀원 섹션 */}
        {hasPostedJob && recommendedUsers.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-lime-400 to-emerald-400 rounded-lg">
                <i className="ri-star-line text-xl text-gray-900"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  추천 팀원
                </h2>
                <p className="text-sm text-gray-400">
                  {userJob.title}에 적합한 팀원입니다
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map(user => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  canInvite={canInvite}
                  isRecommended={true}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* 필터 섹션 */}
        <FilterSection
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          selectedTechStack={selectedTechStack}
          setSelectedTechStack={setSelectedTechStack}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        {/* 전체 팀원 섹션 */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-lime-400 to-emerald-400 rounded-lg">
              <i className="ri-team-line text-xl text-gray-900"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                전체 팀원
              </h2>
              <p className="text-sm text-gray-400">
                {filteredUsers.length}명의 팀원
              </p>
            </div>
          </div>
          
          {filteredUsers.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 flex items-center justify-center bg-gray-800 rounded-full mx-auto mb-4">
                <i className="ri-user-search-line text-4xl text-gray-500"></i>
              </div>
              <p className="text-lg text-gray-400">
                조건에 맞는 팀원이 없습니다
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map(user => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  canInvite={canInvite}
                  isRecommended={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindTeammatesPage;
