import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  try {
    // Try to serve the requested asset
    return await getAssetFromKV(event);
  } catch (e) {
    // For 404s, serve index.html for SPA routing
    try {
      const notFoundResponse = await getAssetFromKV(event, {
        mapRequestToAsset: () => new Request(new URL("/index.html", event.request.url)),
      });

      return new Response(notFoundResponse.body, {
        ...notFoundResponse,
        status: 200,
      });
    } catch (e) {
      return new Response("Not found", { status: 404 });
    }
  }
}
