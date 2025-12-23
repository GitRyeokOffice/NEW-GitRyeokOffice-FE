const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

type GraphQLResponse<TData> = {
  data: TData;
  errors?: Array<{
    message: string;
    path?: Array<string | number>;
    extensions?: unknown;
  }>;
};

export async function githubGraphQL<
  TData,
  TVariables extends Record<string, unknown> = Record<string, never>
>(query: string, variables?: TVariables): Promise<TData> {
  const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
  if (!token) throw new Error("VITE_GITHUB_TOKEN is missing. Put it in .env");

  const res = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: variables ?? {} }),
  });

  const json = (await res.json()) as GraphQLResponse<TData>;

  if (!res.ok || (json.errors?.length ?? 0) > 0) {
    const msg = json.errors
      ? JSON.stringify(json.errors)
      : JSON.stringify(json);
    throw new Error(msg);
  }

  return json.data;
}
