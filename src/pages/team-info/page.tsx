import { useState } from "react";
import { Loader2 } from "lucide-react";

const NOTION_PAGE_URL =
  "https://mirage-marmoset-e6f.notion.site/ebd//2d21e5e06e7480ea9e7ef9e2173685c5";

export const TeamInfoPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-dvh w-full bg-white">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
          <div className="flex flex-col items-center gap-2 text-center">
            <Loader2
              className="h-8 w-8 animate-spin text-slate-900"
              aria-hidden="true"
            />
            <p className="text-sm font-medium text-slate-900">
              페이지를 불러오는 중입니다...
            </p>
          </div>
        </div>
      )}

      <iframe
        src={NOTION_PAGE_URL}
        className={`h-[100dvh] w-full border-0 ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity`}
        onLoad={() => setIsLoading(false)}
        title="팀 소개 페이지"
      />
    </div>
  );
};
