import { createClient } from "next-sanity";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityEnabled = Boolean(projectId);
export const sanityClient = projectId ? createClient({
    projectId, dataset, apiVersion: "2025-02-19", useCdn: true,
}) : null;
