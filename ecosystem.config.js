module.exports = {
  apps: [
    {
      name: "api-3000",
      script: "server.js",
      env: { PORT: 3000 }
    },
    {
      name: "api-3001",
      script: "server.js",
      env: { PORT: 3001 }
    },
    {
      name: "api-3002",
      script: "server.js",
      env: { PORT: 3002 }
    }
  ]
};