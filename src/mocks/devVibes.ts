import ifmIcon from '@/assets/IFM.png';
import ifnIcon from '@/assets/IFN.png';
import psmIcon from '@/assets/PSM.png';
import psnIcon from '@/assets/PSN.png';
import pfmIcon from '@/assets/PFM.png';
import pfnIcon from '@/assets/PFN.png';
import ismIcon from '@/assets/ISM.png';
import isnIcon from '@/assets/ISN.png';
import newbieIcon from '@/assets/NEWBIE.png';

export interface DevVibeType {
  code: string;
  title: string;
  emoji: string;
  icon: string;
  traits: {
    planning: string;
    work: string;
    time: string;
  };
  description: string;
}

export const devVibeTypes: Record<string, DevVibeType> = {
  'P-S-M': {
    code: 'P-S-M',
    title: '차분한 설계자',
    emoji: '🐜',
    icon: psmIcon,
    traits: {
      planning: '계획형',
      work: '혼자',
      time: '아침형'
    },
    description: '체계적인 계획과 독립적인 작업을 선호하는 개발자입니다.\n\n세밀한 설계를 통해 안정적인 코드를 작성하며, 혼자서도 높은 집중력을 발휘합니다.'
  },
  'P-S-N': {
    code: 'P-S-N',
    title: '고요한 축적가',
    emoji: '🦫',
    icon: psnIcon,
    traits: {
      planning: '계획형',
      work: '혼자',
      time: '저녁형'
    },
    description: '계획적이고 독립적으로 야간에 집중하는 개발자입니다.\n\n조용한 밤 시간에 깊이 있는 작업을 통해 견고한 결과물을 만들어냅니다.'
  },
  'P-F-M': {
    code: 'P-F-M',
    title: '집요한 분석가',
    emoji: '🦅',
    icon: pfmIcon,
    traits: {
      planning: '계획형',
      work: '함께',
      time: '아침형'
    },
    description: '체계적인 계획과 팀워크를 중시하는 개발자입니다.\n\n명확한 목표 설정과 협업을 통해 프로젝트를 성공으로 이끕니다.'
  },
  'P-F-N': {
    code: 'P-F-N',
    title: '냉철한 전략가',
    emoji: '🦉',
    icon: pfnIcon,
    traits: {
      planning: '계획형',
      work: '함께',
      time: '저녁형'
    },
    description: '전략적 사고와 협업을 통해 야간에 최고의 성과를 내는 개발자입니다.\n\n치밀한 계획과 팀원들과의 소통으로 복잡한 문제를 해결합니다.'
  },
  'I-S-M': {
    code: 'I-S-M',
    title: '유연한 항해자',
    emoji: '🐿️',
    icon: ismIcon,
    traits: {
      planning: '즉흥형',
      work: '혼자',
      time: '아침형'
    },
    description: '유연한 사고로 독립적으로 아침에 활동하는 개발자입니다.\n\n빠른 적응력과 창의적인 문제 해결 능력을 가지고 있습니다.'
  },
  'I-S-N': {
    code: 'I-S-N',
    title: '느긋한 반복자',
    emoji: '🐱',
    icon: isnIcon,
    traits: {
      planning: '즉흥형',
      work: '혼자',
      time: '저녁형'
    },
    description: '자유로운 스타일로 독립적으로 야간에 작업하는 개발자입니다.\n\n편안한 환경에서 자신만의 페이스로 꾸준히 발전합니다.'
  },
  'I-F-M': {
    code: 'I-F-M',
    title: '번뜩이는 개척자',
    emoji: '🐎',
    icon: ifmIcon,
    traits: {
      planning: '즉흥형',
      work: '함께',
      time: '아침형'
    },
    description: '창의적이고 협업을 즐기며 아침에 활발한 개발자입니다.\n\n새로운 아이디어와 팀워크로 혁신적인 솔루션을 만들어냅니다.'
  },
  'I-F-N': {
    code: 'I-F-N',
    title: '은밀한 해결사',
    emoji: '🐆',
    icon: ifnIcon,
    traits: {
      planning: '즉흥형',
      work: '함께',
      time: '저녁형'
    },
    description: '빠른 판단력과 팀워크로 야간에 문제를 해결하는 개발자입니다.\n\n순발력 있는 대응과 협업으로 긴급한 이슈를 처리합니다.'
  },
  NEWBIE: {
    code: 'NEWBIE',
    title: '새싹 개발자',
    emoji: '🌱',
    icon: newbieIcon,
    traits: {
      planning: '성장중',
      work: '배우는중',
      time: '언제나'
    },
    description: '열정적으로 성장하고 있는 신입 개발자입니다.\n\n끊임없는 학습과 도전으로 빠르게 발전하고 있습니다.'
  }
};

export const getDevVibeByCode = (code: string): DevVibeType | undefined => {
  return devVibeTypes[code];
};
