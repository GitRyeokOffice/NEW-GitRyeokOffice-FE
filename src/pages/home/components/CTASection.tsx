import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="relative py-40 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=hackathon%20team%20collaboration%20developers%20working%20together%20coding%20laptops%20modern%20workspace%20teamwork%20programming%20meeting%20brainstorming%20creative%20environment%20professional%20technology&width=1920&height=1080&seq=cta-bg-001&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          objectFit: 'cover',
        }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-navy-900/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left - Title */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              지금 바로
            </h2>
            <div className="space-y-3">
              <p className="text-4xl md:text-5xl font-serif text-white">
                완벽한 팀원을 만나보세요
              </p>
              <p className="text-xl text-gray-300">
                데이터가 증명하는 협업 궁합
              </p>
            </div>
          </motion.div>

          {/* Right - CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <button className="group flex items-center gap-4 px-10 py-6 bg-white rounded-full hover:bg-neon-green transition-all duration-300 cursor-pointer shadow-2xl">
              <span className="text-navy-900 font-bold text-xl whitespace-nowrap">
                GitHub 연동하고 시작하기
              </span>
              <div className="w-12 h-12 flex items-center justify-center bg-navy-900 rounded-full group-hover:bg-white transition-all duration-300">
                <i className="ri-arrow-right-line text-2xl text-white group-hover:text-navy-900"></i>
              </div>
            </button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {[
            { number: '10,000+', label: '등록된 개발자' },
            { number: '5,000+', label: '성공한 매칭' },
            { number: '73%', label: '팀 와해율 감소' },
            { number: '4.9/5', label: '사용자 만족도' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-neon-green mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 text-lg">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}