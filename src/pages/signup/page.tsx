import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { users } from "../../mocks/users";
import type { User } from "../../mocks/users";
import { getDevVibeByCode } from "../../mocks/devVibes";
import { useDevVibe } from "@/hooks/useDevVibe";
import { calcDevVibe } from "../../lib/calcDevVibe";
import { useNavigate } from "react-router-dom";

function toDashed(code: string) {
  if (code.includes("-")) return code;
  if (code.length !== 3) return code;
  return `${code[0]}-${code[1]}-${code[2]}`;
}

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    hasGithub: "" as "yes" | "no" | "",
    githubUsername: "",
    role: "developer" as "developer" | "designer" | "planner",
    frontendStack: [] as string[],
    backendStack: [] as string[],
    otherStack: [] as string[],
    projectExperience: "",
    organization: "",
    introduction: "",
    projectTypes: "",
    portfolio: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // ✅ “분석 트리거”용 username (버튼/submit 눌렀을 때만 쿼리 실행)
  const [queryUsername, setQueryUsername] = useState<string | null>(null);

  // ✅ 분석 중 UI 제어
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // ✅ 최종 분석 결과 코드(대시 포함)
  const [analyzedDevVibe, setAnalyzedDevVibe] = useState<string | null>(null);

  const {
    data: devVibeRaw,
    isLoading: devVibeLoading,
    error: devVibeError,
  } = useDevVibe(queryUsername ?? "");

  // Tech stack options
  const frontendOptions = [
    "React",
    "Vue",
    "Angular",
    "Next.js",
    "Svelte",
    "TypeScript",
    "JavaScript",
  ];
  const backendOptions = [
    "Node.js",
    "Python",
    "Java",
    "Spring",
    "Django",
    "Flask",
    "Go",
    "Ruby",
  ];
  const otherOptions = [
    "Docker",
    "Kubernetes",
    "AWS",
    "GCP",
    "Firebase",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStackChange = (
    category: "frontendStack" | "backendStack" | "otherStack",
    value: string
  ) => {
    const currentStack = formData[category];
    if (currentStack.includes(value)) {
      setFormData({
        ...formData,
        [category]: currentStack.filter((item) => item !== value),
      });
    } else {
      setFormData({ ...formData, [category]: [...currentStack, value] });
    }
  };

  const allTechStack = useMemo(
    () => [
      ...formData.frontendStack,
      ...formData.backendStack,
      ...formData.otherStack,
    ],
    [formData.frontendStack, formData.backendStack, formData.otherStack]
  );

  // ✅ 분석 결과가 도착하면 여기서 “실제 반영”
  useEffect(() => {
    if (!isAnalyzing) return;
    if (!queryUsername) return;

    if (devVibeLoading) return;

    if (devVibeError) {
      setIsAnalyzing(false);
      setError(
        `GitHub 분석 실패: ${
          devVibeError instanceof Error
            ? devVibeError.message
            : String(devVibeError)
        }`
      );
      setQueryUsername(null);
      return;
    }

    if (!devVibeRaw) return;

    const vibe = calcDevVibe(devVibeRaw);
    if (!vibe) {
      setIsAnalyzing(false);
      setError(
        "Dev-Vibe 계산 실패: GitHub 데이터가 비어있거나 구조가 다릅니다."
      );
      setQueryUsername(null);
      return;
    }

    const finalCode = toDashed(vibe.code); // "P-S-M" 형태로 통일

    // ✅ 사용자 생성 (mock)
    const projectExp = parseInt(formData.projectExperience) || 0;

    const newUser: User = {
      id: String(users.length + 1),
      email: formData.email,
      password: formData.password,
      name: formData.name,
      githubUsername: formData.githubUsername,
      role: formData.role,
      techStacks: allTechStack,
      projectExperience: projectExp,
      organization: formData.organization,
      devVibeCode: finalCode,
      isNewbie: false,
    };

    users.push(newUser);

    setAnalyzedDevVibe(finalCode);
    setIsAnalyzing(false);
    setSuccess(true);
    setQueryUsername(null);
  }, [
    isAnalyzing,
    queryUsername,
    devVibeLoading,
    devVibeError,
    devVibeRaw,
    formData.email,
    formData.password,
    formData.name,
    formData.githubUsername,
    formData.role,
    formData.projectExperience,
    formData.organization,
    allTechStack,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (formData.password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    const existingUser = users.find((u) => u.email === formData.email);
    if (existingUser) {
      setError("이미 존재하는 이메일입니다.");
      return;
    }

    if (formData.role === "developer" && !formData.hasGithub) {
      setError("GitHub 계정 보유 여부를 선택해주세요.");
      return;
    }

    if (
      formData.role === "developer" &&
      formData.hasGithub === "yes" &&
      !formData.githubUsername
    ) {
      setError("GitHub 닉네임을 입력해주세요.");
      return;
    }

    // ✅ 디자이너/기획자: 즉시 성공 처리
    if (formData.role === "designer" || formData.role === "planner") {
      const projectExp = parseInt(formData.projectExperience) || 0;

      const newUser: User = {
        id: String(users.length + 1),
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role,
        techStacks: [],
        projectExperience: projectExp,
        organization: formData.organization,
        isNewbie: projectExp === 0,
      };

      users.push(newUser);
      setSuccess(true);
      return;
    }

    // ✅ 개발자: 새싹 처리 조건
    const projectExp = parseInt(formData.projectExperience) || 0;
    const isNewbieUser = formData.hasGithub === "no" || projectExp === 0;

    // 새싹이면 분석 없이 등록
    if (isNewbieUser) {
      const newUser: User = {
        id: String(users.length + 1),
        email: formData.email,
        password: formData.password,
        name: formData.name,
        githubUsername:
          formData.hasGithub === "yes" ? formData.githubUsername : undefined,
        role: formData.role,
        techStacks: allTechStack,
        projectExperience: projectExp,
        organization: formData.organization,
        isNewbie: true,
      };

      users.push(newUser);
      setSuccess(true);
      return;
    }

    // ✅ 여기부터가 “진짜 분석”
    setIsAnalyzing(true);
    setQueryUsername(formData.githubUsername.trim()); // ← 이 순간 useDevVibe가 실행됨
  };

  const handleCloseModal = () => {
    navigate("/login");
  };

  // -------------------------
  // UI: 분석 중 화면
  // -------------------------
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center max-w-md"
        >
          <div className="w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <i className="ri-github-fill text-3xl text-neon-green"></i>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            GitHub 데이터 분석 중...
          </h2>
          <p className="text-gray-400 mb-4">Dev Vibe를 생성하고 있습니다</p>
          <div className="flex justify-center gap-2">
            <div
              className="w-2 h-2 bg-neon-green rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 bg-neon-green rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-neon-green rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------
  // UI: 디자이너/기획자 환영 화면 (원본 유지)
  // -------------------------
  if (
    success &&
    (formData.role === "designer" || formData.role === "planner")
  ) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl w-full"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <i className="ri-check-line text-5xl text-purple-500" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold text-white mb-3"
            >
              환영합니다, {formData.name}님!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-lg"
            >
              DevMatch에서 최고의 팀원을 만나보세요
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-500/20 rounded-2xl">
                <i
                  className={`text-3xl text-purple-500 ${
                    formData.role === "designer"
                      ? "ri-palette-line"
                      : "ri-lightbulb-line"
                  }`}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {formData.role === "designer" ? "디자이너" : "기획자"}로
                  등록되었습니다
                </h3>
                <p className="text-gray-400">
                  이제 프로젝트를 탐색하고 지원할 수 있습니다
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <i className="ri-search-line text-xl text-purple-500 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      프로젝트 탐색
                    </h4>
                    <p className="text-gray-400 text-sm">
                      관심 있는 프로젝트를 찾아보세요
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <i className="ri-file-list-line text-xl text-purple-500 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      자유로운 지원
                    </h4>
                    <p className="text-gray-400 text-sm">
                      포트폴리오와 함께 프로젝트에 지원하세요
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <i className="ri-team-line text-xl text-purple-500 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">팀 매칭</h4>
                    <p className="text-gray-400 text-sm">
                      최적의 팀원과 함께 프로젝트를 완성하세요
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={handleCloseModal}
            className="w-full py-4 bg-purple-500 text-white rounded-xl font-semibold text-lg hover:bg-purple-600 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            나와 맞는 팀원 만나기
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // -------------------------
  // UI: 개발자 DevVibe 결과 화면
  // -------------------------
  if (success && analyzedDevVibe) {
    const devVibeData = getDevVibeByCode(analyzedDevVibe);
    if (!devVibeData) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center px-6">
          <div className="text-white">
            DevVibe 데이터 매칭 실패: {analyzedDevVibe} (mocks/devVibes에 코드가
            있는지 확인)
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl w-full"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="w-24 h-24 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <i className="ri-check-line text-5xl text-neon-green" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold text-white mb-3"
            >
              분석이 완료되었습니다!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-lg"
            >
              당신의 Dev Vibe가 생성되었습니다
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-gradient-to-br from-neon-green/10 to-neon-green/5 border-2 border-neon-green/30 rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-white/10">
              <div className="text-7xl">{devVibeData.emoji}</div>
              <div className="flex-1">
                <div className="text-base text-neon-green font-mono mb-2">
                  {devVibeData.code}
                </div>
                <h3 className="text-3xl font-bold text-white">
                  {devVibeData.title}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-2">계획성</div>
                <div className="text-lg font-semibold text-white">
                  {devVibeData.traits.planning}
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-2">작업방식</div>
                <div className="text-lg font-semibold text-white">
                  {devVibeData.traits.work}
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-2">활동시간</div>
                <div className="text-lg font-semibold text-white">
                  {devVibeData.traits.time}
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <p className="text-gray-300 text-base leading-relaxed">
                {devVibeData.description}
              </p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={handleCloseModal}
            className="w-full py-4 bg-neon-green text-navy-900 rounded-xl font-semibold text-lg hover:bg-neon-green/90 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            나와 맞는 팀원 만나기
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // -------------------------
  // UI: 새싹 유형 환영 화면 (원본 유지)
  // -------------------------
  if (success && formData.role === "developer" && !analyzedDevVibe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl w-full"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <i className="ri-seedling-line text-5xl text-green-500" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold text-white mb-3"
            >
              환영합니다, {formData.name}님!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-lg"
            >
              새싹 개발자로 등록되었습니다
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 flex items-center justify-center bg-green-500/20 rounded-2xl">
                <i className="ri-seedling-line text-3xl text-green-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">새싹 개발자</h3>
                <p className="text-gray-400">함께 성장해나가요!</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <i className="ri-lightbulb-line text-xl text-green-500 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      프로젝트 시작
                    </h4>
                    <p className="text-gray-400 text-sm">
                      관심 있는 프로젝트에 참여하여 경험을 쌓아보세요
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <i className="ri-team-line text-xl text-green-500 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      팀원과 협업
                    </h4>
                    <p className="text-gray-400 text-sm">
                      다양한 팀원들과 함께 성장하는 기회를 만들어보세요
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <i className="ri-trophy-line text-xl text-green-500 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Dev Vibe 획득
                    </h4>
                    <p className="text-gray-400 text-sm">
                      프로젝트 경험을 쌓으면 나만의 Dev Vibe를 얻을 수 있어요
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={handleCloseModal}
            className="w-full py-4 bg-green-500 text-white rounded-xl font-semibold text-lg hover:bg-green-600 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            프로젝트 둘러보기
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // -------------------------
  // UI: 가입 폼 (원본 유지, 에러만 표시)
  // -------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-3 cursor-pointer group"
          >
            <img
              src="https://public.readdy.ai/ai/img_res/726250aa-becf-4a4b-a383-e2cd269dfc36.png"
              alt="DevMatch Logo"
              className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-3xl font-bold text-white">DevMatch</span>
          </a>
          <p className="text-gray-400 mt-4">데이터 기반 팀 매칭 플랫폼</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">회원가입</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  이름 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors text-sm"
                  placeholder="홍길동"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  이메일 <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors text-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  비밀번호 <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors text-sm"
                  placeholder="최소 6자 이상"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  비밀번호 확인 <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors text-sm"
                  placeholder="비밀번호 재입력"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                직무 <span className="text-red-400">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-green transition-colors text-sm cursor-pointer"
                required
              >
                <option value="developer" className="bg-navy-800">
                  개발자
                </option>
                <option value="designer" className="bg-navy-800">
                  디자이너
                </option>
                <option value="planner" className="bg-navy-800">
                  기획자
                </option>
              </select>
            </div>

            {formData.role === "developer" && (
              <>
                <div className="bg-neon-green/5 border-2 border-neon-green/30 rounded-xl p-4">
                  <label className="block text-sm font-medium text-neon-green mb-3 flex items-center gap-2">
                    <i className="ri-github-fill" />
                    GitHub 계정을 가지고 있나요?{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, hasGithub: "yes" })
                      }
                      className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                        formData.hasGithub === "yes"
                          ? "bg-neon-green text-navy-900"
                          : "bg-white/5 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      예
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          hasGithub: "no",
                          githubUsername: "",
                        })
                      }
                      className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                        formData.hasGithub === "no"
                          ? "bg-neon-green text-navy-900"
                          : "bg-white/5 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      아니오
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 flex items-start gap-2">
                    <i className="ri-information-line text-neon-green mt-0.5" />
                    <span>
                      GitHub 계정이 없거나 프로젝트 경험이 없으면 새싹 유형으로
                      등급이 고정됩니다
                    </span>
                  </p>
                </div>

                {formData.hasGithub === "yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <i className="ri-user-line" />
                      GitHub 닉네임 <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i className="ri-at-line text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="githubUsername"
                        value={formData.githubUsername}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors text-sm"
                        placeholder="github-username"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      GitHub 데이터를 분석하여 당신의 Dev Vibe를 자동으로
                      생성합니다
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    프론트엔드 기술 스택
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {frontendOptions.map((tech) => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => handleStackChange("frontendStack", tech)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                          formData.frontendStack.includes(tech)
                            ? "bg-neon-green text-navy-900"
                            : "bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    백엔드 기술 스택
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {backendOptions.map((tech) => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => handleStackChange("backendStack", tech)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                          formData.backendStack.includes(tech)
                            ? "bg-neon-green text-navy-900"
                            : "bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    기타 기술 스택
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {otherOptions.map((tech) => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => handleStackChange("otherStack", tech)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                          formData.otherStack.includes(tech)
                            ? "bg-neon-green text-navy-900"
                            : "bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {(formData.role === "designer" || formData.role === "planner") && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    소개 문구 <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="introduction"
                    value={formData.introduction}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none"
                    placeholder="자신을 소개하는 간단한 문구를 작성해주세요"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    내가 진행했던 프로젝트 유형{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="projectTypes"
                    value={formData.projectTypes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    placeholder="예: 모바일 앱 UI/UX, 웹사이트 디자인, 브랜딩"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    나를 증명할 수 있는 포트폴리오{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    placeholder="https://portfolio.com 또는 Behance, Notion 링크"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                프로젝트 경험 횟수 <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="projectExperience"
                value={formData.projectExperience}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors text-sm"
                placeholder="0"
                min="0"
                required
              />
              <p className="text-xs text-gray-400 mt-2">
                프로젝트 경험이 없으면 새싹 유형으로 등급이 고정됩니다
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                소속 (선택)
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors text-sm"
                placeholder="학교 또는 회사명"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-neon-green text-navy-900 rounded-lg font-semibold hover:bg-neon-green/90 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              회원가입
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-400">
              이미 계정이 있으신가요?{" "}
              <a
                href="/login"
                className="text-neon-green hover:underline cursor-pointer whitespace-nowrap"
              >
                로그인
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
