
import { useState } from 'react';
import { motion } from 'framer-motion';
import { devVibeTypes, DevVibeType } from '../../mocks/devVibes';

export default function DevVibePage() {
  const [selectedVibe, setSelectedVibe] = useState<DevVibeType | null>(null);
  
  // NEWBIE를 제외한 8개의 유형만 가져오기
  const vibeTypes = Object.values(devVibeTypes).filter(vibe => vibe.code !== 'NEWBIE');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-400/10 backdrop-blur-sm rounded-full border border-lime-400/30 mb-6">
              <span className="text-sm text-lime-400 font-semibold">8가지 개발자 유형</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
              Dev Vibe
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              당신의 개발 스타일은 무엇인가요?<br />
              접근 방식, 작업 리듬, 활동 시간대로 분류된 8가지 개발자 유형을 확인해보세요
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dev Vibe Cards */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vibeTypes.map((vibe, index) => (
              <motion.div
                key={vibe.code}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedVibe(vibe)}
                className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-lime-400/50 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-full aspect-square mb-4 rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center">
                    <img 
                      src={vibe.icon} 
                      alt={vibe.title}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  
                  {/* Title */}
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-white">{vibe.title}</h3>
                  </div>
                  
                  {/* Code */}
                  <div className="inline-block px-3 py-1 bg-lime-400/20 rounded-full mb-4">
                    <span className="text-xs font-mono text-lime-400">{vibe.code}</span>
                  </div>
                  
                  {/* Traits */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-lime-400"></div>
                      <span className="text-sm text-gray-300">{vibe.traits.planning}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span className="text-sm text-gray-300">{vibe.traits.work}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                      <span className="text-sm text-gray-300">{vibe.traits.time}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {vibe.description.split('\n\n')[0]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 bg-gradient-to-r from-lime-400/10 to-emerald-500/10 rounded-3xl p-8 border border-lime-400/20 text-center"
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              나의 Dev Vibe는?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              GitHub 계정을 연동하여 당신의 개발 스타일을 분석하고<br />
              나에게 맞는 Dev Vibe 유형을 확인해보세요
            </p>
            <button className="px-8 py-4 bg-lime-400 text-gray-900 rounded-full font-semibold hover:bg-lime-300 transition-all duration-300 cursor-pointer whitespace-nowrap">
              내 Dev Vibe 확인하기
            </button>
          </motion.div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedVibe && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedVibe(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl max-w-2xl w-full border border-lime-400/30 shadow-2xl shadow-lime-400/20 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-8 pb-6">
              <button
                onClick={() => setSelectedVibe(null)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-2xl text-gray-400"></i>
              </button>
              
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center border border-white/10">
                  <img 
                    src={selectedVibe.icon} 
                    alt={selectedVibe.title}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                
                <div className="flex-1">
                  {/* Title */}
                  <h2 className="text-3xl font-bold text-white mb-3">
                    {selectedVibe.title}
                  </h2>
                  
                  {/* Code */}
                  <div className="inline-block px-4 py-1.5 bg-lime-400/20 rounded-full mb-4">
                    <span className="text-sm font-mono text-lime-400 font-semibold">{selectedVibe.code}</span>
                  </div>
                  
                  {/* Traits */}
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-lime-400"></div>
                      <span className="text-sm text-gray-300 font-medium">{selectedVibe.traits.planning}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span className="text-sm text-gray-300 font-medium">{selectedVibe.traits.work}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                      <span className="text-sm text-gray-300 font-medium">{selectedVibe.traits.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="px-8 pb-8">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">특징</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {selectedVibe.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
