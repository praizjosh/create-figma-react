#!/usr/bin/env node
/* eslint-disable no-console */

import { execSync } from "child_process";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const run = async () => {
    const { projectName, pluginName, pluginId } = await inquirer.prompt([
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
            default: "com.example.create-figma-react-plugin",
            message: "Plugin ID (reverse domain):",
            name: "pluginId",
            type: "input",
        },
    ]);

    const destPath = path.join(process.cwd(), projectName);

    // Copy template
    fs.cpSync(path.join(__dirname, "../template"), destPath, { recursive: true });

    // Update manifest.json
    const manifestPath = path.join(destPath, "manifest.json");
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    manifest.name = pluginName;
    manifest.id = pluginId;
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    // Update package.json
    const pkgPath = path.join(destPath, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    pkg.name = projectName;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    // Install dependencies
    console.log("Installing dependencies...");
    execSync("npm install", { cwd: destPath, stdio: "inherit" });

    console.log(`🚀 Plugin scaffolded at ${projectName}`);
    console.log(`👉 cd ${projectName} && npm run dev`);
};

run();
