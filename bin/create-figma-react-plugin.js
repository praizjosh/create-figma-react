#!/usr/bin/env node
/* eslint-disable no-console */

import { execSync } from "child_process";
import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const run = async () => {
  console.log("✨ Create Figma React Plugin");

  // 1️⃣ Ask user for project info and extras
  const { projectName, pluginName, pluginId, pluginDescription, extras } = await inquirer.prompt([
    {
      default: "my-figma-plugin",
      message: "Project folder name:",
      name: "projectName",
      type: "input",
    },
    {
      default: "My React Figma Plugin",
      message: "Figma Plugin Display Name:",
      name: "pluginName",
      type: "input",
    },
    {
      default: (answers) => `dev.${process.env.USER || "username"}.${answers.projectName}`,
      message: "Plugin ID (reverse domain):",
      name: "pluginId",
      type: "input",
    },
    {
      default: "A Figma plugin built with React + Vite",
      message: "Plugin description:",
      name: "description",
      type: "input",
    },
    {
      type: "checkbox",
      name: "extras",
      message: "Select extras to include:",
      choices: [
        { name: "Tailwind CSS (v4)", value: "tailwind" },
        { name: "Prettier", value: "prettier" },
      ],
    },
  ]);

  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: `❌ Directory "${projectName}" already exists. What do you want to do?`,
        choices: [
          { name: "Overwrite and continue", value: "overwrite" },
          { name: "Abort", value: "abort" },
        ],
      },
    ]);

    if (action === "abort") {
      console.log("Aborted.");
      process.exit(0);
    }

    if (action === "overwrite") {
      console.log(`⚠️ Overwriting existing directory "${projectName}"...`);
      fs.removeSync(projectPath); // delete existing folder recursively
    }
  }

  // 2️⃣ Copy base template
  fs.copySync(path.join(__dirname, "../template/base"), projectPath);

  if (extras.length === 0) {
    console.log("ℹ No extras selected. Using base template only.");
  }

  // 3️⃣ Copy selected extras
  for (const extra of extras) {
    const extraPath = path.join(__dirname, `../template/extras/${extra}`);
    if (fs.existsSync(extraPath)) {
      fs.copySync(extraPath, projectPath, { overwrite: true });
      console.log(`✔ Added ${extra}`);
    }
  }

  // 4️⃣ Update manifest.json
  const manifestPath = path.join(projectPath, "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.name = pluginName;
  manifest.id = pluginId;
  manifest.description = pluginDescription;
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  // 5️⃣ Update package.json name and add devDependencies for extras
  const pkgPath = path.join(projectPath, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  pkg.name = projectName;

  if (extras.includes("tailwind")) {
    pkg.devDependencies = pkg.devDependencies || {};
    Object.assign(pkg.devDependencies, {
      tailwindcss: "^4.1.12",
      "@tailwindcss/vite": "^4.1.12",
    });

    // 1️⃣ Overwrite vite.config.ts
    const tailwindViteConfig = path.join(__dirname, "../template/extras/tailwind/vite.config.ts");
    const destViteConfig = path.join(projectPath, "vite.config.ts");

    if (fs.existsSync(tailwindViteConfig)) {
      fs.copySync(tailwindViteConfig, destViteConfig, { overwrite: true });
      console.log("✔ vite.config.ts overwritten for Tailwind setup");
    }

    // 2️⃣ Prepend Tailwind import in main.tsx
    const mainTsxPath = path.join(projectPath, "src/main.tsx");
    if (fs.existsSync(mainTsxPath)) {
      let mainContent = fs.readFileSync(mainTsxPath, "utf8");
      if (!mainContent.includes('import "./index.css";')) {
        mainContent = `import "./index.css";\n` + mainContent;
        fs.writeFileSync(mainTsxPath, mainContent);
      }
    }
  }
  if (extras.includes("prettier")) {
    pkg.devDependencies = pkg.devDependencies || {};
    Object.assign(pkg.devDependencies, {
      prettier: "^3.6.2",
    });
  }

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

  // Install dependencies
  console.log("📦 Installing dependencies...");
  execSync("npm install", { cwd: projectPath, stdio: "inherit" });

  console.log(`\n✅ Plugin scaffolded at ${projectName}`);
  console.log(`👉 cd ${projectName} && npm run dev`);
};

run().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
