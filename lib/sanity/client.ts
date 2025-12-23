import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "798nmkhx",
  dataset: "production",
  useCdn: true, // Enable CDN for public reads
  apiVersion: "2024-05-22",
  // No token needed for public reads
});
