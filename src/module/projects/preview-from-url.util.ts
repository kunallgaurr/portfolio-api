/**
 * Fetches a URL and extracts the Open Graph image (og:image) for use as a preview.
 * Returns the absolute image URL or null if not found or on error.
 */
export async function getPreviewImageFromUrl(pageUrl: string): Promise<string | null> {
    try {
        const res = await fetch(pageUrl, {
            headers: { "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)" },
            signal: AbortSignal.timeout(10_000),
        });
        if (!res.ok) return null;
        const html = await res.text();

        const ogImageMatch = html.match(
            /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
        ) || html.match(
            /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i,
        );
        if (!ogImageMatch?.[1]) return null;

        let imageUrl = ogImageMatch[1].trim();
        if (imageUrl.startsWith("//")) imageUrl = `https:${imageUrl}`;
        else if (imageUrl.startsWith("/")) {
            const base = new URL(pageUrl);
            imageUrl = `${base.origin}${imageUrl}`;
        }
        return imageUrl;
    } catch {
        return null;
    }
}
