export type ContributionDay = {
  date: string;
  contributionCount: number;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type DevVibeRawResponse = {
  user: null | {
    totalIssues: { totalCount: number };
    totalPRs: { totalCount: number };
    calendarData: {
      contributionCalendar: {
        weeks: ContributionWeek[];
      };
    };
    timeData: {
      commitContributionsByRepository: Array<{
        contributions: {
          nodes: Array<{ occurredAt: string }>;
        };
      }>;
    };
  };
};

export type DevVibeAxis = {
  approach: "P" | "I";
  rhythm: "S" | "F";
  time: "M" | "N";
  code: string; // "PSM" 형태
  metrics: {
    issues: number;
    prs: number;
    issuePrRatio: number | null;
    yearContributionDays: number;
    yearContributionRate: number;
    sampledCommits: number;
    nightRatio: number;
  };
};
