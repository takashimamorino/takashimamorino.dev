import handler from "./framework/entry.rsc";

export interface Env {
  // Add your environment variables here if needed
}

export default {
  async fetch(request: Request, _env: Env, _ctx: any) {
    // Handle static assets from the client build
    const url = new URL(request.url);

    // Serve static assets for client-side resources
    if (
      url.pathname.startsWith("/assets/") ||
      url.pathname.endsWith(".js") ||
      url.pathname.endsWith(".css")
    ) {
      // In production, these would be served from your CDN or KV storage
      // For now, pass through to the RSC handler
    }

    // Handle all requests through the RSC handler
    return handler(request);
  },
};
