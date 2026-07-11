const BACKEND_ORIGIN = process.env.NEXT_PUBLIC_BACKEND_ORIGIN || "";

export function backendImageUrl(path?: string | null): string {
  if (!path) return "/images/product/product-1.jpg";
  if (/^https?:\/\//.test(path)) return path;
  return `${BACKEND_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
}
