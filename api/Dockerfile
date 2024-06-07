FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Instalar as dependências adicionais
RUN npm install express-session jsonwebtoken dotenv nodemailer

COPY . .

# Expor a porta 3000
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "server.js"]
