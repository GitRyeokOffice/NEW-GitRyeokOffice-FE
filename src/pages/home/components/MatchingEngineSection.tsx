import { motion } from 'framer-motion';

export default function MatchingEngineSection() {
  return (
    <section id="matching" className="py-32 bg-gradient-to-b from-[#F7F5F2] to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 backdrop-blur-sm rounded-full border border-purple-500/30 mb-6">
            <span className="text-sm text-purple-600 font-semibold">매칭 엔진</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            하이브리드 매칭 시스템
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            개발자는 Push 방식으로, 비개발자는 Pull 방식으로 최적의 팀을 구성합니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Developer Track - Push */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-navy-800 rounded-3xl p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-neon-green/20 rounded-2xl">
                  <i className="ri-code-s-slash-line text-3xl text-neon-green"></i>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">개발자 트랙</h3>
                  <p className="text-neon-green font-semibold">Push 방식</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-neon-green/20 rounded-full flex-shrink-0 mt-1">
                    <span className="text-neon-green font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">조건 매칭</h4>
                    <p className="text-gray-400">기술 스택 + Target Vibe에 부합하는 개발자 추출</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-neon-green/20 rounded-full flex-shrink-0 mt-1">
                    <span className="text-neon-green font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">AI 추천</h4>
                    <p className="text-gray-400">알고리즘이 공고 작성자에게 리스트 추천</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-neon-green/20 rounded-full flex-shrink-0 mt-1">
                    <span className="text-neon-green font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">제안 발송</h4>
                    <p className="text-gray-400">추천된 개발자에게 합류 제안 (횟수 제한 없음)</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <i className="ri-rocket-line text-2xl text-neon-green"></i>
                  <p className="text-gray-400 text-sm">헤드헌팅 방식의 능동적 매칭</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Non-Developer Track - Pull */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-10 border border-purple-500/20 relative overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-purple-500/20 rounded-2xl">
                  <i className="ri-palette-line text-3xl text-purple-600"></i>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">비개발자 트랙</h3>
                  <p className="text-purple-600 font-semibold">Pull 방식</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-purple-500/20 rounded-full flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold text-lg mb-1">공고 검색</h4>
                    <p className="text-gray-600">직무/분야 필터를 통해 원하는 공고 탐색</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-purple-500/20 rounded-full flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold text-lg mb-1">직접 지원</h4>
                    <p className="text-gray-600">포트폴리오와 사용 툴을 첨부하여 지원</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-purple-500/20 rounded-full flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold text-lg mb-1">프로필 관리</h4>
                    <p className="text-gray-600">디자이너/기획자 전용 프로필 시스템</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-purple-500/20">
                <div className="flex items-center gap-3">
                  <i className="ri-search-line text-2xl text-purple-600"></i>
                  <p className="text-gray-600 text-sm">자유로운 공고 검색 및 지원</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Complementary Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gray-900 rounded-3xl p-10 text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="w-16 h-16 flex items-center justify-center bg-neon-green/20 rounded-2xl">
              <i className="ri-refresh-line text-3xl text-neon-green"></i>
            </div>
            <div className="text-left">
              <h4 className="text-2xl font-bold text-white mb-2">상호 보완 시스템</h4>
              <p className="text-gray-400 text-lg">
                매칭 추천을 받지 못했더라도, 모든 사용자는 공개된 공고를 검색하고 자유롭게 지원할 수 있습니다
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}