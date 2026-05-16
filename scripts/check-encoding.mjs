import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["app", "components", "data", "lib", "types"];
const validExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".css"]);

function walk(dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    if ([...validExtensions].some((ext) => fullPath.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = roots.flatMap((root) => walk(root));

const bad = [];
for (const file of files) {
  const text = readFileSync(join(process.cwd(), file), "utf8");
  if (/\?{3,}/.test(text)) {
    bad.push(file);
  }
}

if (bad.length) {
  console.error("Potential encoding/copy corruption found (runs of ???):");
  bad.forEach((file) => console.error(` - ${file}`));
  process.exit(1);
}

console.log("Encoding check passed: no suspicious question-mark runs.");
