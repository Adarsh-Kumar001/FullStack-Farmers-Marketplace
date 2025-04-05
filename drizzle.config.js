import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./config/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_6JIASZOmyrx1@ep-proud-flower-a57ya3ca-pooler.us-east-2.aws.neon.tech/FarmConnect?sslmode=require",
  },
});