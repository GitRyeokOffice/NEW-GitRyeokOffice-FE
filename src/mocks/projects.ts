export interface ProjectMember {
  userId: string;
  userName: string;
  role: string;
  joinedAt: string;
  profileImage?: string;
}

export interface ProjectPost {
  id: string;
  projectId: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  isNotice: boolean;
  createdAt: string;
  views: number;
  comments: number;
}

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  ownerName: string;
  maxMembers: number;
  currentMembers: ProjectMember[];
  techStack: string[];
  status: 'recruiting' | 'in-progress' | 'completed';
  createdAt: string;
}

export const mockProjects: Project[] = [
  {
    id: 'project-001',
    title: 'AI 기반 헬스케어 앱 개발',
    description: '건강 데이터를 분석하여 개인 맞춤형 운동 및 식단을 추천하는 AI 헬스케어 앱',
    ownerId: '1',
    ownerName: '김개발',
    maxMembers: 4,
    currentMembers: [
      {
        userId: '1',
        userName: '김개발',
        role: '팀장 / 풀스택 개발자',
        joinedAt: '2024-01-15T10:00:00Z'
      },
      {
        userId: '7',
        userName: '윤AI',
        role: 'AI/ML 엔지니어',
        joinedAt: '2024-01-16T14:30:00Z'
      },
      {
        userId: '4',
        userName: '최디자인',
        role: 'UI/UX 디자이너',
        joinedAt: '2024-01-17T09:15:00Z'
      }
    ],
    techStack: ['React Native', 'TensorFlow', 'Python', 'Firebase'],
    status: 'in-progress',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'project-002',
    title: '실시간 협업 화이트보드 서비스',
    description: '원격 팀을 위한 실시간 협업 화이트보드 웹 애플리케이션. 드로잉, 스티커 노트, 화상 회의 기능 포함',
    ownerId: '2',
    ownerName: '이프론트',
    maxMembers: 5,
    currentMembers: [
      {
        userId: '2',
        userName: '이프론트',
        role: '팀장 / 프론트엔드 개발자',
        joinedAt: '2024-02-01T09:00:00Z'
      },
      {
        userId: '1',
        userName: '김개발',
        role: '백엔드 개발자',
        joinedAt: '2024-02-02T10:30:00Z'
      },
      {
        userId: '4',
        userName: '최디자인',
        role: 'UI/UX 디자이너',
        joinedAt: '2024-02-03T14:00:00Z'
      },
      {
        userId: '8',
        userName: '한풀스택',
        role: '풀스택 개발자',
        joinedAt: '2024-02-04T11:20:00Z'
      }
    ],
    techStack: ['React', 'WebSocket', 'Node.js', 'Canvas API', 'WebRTC'],
    status: 'in-progress',
    createdAt: '2024-02-01T09:00:00Z'
  },
  {
    id: 'project-003',
    title: '스마트 가계부 앱',
    description: 'OCR 기술로 영수증을 자동 인식하고, AI가 소비 패턴을 분석하여 절약 팁을 제공하는 가계부 앱',
    ownerId: '7',
    ownerName: '윤AI',
    maxMembers: 3,
    currentMembers: [
      {
        userId: '7',
        userName: '윤AI',
        role: '팀장 / AI/ML 엔지니어',
        joinedAt: '2023-12-10T08:00:00Z'
      },
      {
        userId: '1',
        userName: '김개발',
        role: 'iOS 개발자',
        joinedAt: '2023-12-11T13:00:00Z'
      }
    ],
    techStack: ['Swift', 'SwiftUI', 'CoreML', 'Vision Framework'],
    status: 'recruiting',
    createdAt: '2023-12-10T08:00:00Z'
  }
];

