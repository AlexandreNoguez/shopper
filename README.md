# Shopper - Aplicação Fullstack para Gerenciamento de Corridas de Carro 🚖

## 📋 Visão Geral

O **Shopper** é uma aplicação fullstack desenvolvida para facilitar o gerenciamento de corridas de carro. O sistema permite que os usuários escolham motoristas, adicionem origem e destino, visualizem valores estimados e acompanhem a trajetória no mapa. A aplicação também oferece um histórico detalhado das viagens realizadas, tudo integrado com mapas interativos.

Este projeto foi desenvolvido como parte de um desafio técnico para demonstrar habilidades em desenvolvimento front-end, back-end, integração de APIs e arquitetura de sistemas.

---

## 🛠️ Tecnologias Utilizadas

### **Front-End**
- **React**: Construção de uma interface dinâmica e interativa.
- **Vite**: Ferramenta moderna para desenvolvimento rápido.
- **TypeScript**: Garantia de tipagem estática para maior confiabilidade no código.

### **Back-End**
- **Node.js**: Infraestrutura escalável e de alto desempenho.
- **Prisma**: ORM moderno para acesso e manipulação de banco de dados.
- **PostgreSQL**: Banco de dados relacional.

### **Infraestrutura**
- **Docker**: Containers para isolar e gerenciar serviços (client, API e banco de dados).
- **Google Routes API**: Integração para exibição de rotas e cálculo de distâncias.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos:
- **Docker** e **Docker Compose** instalados.

### Passos:
1. Clone o repositório:  
   ```bash
   git clone https://github.com/AlexandreNoguez/shopper.git
   cd shopper
   ```

2. Configure as variáveis de ambiente:
    - Crie um arquivo .env na raiz do projeto e insira as credenciais necessárias. Um exemplo de configuração pode ser encontrado em .env.example.
3. Execute o script start.sh:
    ```bash
    ./start.sh
    ```
    #### Observação para Windows (caso esteja usando WSL ou Git Bash):
      - Se você estiver em um ambiente Windows, mas usando WSL (Windows Subsystem for Linux) ou Git Bash, os passos acima funcionam normalmente. No entanto, se você estiver apenas no PowerShell ou Command Prompt, será necessário usar um terminal que suporte Bash para executar o script.
<!-- 3. Suba os containers com o Docker Compose:
  ```bash 
  docker compose up -d --build
  ``` -->
4. Acesse as aplicações:
    - Front-end: http://localhost
    - Back-end (API): http://localhost:8080


## 🧩 Funcionalidades

- Cadastro e Gerenciamento de Corridas

- Escolha de motoristas.
- Seleção de origem e destino.
- Exibição do valor estimado da corrida.
- Integração com o Google Routes API para traçar rotas e calcular distâncias.
- Histórico de Viagens
- Visualização de viagens passadas com detalhes sobre motorista, rotas e valores.
<!-- - Mapas Interativos -->

## 📌 Observações

- Este projeto foi desenvolvido como parte de um desafio técnico para avaliar habilidades em desenvolvimento fullstack.
- O foco foi na simplicidade, escalabilidade e boas práticas de desenvolvimento.
- Sinta-se à vontade para explorar o código e enviar sugestões ou melhorias via pull request.

📬 Contato

- Alexandre Noguez
- [LinkedIn](https://www.linkedin.com/in/alexandre-noguez/) | [GitHub](https://github.com/AlexandreNoguez)