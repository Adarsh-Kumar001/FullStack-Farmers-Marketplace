import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./config/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_n0fFcJvNa5Pk@ep-twilight-term-a1pa6ec5-pooler.ap-southeast-1.aws.neon.tech/FarmConnect?sslmode=require",
  },
});