import { motion } from 'framer-motion';

export default function IntroSection() {
  return (
    <section id="intro" className="py-32 bg-gradient-to-b from-[#F7F5F2] to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            당신의 협업 스타일을 발견하세요
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            GitHub 데이터를 AI가 분석하여 당신만의 Dev Vibe를 생성합니다
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Card 2 - Communication Style */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=github%20commit%20graph%20contribution%20activity%20chart%20green%20squares%20grid%20pattern%20dark%20interface%20code%20statistics%20developer%20dashboard%20clean%20modern%20minimal&width=600&height=800&seq=intro-card-002&orientation=portrait')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/50 to-transparent"></div>
            <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[400px]">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900/80 backdrop-blur-sm rounded-full border border-white/20 self-start">
                <div className="w-6 h-6 flex items-center justify-center overflow-hidden rounded-full">
                  <img 
                    src="https://static.readdy.ai/image/acf8fc365223a7d2bd60db95c29d6240/898ae36fcd7ef66311cd7567104e6f57.png" 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm text-white font-semibold">소통 스타일</span>
              </div>
              <div className="bg-navy-900/80 backdrop-blur-md rounded-2xl p-6">
                <p className="text-white text-lg font-semibold">
                  PR 코멘트 빈도로 소통 성향 파악
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}