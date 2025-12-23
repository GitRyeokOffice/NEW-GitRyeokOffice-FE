import { motion } from 'framer-motion';

export default function AdditionalFeaturesSection() {
  const githubData = [
    { icon: '🌱', label: '잔디 패턴', description: '날짜별 커밋 활동 분석' },
    { icon: '🔀', label: 'PR 머지 횟수', description: '협업 참여도 측정' },
    { icon: '💬', label: '코멘트 횟수', description: '소통 빈도 파악' },
    { icon: '📊', label: '활동 분포', description: '커밋/리뷰/이슈/PR 비율' },
    { icon: '🕐', label: '커밋 시간대', description: '작업 시간 패턴 분석' },
    { icon: '🏷️', label: '사용 언어', description: '기술 스택 파악' },
  ];

  const userInputData = [
    { icon: '🎯', label: '프로젝트 경험', description: '참여한 프로젝트 횟수' },
    { icon: '⚙️', label: '기술 스택', description: '보유한 개발 스킬' },
    { icon: '🏢', label: '소속 정보', description: '학교 또는 회사 (선택)' },
  ];

  return (
    <section id="additional" className="py-32 bg-navy-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 backdrop-blur-sm rounded-full border border-orange-500/30 mb-6">
            <span className="text-sm text-orange-400 font-semibold">추가 기능</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            데이터 수집 및 분석
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            GitHub API와 사용자 입력을 결합하여 정확한 협업 스타일을 도출합니다
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* GitHub Data */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 flex items-center justify-center bg-neon-green/20 rounded-2xl">
                  <i className="ri-github-fill text-3xl text-neon-green"></i>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">GitHub 데이터</h3>
                  <p className="text-gray-400">최근 1년간의 활동 패턴</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {githubData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-neon-green/10 rounded-xl mb-3">
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                    <h4 className="text-white font-semibold mb-1">{item.label}</h4>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* User Input Data */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-8 border border-purple-500/20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 flex items-center justify-center bg-purple-500/20 rounded-2xl">
                  <i className="ri-user-settings-line text-3xl text-purple-400"></i>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">사용자 입력</h3>
                  <p className="text-gray-400">가입 시 설문 정보</p>
                </div>
              </div>

              <div className="space-y-4">
                {userInputData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 flex items-center justify-center bg-purple-500/20 rounded-xl flex-shrink-0">
                        <span className="text-3xl">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg mb-1">{item.label}</h4>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Comment Feature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-r from-neon-green/10 to-blue-500/10 rounded-3xl p-10 border border-neon-green/20"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 flex items-center justify-center bg-neon-green/20 rounded-2xl flex-shrink-0">
              <i className="ri-chat-3-line text-4xl text-neon-green"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-3">공고 댓글 기능</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                공고에 직접 댓글을 남겨 질문하고 소통할 수 있습니다. 팀 분위기를 미리 파악하고 궁금한 점을 해결하세요.
              </p>
            </div>
            <button className="px-8 py-4 bg-neon-green text-navy-900 rounded-full font-semibold hover:bg-neon-green/90 transition-all duration-300 cursor-pointer whitespace-nowrap">
              자세히 보기
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}