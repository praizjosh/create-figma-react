export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 140],
  },
  ignores: [(message) => message.startsWith("chore(release):")],
};
