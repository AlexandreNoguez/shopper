FROM node:22

WORKDIR /app

RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

COPY start.sh /app/server/
RUN chmod +x /app/server/start.sh

EXPOSE 8080

CMD npm run dev
