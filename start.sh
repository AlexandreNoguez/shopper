#!/bin/bash

# Função para verificar o status do último comando executado
check_status() {
    if [ $? -ne 0 ]; then
        echo "❌ Ocorreu um erro no passo anterior. Abortando."
        exit 1
    fi
}

echo "🚀 Iniciando a configuração do projeto Shopper..."

# Acessar a pasta client e instalar as dependências
echo "📂 Acessando a pasta client..."
cd client || exit
echo "📦 Instalando dependências do front-end (client)..."
npm install
check_status

# Voltar para a raiz do projeto
cd ..
check_status

# Acessar a pasta server e instalar as dependências
echo "📂 Acessando a pasta server..."
cd server || exit
echo "📦 Instalando dependências do back-end (server)..."
npm install
check_status

# Voltar para a raiz do projeto
cd ..
check_status

# Subir os containers Docker
echo "🐳 Subindo os containers Docker..."
docker compose up -d --build
check_status

echo "✅ Projeto configurado e containers em execução!"
echo "🌐 Front-end disponível em: http://localhost"
echo "🌐 Back-end (API) disponível em: http://localhost:8080"
