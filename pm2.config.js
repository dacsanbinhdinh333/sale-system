module.exports = {
  apps: [
    {
      name: "backend",
      script: "server/app.js",
      cwd: "server",
    },
    {
      name: "frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: ".",
    },
  ],
};
