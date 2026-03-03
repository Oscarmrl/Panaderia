import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

// Get directory name
const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Read package.json to get homepage field
const packageJsonPath = join(__dirname, "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
const homepage = packageJson.homepage;

// Determine base URL: env variable > homepage > default "/"
const base = process.env.VITE_BASE_URL || homepage || "/";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
});
