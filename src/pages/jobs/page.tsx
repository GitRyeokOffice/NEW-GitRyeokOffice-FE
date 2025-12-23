import { useState, useEffect } from 'react';
import { jobs } from '../../mocks/jobs';
import { users } from '../../mocks/users';
import { devVibeTypes } from '../../mocks/devVibes';
import JobCard from './components/JobCard';
import CreateJobButton from './components/CreateJobButton';
import ApplyModal from './components/ApplyModal';
import { Job } from '../../mocks/jobs';
import { User } from '../../mocks/users';

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState<'recommended' | 'all'>('recommended');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
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
  
  // 현재 유저의 Dev Vibe 정보 가져오기
  const currentUserDevVibe = currentUser?.devVibeCode ? devVibeTypes[currentUser.devVibeCode] : null;
  const currentUserDevVibeName = currentUserDevVibe ? currentUserDevVibe.title : '';

  // 추천 공고 (현재 유저의 Dev Vibe와 매칭)
  const recommendedJobs = currentUser
    ? jobs
        .filter(job => {
          if (!currentUserDevVibeName) return false;
          return job.preferredVibes.some(vibe => vibe.includes(currentUserDevVibeName));
        })
        .slice(0, 6)
    : [];

  // 전체 공고 (생성순 - 최신순)
  const allJobs = [...jobs].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsApplyModalOpen(false);
    setTimeout(() => setSelectedJob(null), 300);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">공고 찾기</h1>
              <p className="text-sm text-gray-400">나와 맞는 팀 프로젝트를 찾아보세요</p>
            </div>
            <CreateJobButton />
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('recommended')}
              className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'recommended'
                  ? 'border-lime-400 text-lime-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              추천 공고
              <span className="ml-2 text-xs bg-gray-800 px-2 py-1 rounded-full">
                {recommendedJobs.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'all'
                  ? 'border-lime-400 text-lime-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              전체 공고
              <span className="ml-2 text-xs bg-gray-800 px-2 py-1 rounded-full">
                {allJobs.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'recommended' && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-1">
                당신의 Dev Vibe와 잘 맞는 공고예요
              </h2>
              <p className="text-sm text-gray-400">
                공고 생성자가 선호하는 유형과 매칭되는 프로젝트입니다
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedJobs.map(job => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  isRecommended 
                  onClick={() => handleJobClick(job)}
                />
              ))}
            </div>
            {recommendedJobs.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <i className="ri-search-line text-4xl text-gray-600"></i>
                </div>
                <p className="text-gray-500 text-sm">추천 공고가 없습니다</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'all' && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-1">
                모든 공고
              </h2>
              <p className="text-sm text-gray-400">
                최신 등록순으로 정렬되어 있습니다
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allJobs.map(job => (
                <JobCard 
                  key={job.id} 
                  job={job}
                  onClick={() => handleJobClick(job)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Create Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button className="w-14 h-14 bg-lime-400 text-gray-900 rounded-full shadow-lg flex items-center justify-center hover:bg-lime-300 transition-colors cursor-pointer">
          <i className="ri-add-line text-2xl"></i>
        </button>
      </div>

      {/* Apply Modal */}
      {selectedJob && (
        <ApplyModal
          job={selectedJob}
          isOpen={isApplyModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}