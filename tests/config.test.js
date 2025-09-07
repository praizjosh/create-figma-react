import fs from "fs-extra";
import path from "path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { copyBaseTemplate, copyExtras, updateManifest, updatePackageJson } from "../bin/config.js";

vi.mock("fs-extra");

describe("Figma React Plugin CLI", () => {
  const projectPath = "/tmp/my-plugin";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("copies base template", () => {
    copyBaseTemplate(projectPath);
    expect(fs.copySync).toHaveBeenCalledWith(path.join(__dirname, "../template/base"), projectPath);
  });

  it("copies extras template if exists", () => {
    fs.existsSync.mockReturnValue(true);
    copyExtras("tailwind", projectPath);
    expect(fs.copySync).toHaveBeenCalledWith(
      path.join(__dirname, "../template/extras/tailwind"),
      projectPath,
      { overwrite: true }
    );
  });

  it("updates manifest.json correctly", () => {
    const fakeManifest = { name: "", id: "", description: "" };
    fs.readFileSync.mockReturnValue(JSON.stringify(fakeManifest));

    updateManifest(projectPath, "MyPlugin", "dev.user.myplugin", "Test plugin");
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join(projectPath, "manifest.json"),
      JSON.stringify(
        { name: "MyPlugin", id: "dev.user.myplugin", description: "Test plugin" },
        null,
        2
      )
    );
  });

  it("updates package.json with extras", () => {
    const fakePkg = { name: "", dependencies: {}, devDependencies: {} };
    fs.readFileSync.mockReturnValue(JSON.stringify(fakePkg));
    fs.existsSync.mockReturnValue(false);

    updatePackageJson(projectPath, "my-plugin", ["tailwind", "prettier"]);

    const writtenPkg = JSON.parse(fs.writeFileSync.mock.calls[0][1]);
    expect(writtenPkg.name).toBe("my-plugin");
    expect(writtenPkg.devDependencies.tailwindcss).toBeDefined();
    expect(writtenPkg.devDependencies.prettier).toBeDefined();
  });
});
