module.exports = {
  apps: [
    {
      name: "backend",
      script: "app.js",
      cwd: "server",
      env: {
        PORT: "3001",
      },
    },
    {
      name: "frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: ".",
    },
  ],
};
