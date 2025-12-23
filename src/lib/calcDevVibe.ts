import type {
  ContributionWeek,
  DevVibeAxis,
  DevVibeRawResponse,
} from "../types/devvibe";

function countContributionDays(weeks: ContributionWeek[]): number {
  let days = 0;
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      if (day.contributionCount > 0) days += 1;
    }
  }
  return days;
}

function calcNightRatioKST(occurredAts: string[]): number {
  let night = 0;
  const total = occurredAts.length;

  for (const iso of occurredAts) {
    const dt = new Date(iso);
    const kstHour = (dt.getUTCHours() + 9) % 24;
    const isNight = kstHour >= 18 || kstHour < 6;
    if (isNight) night += 1;
  }

  return total === 0 ? 0 : night / total;
}

export function calcDevVibe(raw: DevVibeRawResponse): DevVibeAxis | null {
  if (!raw.user) return null;

  const issues = raw.user.totalIssues.totalCount;
  const prs = raw.user.totalPRs.totalCount;

  const ratio = prs === 0 ? Infinity : issues / prs;
  const approach: "P" | "I" = ratio >= 0.5 ? "P" : "I";

  const weeks = raw.user.calendarData.contributionCalendar.weeks;
  const yearContributionDays = countContributionDays(weeks);
  const yearContributionRate = yearContributionDays / 365;
  const rhythm: "S" | "F" = yearContributionRate >= 0.3 ? "S" : "F";

  const occurredAts: string[] = [];
  for (const repo of raw.user.timeData.commitContributionsByRepository) {
    for (const node of repo.contributions.nodes)
      occurredAts.push(node.occurredAt);
  }

  const nightRatio = calcNightRatioKST(occurredAts);
  const time: "M" | "N" = nightRatio >= 0.5 ? "N" : "M";

  const code = `${approach}${rhythm}${time}`; // "PSM"

  return {
    approach,
    rhythm,
    time,
    code,
    metrics: {
      issues,
      prs,
      issuePrRatio: prs === 0 ? null : issues / prs,
      yearContributionDays,
      yearContributionRate,
      sampledCommits: occurredAts.length,
      nightRatio,
    },
  };
}
