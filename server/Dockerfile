FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
# RUN npx prisma migrate deploy
# RUN npx prisma db prisma:seed

# COPY init.sh /app/
# RUN chmod +x /app/init.sh

EXPOSE 8080

# CMD npx prisma migrate deploy && npx prisma db seed && npm run dev
CMD npx prisma db seed && npm run dev

# CMD ["npm", "run", "dev"]

# CMD ["sh", "/app/init.sh"]
