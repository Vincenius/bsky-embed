const SERVICE = "https://api.bsky.app";

export interface XrpcResponse {
  success: boolean;
  data: any;
}

const xrpc = async (method: string, params: Record<string, any>): Promise<XrpcResponse> => {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value));
    }
  }

  try {
    const res = await fetch(`${SERVICE}/xrpc/${method}?${query.toString()}`, {
      headers: { accept: "application/json" },
    });

    if (!res.ok) {
      return { success: false, data: null };
    }

    return { success: true, data: await res.json() };
  } catch {
    // network / CORS errors (e.g. Bluesky's 403 on searchPosts has no CORS headers)
    return { success: false, data: null };
  }
};

// https://docs.bsky.app/docs/api/app-bsky-feed-get-author-feed
export const getAuthorFeed = (params: {
  actor: string;
  limit?: number;
  filter?: string;
  cursor?: string;
}): Promise<XrpcResponse> => xrpc("app.bsky.feed.getAuthorFeed", params);

// https://docs.bsky.app/docs/api/app-bsky-feed-get-feed
export const getFeed = (params: {
  feed: string;
  limit?: number;
  cursor?: string;
}): Promise<XrpcResponse> => xrpc("app.bsky.feed.getFeed", params);

// https://docs.bsky.app/docs/api/app-bsky-feed-search-posts
export const searchPosts = (params: {
  q: string;
  limit?: number;
  cursor?: string;
}): Promise<XrpcResponse> => xrpc("app.bsky.feed.searchPosts", params);