export const mockProjectPosts: ProjectPost[] = [
  {
    id: 'post-001',
    projectId: 'project-001',
    authorId: '1',
    authorName: '김개발',
    title: '[공지사항] 프로젝트 킥오프 미팅 안내',
    content: '안녕하세요 팀원 여러분! 이번 주 금요일 오후 7시에 첫 번째 킥오프 미팅을 진행하려고 합니다. Zoom 링크는 별도로 공유드리겠습니다. 각자 맡은 역할과 일정에 대해 논의할 예정이니 참석 부탁드립니다!',
    isNotice: true,
    createdAt: '2024-01-15T11:00:00Z',
    views: 45,
    comments: 3
  },
  {
    id: 'post-002',
    projectId: 'project-001',
    authorId: '1',
    authorName: '김개발',
    title: '[공지사항] GitHub 레포지토리 생성 완료',
    content: '프로젝트 GitHub 레포지토리를 생성했습니다. 모든 팀원분들께 초대 메일을 보냈으니 확인 부탁드립니다. 브랜치 전략은 Git Flow를 따르며, 코드 리뷰는 필수입니다.',
    isNotice: true,
    createdAt: '2024-01-16T10:30:00Z',
    views: 38,
    comments: 5
  },
  {
    id: 'post-003',
    projectId: 'project-001',
    authorId: '7',
    authorName: '윤AI',
    title: 'AI 모델 학습 데이터셋 공유',
    content: '헬스케어 데이터셋을 정리했습니다. Google Drive에 업로드했으니 확인해주세요. 데이터 전처리 스크립트도 함께 공유드립니다.',
    isNotice: false,
    createdAt: '2024-01-17T14:20:00Z',
    views: 28,
    comments: 2
  },
  {
    id: 'post-004',
    projectId: 'project-001',
    authorId: '4',
    authorName: '최디자인',
    title: '초기 디자인 시안 공유',
    content: 'Figma에 첫 번째 디자인 시안을 업로드했습니다. 메인 화면과 운동 추천 화면 위주로 작업했어요. 피드백 부탁드립니다!',
    isNotice: false,
    createdAt: '2024-01-18T16:45:00Z',
    views: 32,
    comments: 7
  },
  {
    id: 'post-005',
    projectId: 'project-001',
    authorId: '1',
    authorName: '김개발',
    title: '[공지사항] 주간 스프린트 회의 일정',
    content: '매주 월요일 오후 8시에 주간 스프린트 회의를 진행합니다. 지난 주 진행 상황과 이번 주 목표를 공유하는 시간입니다. 참석 필수입니다!',
    isNotice: true,
    createdAt: '2024-01-19T09:00:00Z',
    views: 41,
    comments: 4
  },
  {
    id: 'post-006',
    projectId: 'project-001',
    authorId: '7',
    authorName: '윤AI',
    title: '운동 추천 알고리즘 1차 완성',
    content: '사용자의 건강 데이터를 기반으로 운동을 추천하는 알고리즘 1차 버전을 완성했습니다. 정확도는 약 78% 정도 나오고 있어요. 추가 학습이 필요할 것 같습니다.',
    isNotice: false,
    createdAt: '2024-01-20T11:30:00Z',
    views: 35,
    comments: 6
  },
  {
    id: 'post-007',
    projectId: 'project-001',
    authorId: '4',
    authorName: '최디자인',
    title: '디자인 시스템 가이드 작성',
    content: '프로젝트에서 사용할 컬러, 타이포그래피, 컴포넌트 가이드를 정리했습니다. Figma 파일에서 확인 가능합니다.',
    isNotice: false,
    createdAt: '2024-01-21T15:20:00Z',
    views: 26,
    comments: 3
  },
  {
    id: 'post-008',
    projectId: 'project-001',
    authorId: '1',
    authorName: '김개발',
    title: 'Firebase 설정 완료',
    content: 'Firebase 프로젝트 설정을 완료했습니다. Authentication, Firestore, Storage 모두 활성화했어요. 환경 변수 파일은 Slack으로 공유드렸습니다.',
    isNotice: false,
    createdAt: '2024-01-22T10:15:00Z',
    views: 30,
    comments: 2
  },
  {
    id: 'post-009',
    projectId: 'project-001',
    authorId: '1',
    authorName: '김개발',
    title: '[공지사항] 중간 점검 회의 안내',
    content: '프로젝트 시작 2주차를 맞아 중간 점검 회의를 진행합니다. 이번 주 금요일 오후 7시, 각자 진행 상황과 어려운 점을 공유해주세요.',
    isNotice: true,
    createdAt: '2024-01-23T09:30:00Z',
    views: 43,
    comments: 5
  },
  {
    id: 'post-010',
    projectId: 'project-001',
    authorId: '7',
    authorName: '윤AI',
    title: '식단 추천 기능 개발 시작',
    content: '운동 추천에 이어 식단 추천 기능 개발을 시작했습니다. 영양소 데이터베이스 구축 중이에요.',
    isNotice: false,
    createdAt: '2024-01-24T13:45:00Z',
    views: 29,
    comments: 4
  }
];

export const mockPostComments: PostComment[] = [
  {
    id: 'comment-1',
    postId: 'post-1',
    authorId: '1',
    authorName: '김개발',
    content: '좋은 정보 감사합니다!',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    authorId: '2',
    authorName: '이디자인',
    content: '저도 참여하고 싶습니다.',
    createdAt: '2024-01-15T11:00:00Z'
  },
  {
    id: 'comment-3',
    postId: 'post-2',
    authorId: '3',
    authorName: '박프론트',
    content: '다음 주 회의 시간 확인 부탁드립니다.',
    createdAt: '2024-01-14T15:20:00Z'
  }
];
