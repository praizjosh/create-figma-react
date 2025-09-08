# Create Figma React Plugin

A CLI tool to **quickly scaffold Figma plugins** using **React**, **Vite**, and **TypeScript** — with optional extras like **Prettier**, **Tailwind CSS** and **Shadcn UI**.

[![npm version](https://img.shields.io/npm/v/create-figma-react-plugin.svg?color=blue&logo=npm)](https://www.npmjs.com/package/create-figma-react-plugin)
[![Weekly Downloads](https://img.shields.io/npm/dw/create-figma-react-plugin?color=success)](https://www.npmjs.com/package/create-figma-react-plugin)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

---

## 🚀 Quick Start

The easiest way to get started is using **npx**:

```bash
npx create-figma-react-plugin my-plugin
```

## 📦 Installation

```bash
# Using npx (recommended)
npx create-figma-react-plugin my-plugin

# Or install globally
npm install -g create-figma-react-plugin
create-figma-react-plugin my-plugin
```

---

## 🚀 Usage

```bash
# Create a new plugin project
npx create-figma-react-plugin my-plugin
```

You’ll be prompted for:

- Plugin name
- Plugin ID (reverse-domain format, e.g. `com.example.myplugin`)
- Description
- Extras (Prettier, Tailwind CSS, Shadcn UI)

---

This will generate a new Figma plugin project in the my-plugin folder with:

⚡ React + Vite for fast dev experience

🏗️ TypeScript for type safety

🎨 Optional extras like Tailwind CSS and Shadcn UI

---

## 📂 Generated Project

```
my-plugin/
├── manifest.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   └── ui.tsx
```

If you select **Tailwind CSS (and/or Shadcn UI)**, config files will be added and `vite.config.ts` will be extended.

---

## 🛠 Development

After scaffolding your plugin, run:

```bash
cd my-plugin
npm run dev
```

This will start the Vite dev server. Open the Figma desktop app, go to `Plugins > Development > Import Plugin from Manifest...` and select your plugin's `manifest.json`.

---

## ❓ Troubleshooting & FAQ

- **Error: Cannot find module ...**
  - Make sure you are using Node.js v18 or newer.
  - Ensure you ran `npm install` in your plugin directory.
- **How do I add more extras later?**
  - You can manually install Prettier, Tailwind CSS, or Shadcn UI by following their docs.
- **How do I update my plugin?**
  - Edit your code and re-run `npm run build`.
- **Where can I get help?**
  - [GitHub Issues](https://github.com/praizjosh/create-figma-react-plugin/issues)

---

## 📖 Documentation

- [Figma Plugin API](https://www.figma.com/plugin-docs/intro/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prettier](https://prettier.io/)
- [Shadcn UI](https://ui.shadcn.com/)

---

## ✨ Features

- ⚡ React + Vite for blazing fast builds
- 🏗️ TypeScript out of the box
- 🧹 Prettier (optional)
- 🎨 Tailwind CSS v4 (optional)
- 🎨 Shadcn UI (optional)
- 🗂 Reverse-domain plugin ID support
- 🚀 Zero-config setup

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open an [issue](https://github.com/praizjosh/create-figma-react-plugin/issues) or submit a [PR](https://github.com/praizjosh/create-figma-react-plugin/pulls).

---

## 📜 License

This project is licensed under the MIT License.
