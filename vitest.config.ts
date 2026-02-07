import { defineConfig } from "vitest/config";
import path from "path";

const templateRoot = path.resolve(import.meta.dirname);

export default defineConfig({
  root: templateRoot,
  resolve: {
    alias: {
      "@": path.resolve(templateRoot, "client", "src"),
      "@shared": path.resolve(templateRoot, "shared"),
      "@assets": path.resolve(templateRoot, "attached_assets"),
    },
  },
  test: {
    environment: "node",
    include: ["server/**/*.test.ts", "server/**/*.spec.ts"],
    env: {
      // Test environment variables
      NODE_ENV: "test",
      DATABASE_URL: "mysql://test:test@localhost:3306/test_db",
      JWT_SECRET: "test_jwt_secret_for_testing_only_min_32_chars",
      ADMIN_UNLOCK_PASSWORD: "test_admin_password",
      ENABLE_STRIPE: "false",
      ENABLE_UPLOADS: "false",
    },
  },
});
