const GITHUB_API = "https://api.github.com";

function getToken() {
  const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
  if (!token) throw new Error("VITE_GITHUB_TOKEN is missing. Put it in .env");
  return token;
}

export async function githubREST<T>(path: string): Promise<T> {
  const token = getToken();

  const res = await fetch(`${GITHUB_API}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(JSON.stringify(json));
  }
  return json as T;
}
