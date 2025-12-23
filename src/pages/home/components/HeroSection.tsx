import { motion } from 'framer-motion';
import { devVibeTypes } from '../../../mocks/devVibes';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900"></div>
      
      {/* Abstract Code Pattern Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=abstract%20minimalist%20code%20pattern%20digital%20grid%20lines%20geometric%20shapes%20dark%20background%20technology%20network%20visualization%20clean%20modern%20design%20subtle%20gradient%20overlay&width=1920&height=1080&seq=hero-bg-001&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            >
              <span className="text-2xl">🤖</span>
              <span className="text-sm text-gray-300">AI 기반 협업 스타일 분석</span>
            </motion.div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight font-sans">
                해커톤 팀원 찾기,
              </h1>
              <h1 className="text-6xl md:text-7xl font-bold text-neon-green leading-tight font-sans">
                이제는 데이터로 증명하세요
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
              GitHub 활동 패턴을 AI가 분석해 당신의 Dev Vibe를 발급합니다
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="/jobs"
                className="px-8 py-4 bg-neon-green text-navy-900 rounded-full font-semibold text-lg hover:bg-neon-green/90 transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg shadow-neon-green/30"
              >
                공고 둘러보기
              </a>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative flex items-center justify-center">
              {/* Card 1 - 차분한 설계자 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-8 top-0 w-72 h-96 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl transform rotate-[-8deg] z-[1]"
              >
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 flex items-center justify-center bg-neon-green/20 rounded-2xl mb-4 overflow-hidden bg-white/5">
                    <img 
                      src={devVibeTypes['P-S-M'].icon} 
                      alt="차분한 설계자"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">차분한 설계자</h3>
                  <p className="text-gray-400 text-sm mb-4">P-S-M</p>
                  <div className="flex-1 flex items-end">
                    <div className="w-full h-32 bg-gradient-to-t from-neon-green/30 to-transparent rounded-lg"></div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 - 번뜩이는 개척자 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="relative z-[2] w-72 h-96 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl border border-white/30 p-6 shadow-2xl"
              >
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 flex items-center justify-center bg-purple-500/20 rounded-2xl mb-4 overflow-hidden bg-white/5">
                    <img 
                      src={devVibeTypes['I-F-M'].icon} 
                      alt="번뜩이는 개척자"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">번뜩이는 개척자</h3>
                  <p className="text-gray-400 text-sm mb-4">I-F-M</p>
                  <div className="flex-1 flex items-end">
                    <div className="w-full space-y-2">
                      <div className="h-2 bg-purple-500/40 rounded-full w-full"></div>
                      <div className="h-2 bg-purple-500/40 rounded-full w-4/5"></div>
                      <div className="h-2 bg-purple-500/40 rounded-full w-3/5"></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 - 은밀한 해결사 */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-8 bottom-0 w-72 h-96 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl transform rotate-[8deg] z-[3]"
              >
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 flex items-center justify-center bg-orange-500/20 rounded-2xl mb-4 overflow-hidden bg-white/5">
                    <img 
                      src={devVibeTypes['I-F-N'].icon} 
                      alt="은밀한 해결사"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">은밀한 해결사</h3>
                  <p className="text-gray-400 text-sm mb-4">I-F-N</p>
                  <div className="flex-1 flex items-end">
                    <div className="w-full h-40 flex items-end gap-1">
                      {[20, 40, 80, 100, 60, 30].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-orange-500/40 to-transparent rounded-t"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <i className="ri-arrow-down-line text-3xl text-gray-400"></i>
      </motion.div>
    </section>
  );
}
