import { motion } from 'framer-motion';

export default function SolutionSection() {
  return (
    <section id="solution" className="py-32 bg-gradient-to-b from-white to-[#F7F5F2]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 backdrop-blur-sm rounded-full border border-neon-green/30 mb-6">
            <span className="text-sm text-neon-green font-semibold">솔루션 개요</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            데이터 기반의 신뢰 구축
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            GitHub 로그를 AI로 분석하여 협업 스타일을 정의한 Dev Vibe를 발급합니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <div 
                className="w-full h-[500px] rounded-3xl shadow-2xl"
                style={{
                  backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20developer%20workspace%20laptop%20coding%20github%20interface%20clean%20desk%20minimal%20setup%20natural%20light%20professional%20environment%20technology%20programming%20screen%20display&width=800&height=1000&seq=solution-visual-001&orientation=portrait')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  objectFit: 'cover',
                }}
              ></div>
              
              {/* Overlay Labels */}
              <div className="absolute top-6 left-6 flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                  <span className="text-sm font-semibold text-navy-900">🤖 AI 추천</span>
                </div>
                <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                  <span className="text-sm font-semibold text-navy-900">⚡ 실시간 매칭</span>
                </div>
                <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                  <span className="text-sm font-semibold text-navy-900">🌱 새싹 환영</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                공고 등록하면,<br />
                AI가 팀원을 찾아드립니다
              </h3>
            </div>

            <div className="bg-[#0D1117] rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-neon-green/20 rounded-lg">
                  <span className="text-xl">🎯</span>
                </div>
                <span className="text-neon-green font-semibold">Target Vibe</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-neon-green/20 rounded-full flex-shrink-0 mt-1">
                    <span className="text-neon-green font-bold">1</span>
                  </div>
                  <p className="text-white text-lg">원하는 협업 스타일 선택</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-neon-green/20 rounded-full flex-shrink-0 mt-1">
                    <span className="text-neon-green font-bold">2</span>
                  </div>
                  <p className="text-white text-lg">시스템이 자동 추천</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-neon-green/20 rounded-full flex-shrink-0 mt-1">
                    <span className="text-neon-green font-bold">3</span>
                  </div>
                  <p className="text-white text-lg">합류 제안 발송</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <i className="ri-lightbulb-flash-line text-2xl text-neon-green"></i>
                  <p className="text-gray-400 text-sm">
                    말뿐인 자기소개가 아닌 데이터로 증명된 팀원을 매칭합니다
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}