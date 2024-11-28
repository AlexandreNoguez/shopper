#!/bin/sh

# Aguarda o banco de dados estar disponível
until pg_isready -h postgres_db -p 5432; do
  echo "Esperando pelo banco de dados..."
  sleep 2
done

# Executa os comandos do Prisma
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed

# Inicia o servidor
npm run dev
echo "Script executado com sucesso"
