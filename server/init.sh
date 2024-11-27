#!/bin/sh

# Aguarda o banco de dados estar disponível
# until nc -z -v -w30 postgres 5432
# do
#   echo "Aguardando o banco de dados PostgreSQL..."
#   sleep 1
# done

# echo "Banco de dados está disponível. Continuando..."

# Executa as migrações do Prisma
npx prisma migrate dev

# Popula o banco de dados com o seed
npx tsx prisma/seed.ts

# Inicia o servidor
npm run dev
