# Create Figma React Plugin

A CLI tool to scaffold Figma plugins with **React + Vite**.  
Includes optional extras like **Tailwind CSS v4, Prettier and Shadcn UI**.

---

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
- ⚡ React + Vite for fast builds
- 🧹 Prettier (optional)
- 🎨 Tailwind CSS v4 (optional)
- 🎨 Shadcn UI (optional)
- 🗂 Reverse-domain plugin ID support
- 🚀 Zero-config setup
