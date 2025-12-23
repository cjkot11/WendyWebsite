import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "798nmkhx",
  dataset: "production",
  // Disable CDN so changes in Studio (new posts, deletions) show up immediately
  useCdn: false,
  apiVersion: "2024-05-22",
  // No token needed for public reads
});
