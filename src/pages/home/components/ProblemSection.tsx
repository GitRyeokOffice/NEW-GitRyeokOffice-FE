import { motion } from 'framer-motion';

export default function ProblemSection() {
  const problems = [
    {
      icon: '🔍',
      title: '비효율적인 탐색',
      description: '에브리타임, 카톡방, 디스코드를 전전하며 팀원을 찾아야 하는 소모적인 과정',
    },
    {
      icon: '❓',
      title: '정보 불균형',
      description: '개발 스택과 실력이 맞는지, 협업 스타일이 맞는지 알 수 없음',
    },
    {
      icon: '💔',
      title: '팀 와해 위험',
      description: '실력 편차와 작업 스타일 차이로 인한 중도 이탈 발생',
    },
  ];

  return (
    <section id="problem" className="py-32 bg-navy-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 backdrop-blur-sm rounded-full border border-red-500/20 mb-6">
            <span className="text-sm text-red-400 font-semibold">문제 정의</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-sans font-bold text-white mb-6">
            해커톤 팀 빌딩,<br />왜 이렇게 어려울까요?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            교내외 해커톤·공모전·대회는 많아졌지만, 사람을 구하는 과정은 여전히 비효율적입니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-neon-green/50 transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-2xl mb-6">
                <span className="text-4xl">{problem.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{problem.title}</h3>
              <p className="text-gray-400 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-neon-green/10 backdrop-blur-sm rounded-full border border-neon-green/30">
            <i className="ri-arrow-down-line text-2xl text-neon-green"></i>
            <span className="text-lg text-neon-green font-semibold">우리는 이 문제를 데이터로 해결합니다</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}