/** Consulta exclusivamente no servidor; nunca exponha a chave de API no navegador. */
export type LiveStatus = { live: boolean; videoId: string | null; configured: boolean };

export async function getYoutubeLiveStatus(): Promise<LiveStatus> {
  const channelId = process.env.YOUTUBE_CHANNEL_ID?.trim();
  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  if (!channelId || !apiKey) return { live: false, videoId: null, configured: false };

  const params = new URLSearchParams({
    part: "snippet", channelId, eventType: "live", type: "video",
    maxResults: "1", key: apiKey,
  });
  try {
    // search.list tem custo de quota elevado. 20 minutos ~= 7200 unidades/dia
    // se o site permanecer recebendo acessos, dentro do limite padrão 10 mil/dia.
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`, {
      next: { revalidate: 1200 },
    });
    if (!response.ok) throw new Error(`YouTube Data API: ${response.status}`);
    const data: { items?: Array<{ id?: { videoId?: string }, snippet?: { liveBroadcastContent?: string } }> } = await response.json();
    const item = data.items?.find((video) => video.id?.videoId && video.snippet?.liveBroadcastContent === "live");
    return { live: Boolean(item), videoId: item?.id?.videoId ?? null, configured: true };
  } catch (error) {
    console.error("[YouTube] Falha ao consultar transmissão:", error);
    return { live: false, videoId: null, configured: true };
  }
}
