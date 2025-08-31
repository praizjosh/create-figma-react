# Create Figma React Plugin

A CLI tool to scaffold Figma plugins with **React + Vite**.  
Includes optional extras like **Tailwind CSS v4, Prettier**.

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
- Extras (Tailwind, Prettier)

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

If you select **Tailwind**, config files will be added and `vite.config.ts` will be extended.

---

## 🛠 Development

To run locally without publishing:

```bash
# Clone repo
git clone https://github.com/yourname/create-figma-react-plugin
cd create-figma-react-plugin

# Install deps
npm install

# Link CLI globally
npm link
```

Now you can test with:

```bash
create-figma-react-plugin my-test-plugin
```

---

## 📦 Publishing

To publish a new version:

```bash
npm version patch   # or minor / major
npm publish --access public
```

---

## ✨ Features
- ⚡ React + Vite for fast builds
- 🎨 Tailwind CSS v4 (optional)
- 🧹 Prettier (optional)
- 🗂 Reverse-domain plugin ID support
- 🚀 Zero-config setup
