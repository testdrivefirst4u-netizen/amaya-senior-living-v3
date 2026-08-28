/**
 * Strips HTML tags from TipTap-authored content for contexts that require
 * plain text (meta descriptions, JSON-LD, length counters, previews). Pure
 * string manipulation — safe to call on both the server and the client.
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
