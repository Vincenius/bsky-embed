import { BskyAgent } from "@atproto/api";

export const agent: BskyAgent = new BskyAgent({
    service: "https://api.bsky.app",
  });