import { serve } from "bun";
import index from "./index.html";
import { readdirSync } from "fs";
import { join } from "path";

const assetsDir = join(import.meta.dir, "../Main - asssets");

const server = serve({
  port: Number(process.env.PORT) || 3000,
  routes: {
    "/api/assets": async () => {
      try {
        const files = readdirSync(assetsDir).filter(f => f.endsWith('.svg'));
        files.sort((a, b) => {
          const numA = parseInt(a.replace(/[^0-9]/g, '')) || 0;
          const numB = parseInt(b.replace(/[^0-9]/g, '')) || 0;
          return numA - numB;
        });
        return Response.json({ assets: files });
      } catch (e) {
        return Response.json({ assets: [] });
      }
    },

    "/assets/:name": async (req) => {
      const name = req.params.name;
      const filePath = join(assetsDir, name);
      const file = Bun.file(filePath);
      if (await file.exists()) {
        return new Response(file, {
          headers: { "Content-Type": "image/svg+xml" }
        });
      }
      return new Response("Not found", { status: 404 });
    },

    // Serve index.html for all unmatched routes.
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
