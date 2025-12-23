
import { Job } from '../../../mocks/jobs';

interface JobCardProps {
  job: Job;
  isRecommended?: boolean;
  onClick?: () => void;
}

export default function JobCard({ job, isRecommended, onClick }: JobCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-lg hover:shadow-lime-400/10 transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {isRecommended && (
              <span className="text-xs bg-lime-400/20 text-lime-400 px-2 py-1 rounded-md font-medium whitespace-nowrap">
                추천
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold text-white group-hover:text-lime-400 transition-colors line-clamp-2">
            {job.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Creator Info */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img 
            src="https://static.readdy.ai/image/acf8fc365223a7d2bd60db95c29d6240/898ae36fcd7ef66311cd7567104e6f57.png" 
            alt={job.creatorName}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{job.creatorName}</p>
          <p className="text-xs text-gray-400">
            {job.creatorRole}
            {job.creatorDevVibe && ` · ${job.creatorDevVibe}`}
          </p>
        </div>
      </div>

      {/* Required Roles */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">모집 직무</p>
        <div className="flex flex-wrap gap-2">
          {job.requiredRoles.map(role => (
            <span
              key={role}
              className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full whitespace-nowrap"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      {job.techStack.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">기술 스택</p>
          <div className="flex flex-wrap gap-2">
            {job.techStack.slice(0, 3).map(tech => (
              <span
                key={tech}
                className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
            {job.techStack.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1 whitespace-nowrap">
                +{job.techStack.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Preferred Vibes */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">선호 유형</p>
        <div className="flex flex-wrap gap-2">
          {job.preferredVibes.map(vibe => (
            <span
              key={vibe}
              className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full whitespace-nowrap"
            >
              {vibe}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 text-xs text-gray-400 pt-4 border-t border-gray-700">
        <div className="flex items-center gap-1">
          <i className="ri-team-line"></i>
          <span>{job.currentMembers}/{job.teamSize}명</span>
        </div>
        <div className="flex items-center gap-1">
          <i className="ri-time-line"></i>
          <span>{job.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <i className="ri-bookmark-line"></i>
          <span>{job.projectType}</span>
        </div>
      </div>
    </div>
  );
}
