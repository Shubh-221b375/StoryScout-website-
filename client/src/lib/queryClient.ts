import { QueryClient, QueryFunction } from "@tanstack/react-query";

export function parseApiError(error: unknown): string {
  if (!(error instanceof Error)) return "Something went wrong. Please try again.";
  const match = error.message.match(/^\d+:\s*(.+)$/s);
  const body = match?.[1] ?? error.message;
  try {
    const json = JSON.parse(body);
    if (typeof json.error === "string") return json.error;
    if (json.error?.formErrors?.[0]) return json.error.formErrors[0];
  } catch {
    /* plain text */
  }
  if (body.includes("409")) return "This email is already registered. Try signing in.";
  return body.length < 120 ? body : "Something went wrong. Please try again.";
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    const data = await res.json();
    if (unauthorizedBehavior === "returnNull" && data === null) {
      return null;
    }
    return data;
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
