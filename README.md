# Tasks Pro

![CI/CD Pipeline](https://github.com/rodrigospisila/tasks-pro/actions/workflows/ci.yml/badge.svg)

**Tasks Pro** é uma aplicação full-stack completa para gerenciamento de tarefas, construída com as tecnologias mais modernas para desenvolvimento web. O projeto serve como um exemplo robusto e pronto para produção, demonstrando as melhores práticas em arquitetura de software, segurança e automação.

## ✨ Funcionalidades

- **Autenticação de Usuários**: Sistema seguro de login e registro com JWT (JSON Web Tokens).
- **Controle de Acesso Baseado em Função (RBAC)**: Duas roles de usuário (ADMIN e USER) com permissões distintas.
- **Gerenciamento de Tarefas (CRUD)**: Funcionalidades completas para criar, ler, atualizar e deletar tarefas.
- **Interface Moderna e Responsiva**: Frontend construído com Next.js 14 e App Router, otimizado para performance e SEO.
- **Tema Dark/Light**: Alternância de tema para melhor experiência do usuário.
- **Validação de Dados**: Validação robusta no backend com `class-validator` e no frontend com `React Hook Form` + `Zod`.
- **Documentação de API**: Geração automática de documentação interativa com Swagger (OpenAPI).
- **Ambiente Containerizado**: Configuração completa com Docker e Docker Compose para desenvolvimento e produção.
- **CI/CD**: Pipeline de integração e entrega contínua com GitHub Actions para automação de testes, build e deploy.
- **Qualidade de Código**: Ferramentas como ESLint, Prettier, Husky e lint-staged para garantir um código limpo e padronizado.

## 🚀 Tech Stack

| Categoria       | Tecnologia                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| **Monorepo**    | [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)                                     |
| **Backend**     | [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/) |
| **Frontend**    | [Next.js 14](https://nextjs.org/), [React 18](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/) |
| **Autenticação**| [JWT](https://jwt.io/), [Passport.js](http://www.passportjs.org/)                                        |
| **Banco de Dados** | [PostgreSQL](https://www.postgresql.org/), [Prisma ORM](https://www.prisma.io/)                         |
| **Testes**      | [Jest](https://jestjs.io/), [Supertest](https://github.com/visionmedia/supertest), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) |
| **DevOps**      | [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/), [GitHub Actions](https://github.com/features/actions) |
| **Qualidade**   | [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/), [lint-staged](https://github.com/okonet/lint-staged), [commitlint](https://commitlint.js.org/) |

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/en/) (v18 ou superior)
- [npm](https://www.npmjs.com/) (v9 ou superior)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 🛠️ Instruções de Desenvolvimento Local

Siga os passos abaixo para configurar e rodar o ambiente de desenvolvimento.

### 1. Clonar o Repositório

```bash
git clone https://github.com/rodrigospisila/tasks-pro.git
cd tasks-pro
```

### 2. Instalar Dependências

Instale todas as dependências do monorepo a partir do diretório raiz:

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Copie os arquivos `.env.example` para `.env` em cada aplicação e ajuste as variáveis se necessário.

- **API (Backend)**:
  ```bash
  cp apps/api/.env.example apps/api/.env
  ```

- **Web (Frontend)**:
  ```bash
  cp apps/web/.env.example apps/web/.env
  ```

### 4. Iniciar o Banco de Dados com Docker

Para o desenvolvimento, você pode rodar apenas o banco de dados PostgreSQL e o Redis (opcional) com Docker Compose:

```bash
npm run docker:dev
```

Este comando utiliza o arquivo `docker-compose.dev.yml`.

### 5. Rodar as Aplicações

Com o banco de dados rodando, inicie o backend e o frontend em terminais separados ou usando o script principal.

- **Para rodar ambos simultaneamente (recomendado)**:
  ```bash
  npm run dev
  ```

- **Para rodar individualmente**:
  - **API (Backend)**:
    ```bash
    npm run dev:api
    ```
  - **Web (Frontend)**:
    ```bash
    npm run dev:web
    ```

### 6. Acessar as Aplicações

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend (API)**: [http://localhost:3001](http://localhost:3001)
- **Documentação da API (Swagger)**: [http://localhost:3001/api](http://localhost:3001/api)

### 7. Credenciais de Teste

O banco de dados é populado com usuários de teste via `prisma db seed`:

- **Admin**: `admin@tasks-pro.com` / `admin123`
- **User**: `user@tasks-pro.com` / `user123`

## 🐳 Rodando com Docker (Produção)

Para simular o ambiente de produção, onde todas as aplicações são containerizadas, use o `docker-compose.yml` principal.

### 1. Iniciar os Serviços

```bash
npm run docker:prod
```

Este comando irá construir as imagens Docker para a API e o Frontend e iniciar todos os serviços (Postgres, API, Web).

### 2. Parar os Serviços

```bash
npm run docker:down
```

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia os ambientes de desenvolvimento da API e do Web.
- `npm run build`: Compila as aplicações da API e do Web para produção.
- `npm run test`: Roda os testes unitários e de integração para ambas as aplicações.
- `npm run lint`: Executa o ESLint para análise de código.
- `npm run format`: Formata o código com Prettier.
- `npm run docker:dev`: Inicia os serviços de infraestrutura para desenvolvimento.
- `npm run docker:prod`: Inicia todos os serviços em modo de produção.
- `npm run docker:down`: Para todos os contêineres do Docker Compose.

## 🔄 CI/CD

O projeto está configurado com um pipeline de CI/CD usando **GitHub Actions** (`.github/workflows/ci.yml`).

O pipeline é acionado em cada `push` ou `pull_request` para as branches `main` e `develop` e executa os seguintes passos:

1.  **Lint & Format**: Verifica a formatação e a qualidade do código.
2.  **Test API**: Roda os testes unitários e e2e da API contra um banco de dados de teste.
3.  **Test Web**: Roda os testes do frontend.
4.  **Build**: Compila as aplicações e gera os artefatos.
5.  **Docker Build & Push**: (Apenas na branch `main`) Constrói e envia as imagens Docker para o GitHub Container Registry (GHCR).
6.  **Security Scan**: Analisa as dependências em busca de vulnerabilidades conhecidas.

Um workflow de deploy (`deploy.yml`) também está configurado para ser acionado manualmente ou em novas releases, demonstrando um fluxo de deploy para ambientes de `staging` ou `production`.

