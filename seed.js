import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const { seedAdmin } = await import("./lib/seedAdmin.js");

await seedAdmin();

process.exit();