# Simple-Banking-Application
Project REST API For A Simple Banking Application using NodeJS (Javascript) and Apollo GraphQL

## Project Specifications

- Register dan login user
- Post deposit to server
- Post withdraw to server
- Updated user balance data when post deposit or withdraw
- Stored via REST API
- Using mongodb as database
- Using expressjs framework, bcryptjs,jswonwebtoken etc for build server
- Using Apollo Graphql 

## Usage

- Before running the application, make sure you have installed pm2
- If you haven't installed it, follow the step: 
``` 
1. npm install pm2 -g

2.  untuk menjalankan pm2, ketik di root folder 
pm2 start

3. untuk melihat log yang terjadi ketik di root folder 
pm2 log

4. untuk mematikan pm2, ketika di root folder 
pm2 stop ecosystem.config.js
```

- If u using a windows, i prefer follow the step
```
1. Go to the root folder
- For example: ..Home/Simple-Banking-Application
2. Open the terminal
3. npm install
4. npm run dev
- This will be automatically run 2 services user and transaction
```

### Service User run on : http://localhost:9001

### Service Transactions run on : http://localhost:10001
