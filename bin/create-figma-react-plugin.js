#!/usr/bin/env node
/* eslint-disable no-console */
import { execSync } from "child_process";
import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import {
  copyBaseTemplate,
  copyExtras,
  updateManifest,
  updatePackageJson,
} from "../config/bin.config.js";

async function run() {
  console.log("✨ Create Figma React Plugin");

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
      name: "pluginDescription",
      type: "input",
    },
    {
      type: "checkbox",
      name: "extras",
      message: "Select extras:",
      choices: [
        { name: "Prettier", value: "prettier" },
        { name: "Tailwind CSS (v4)", value: "tailwind" },
        { name: "Shadcn UI (requires Tailwind)", value: "shadcnui" },
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
    fs.removeSync(projectPath);
    console.log(`⚠️ Overwriting existing directory "${projectName}"...`);
  }

  // Auto-enable Tailwind if Shadcn is chosen
  if (extras.includes("shadcnui") && !extras.includes("tailwind")) {
    console.log("⚠️ Shadcn UI requires Tailwind CSS. Enabling Tailwind CSS...");
    extras.push("tailwind");
  }

  copyBaseTemplate(projectPath);

  if (extras.length === 0) {
    console.log("ℹ No extras selected. Using base config only.");
  }

  extras.forEach((extra) => copyExtras(extra, projectPath));

  updateManifest(projectPath, pluginName, pluginId, pluginDescription);

  // 6️⃣ Update package.json with dependencies
  updatePackageJson(projectPath, projectName, extras);

  console.log("📦 Installing dependencies...");
  execSync("npm install", { cwd: projectPath, stdio: "inherit" });

  // Install sample Shadcn UI component
  if (extras.includes("shadcnui")) {
    console.log("📦 Installing Shadcn UI Button component...");
    execSync("npx shadcn@latest add button", {
      cwd: projectPath,
      stdio: "inherit",
    });
  }

  console.log(`\n✅ Plugin scaffolded at ${projectName}`);
  console.log(`👉 cd ${projectName} && npm run dev`);
}

run().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
