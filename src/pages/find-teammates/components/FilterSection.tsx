import { users } from '../../../mocks/users';

interface FilterSectionProps {
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  selectedTechStack: string;
  setSelectedTechStack: (tech: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FilterSection = ({
  selectedRole,
  setSelectedRole,
  selectedTechStack,
  setSelectedTechStack,
  searchQuery,
  setSearchQuery
}: FilterSectionProps) => {
  return (
    <div className="mb-12 p-6 bg-gray-800 rounded-xl border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-lime-400 to-emerald-400 rounded-lg">
          <i className="ri-filter-3-line text-xl text-gray-900"></i>
        </div>
        <h2 className="text-xl font-bold text-white">필터</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 역할 필터 */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            역할
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent cursor-pointer"
          >
            <option value="all">전체</option>
            <option value="developer">개발자</option>
            <option value="designer">디자이너</option>
            <option value="planner">기획자</option>
          </select>
        </div>

        {/* 기술 스택 필터 */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            기술 스택
          </label>
          <select
            value={selectedTechStack}
            onChange={(e) => setSelectedTechStack(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent cursor-pointer"
          >
            <option value="all">전체</option>
            <option value="React">React</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Node.js">Node.js</option>
            <option value="Python">Python</option>
            <option value="Figma">Figma</option>
            <option value="Photoshop">Photoshop</option>
          </select>
        </div>

        {/* 검색 */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            이름 검색
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full px-4 py-2.5 pl-10 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
            />
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
