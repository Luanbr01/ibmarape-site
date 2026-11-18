import { NextResponse } from "next/server";
import { getYoutubeLiveStatus } from "@/lib/youtube-live";

export const runtime = "nodejs";

export async function GET() {
  const status = await getYoutubeLiveStatus();
  return NextResponse.json(status, { headers: { "Cache-Control": "no-store" } });
}
