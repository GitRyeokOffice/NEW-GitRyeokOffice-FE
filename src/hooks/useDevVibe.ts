import { useQuery } from "@tanstack/react-query";
import { githubGraphQL } from "../lib/githubGraphQL";
import { DEV_VIBE_QUERY } from "../lib/devVibeQuery";
import type { DevVibeRawResponse } from "../types/devvibe";

function getLast3MonthsRangeISO() {
  const to = new Date();
  const from = new Date();
  from.setMonth(from.getMonth() - 3);
  return { from: from.toISOString(), to: to.toISOString() };
}

export function useDevVibe(username: string) {
  const enabled = Boolean(username && username.trim().length > 0);

  return useQuery({
    queryKey: ["devvibe", username],
    enabled,
    queryFn: async () => {
      const { from, to } = getLast3MonthsRangeISO();
      return githubGraphQL<
        DevVibeRawResponse,
        { username: string; from: string; to: string }
      >(DEV_VIBE_QUERY, { username, from, to });
    },
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}
