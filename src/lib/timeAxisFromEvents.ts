import { githubREST } from "./githubRest";

type GitHubEvent = {
  type: string;
  created_at: string;
  payload?: {
    commits?: Array<{
      sha: string;
      message: string;
      author?: { name?: string; email?: string };
    }>;
  };
  repo?: { name: string };
};

function getSeoulHour(iso: string): number {
  const dt = new Date(iso);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(dt);

  const hourPart = parts.find((p) => p.type === "hour")?.value ?? "0";
  const hour = Number(hourPart);
  return Number.isFinite(hour) ? hour : 0;
}

export type TimeAxisResult = {
  sampledEvents: number;
  sampledCommits: number;
  nightRatio: number;
};

export async function fetchNightRatioFromPublicEvents(
  username: string
): Promise<TimeAxisResult> {
  const events = await githubREST<GitHubEvent[]>(
    `/users/${encodeURIComponent(username)}/events/public?per_page=100`
  );

  const pushEvents = events.filter((e) => e.type === "PushEvent");

  const occurredAts: string[] = [];
  for (const ev of pushEvents) {
    const commitCount = ev.payload?.commits?.length ?? 1;
    for (let i = 0; i < commitCount; i += 1) occurredAts.push(ev.created_at);
  }

  let night = 0;
  for (const iso of occurredAts) {
    const h = getSeoulHour(iso);
    if (h >= 18 || h < 6) night += 1;
  }

  const total = occurredAts.length;
  return {
    sampledEvents: pushEvents.length,
    sampledCommits: total,
    nightRatio: total === 0 ? 0 : night / total,
  };
}
