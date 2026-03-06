import { buildApp } from "./app.js";

const PORT = Number(process.env.PORT) || 5000;

async function start() {
  const app = buildApp();

  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
