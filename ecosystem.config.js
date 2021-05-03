module.exports = {
  apps: [
    {
      name: 'simple-banking-app - Service User',
      script: 'cd services/users && npm install && npm run dev'
    },
    {
      name: 'simple-banking-app- Service Transaction',
      script: 'cd services/transactions && npm install && npm run dev'
    },
  ],
};