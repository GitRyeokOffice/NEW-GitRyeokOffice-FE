export const DEV_VIBE_QUERY = `
query GetDevVibeFullProfile($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    totalIssues: issues { totalCount }
    totalPRs: pullRequests { totalCount }

    calendarData: contributionsCollection {
      contributionCalendar {
        weeks { contributionDays { date contributionCount } }
      }
    }

    timeData: contributionsCollection(from: $from, to: $to) {
      commitContributionsByRepository {
        contributions(first: 100, orderBy: {field: OCCURRED_AT, direction: DESC}) {
          nodes { occurredAt }
        }
      }
    }
  }
}
`;
