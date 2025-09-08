import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyBaseTemplate(projectPath) {
  fs.copySync(path.join(__dirname, "../template/base"), projectPath);
}

function copyExtras(extra, projectPath) {
  const extrasPath = path.join(__dirname, `../template/extras/${extra}`);
  if (fs.existsSync(extrasPath)) {
    fs.copySync(extrasPath, projectPath, { overwrite: true });
    console.log(`✔ Added ${extra}`);
  }
}

function updateManifest(projectPath, pluginName, pluginId, pluginDescription) {
  const manifestPath = path.join(projectPath, "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.name = pluginName;
  manifest.id = pluginId;
  manifest.description = pluginDescription;
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

function setupTailwind(projectPath) {
  // Overwrite App.tsx
  const tailwindAppTsx = path.join(__dirname, "../template/extras/tailwind/src/App.tsx");
  const destAppTsx = path.join(projectPath, "src/App.tsx");

  // Overwrite vite.config.ts
  const tailwindViteConfig = path.join(__dirname, "../template/extras/tailwind/vite.config.ts");
  const destViteConfig = path.join(projectPath, "vite.config.ts");

  if (fs.existsSync(tailwindAppTsx)) {
    fs.copySync(tailwindAppTsx, destAppTsx, { overwrite: true });
    console.log("✔ App.tsx overwritten for Tailwind setup");
  }

  if (fs.existsSync(tailwindViteConfig)) {
    fs.copySync(tailwindViteConfig, destViteConfig, { overwrite: true });
    console.log("✔ vite.config.ts overwritten for Tailwind setup");
  }

  // Prepend Tailwind import in main.tsx
  const mainTsxPath = path.join(projectPath, "src/main.tsx");
  if (fs.existsSync(mainTsxPath)) {
    let mainContent = fs.readFileSync(mainTsxPath, "utf8");
    if (!mainContent.includes('import "./index.css";')) {
      mainContent = `import "./index.css";\n` + mainContent;
      fs.writeFileSync(mainTsxPath, mainContent);
    }
  }
}

function updatePackageJson(projectPath, projectName, extras) {
  const pkgPath = path.join(projectPath, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  pkg.name = projectName;

  pkg.devDependencies = pkg.devDependencies || {};
  pkg.dependencies = pkg.dependencies || {};

  if (extras.includes("prettier")) {
    Object.assign(pkg.devDependencies, { prettier: "^3.6.2" });
  }

  if (extras.includes("tailwind")) {
    Object.assign(pkg.devDependencies, {
      tailwindcss: "^4.1.12",
      "@tailwindcss/vite": "^4.1.12",
    });
    setupTailwind(projectPath);
  }

  if (extras.includes("shadcnui")) {
    Object.assign(pkg.dependencies, {
      clsx: "^2.1.1",
      "class-variance-authority": "^0.7.1",
      "lucide-react": "^0.542.0",
      "tailwind-merge": "^3.3.1",
    });
    Object.assign(pkg.devDependencies, {
      tailwindcss: "^4.1.12",
      "@tailwindcss/vite": "^4.1.12",
      "tw-animate-css": "^1.3.8",
    });
  }

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}

export { copyBaseTemplate, copyExtras, updateManifest, updatePackageJson };
