import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import IntroSection from './components/IntroSection';
import FeaturesSection from './components/FeaturesSection';
import AdditionalFeaturesSection from './components/AdditionalFeaturesSection';
import MatchingEngineSection from './components/MatchingEngineSection';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy-900">
      <HeroSection />
      <ProblemSection />
      <IntroSection />
      <SolutionSection />
      <FeaturesSection />
      <MatchingEngineSection />
      <AdditionalFeaturesSection />
      <Footer />
    </div>
  );
}
