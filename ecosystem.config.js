module.exports = {
  apps: [
    {
      name: 'simple-banking-app - Orchestrator-Graphql',
      script: './orchestrator-grapql && npm install && nodemon app.js'
    },
    {
      name: 'simple-banking-app - Service User',
      script: './services/users && npm install && npm run dev'
    },
    {
      name: 'simple-banking-app Service Transaction',
      script: './services/users && npm install && npm run dev'
    },
  ],
};