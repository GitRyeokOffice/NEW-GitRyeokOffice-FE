import { motion } from 'framer-motion';

export default function FeaturesSection() {
  const features = [
    {
      icon: '📋',
      title: '접근 방식 분석',
      subtitle: 'Plan vs Improvisation',
      description: '커밋 패턴과 브랜치 전략을 분석하여 계획형인지 즉흥형인지 파악합니다',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: '⚡',
      title: '작업 리듬 분석',
      subtitle: 'Steady vs Focus',
      description: '커밋 빈도와 간격을 분석하여 지속형인지 몰입형인지 판단합니다',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: '🌙',
      title: '활동 시간대 분석',
      subtitle: 'Morning vs Night',
      description: '커밋 시간대를 분석하여 아침형 인간인지 저녁형 인간인지 파악합니다',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: '🌱',
      title: '숙련도 레벨링',
      subtitle: '새싹부터 거목까지',
      description: '프로젝트 경험 횟수와 기술 스택을 기반으로 개발자 레벨을 분류합니다',
      color: 'from-orange-400 to-red-500',
    },
  ];

  return (
    <section id="features" className="py-32 bg-navy-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 backdrop-blur-sm rounded-full border border-neon-green/30 mb-6">
            <span className="text-sm text-neon-green font-semibold">핵심 기능</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            Dev Vibe 분석 시스템
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            GitHub API를 연동하여 다각도로 협업 스타일을 분석합니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-neon-green/50 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 flex items-center justify-center bg-white/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-5xl">{feature.icon}</span>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-neon-green text-lg font-semibold mb-4">{feature.subtitle}</p>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-neon-green/10 to-purple-500/10 rounded-3xl p-8 border border-neon-green/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex items-center justify-center bg-neon-green/20 rounded-2xl">
                <i className="ri-shield-check-line text-3xl text-neon-green"></i>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-1">긍정적 성향 위주 분류</h4>
                <p className="text-gray-400">게으름, 불규칙함 등 부정적 키워드는 배제하고 강점 위주로 분석합니다</p>
              </div>
            </div>
            <button className="px-8 py-4 bg-neon-green text-navy-900 rounded-full font-semibold hover:bg-neon-green/90 transition-all duration-300 cursor-pointer whitespace-nowrap">
              내 Dev Vibe 확인하기
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}