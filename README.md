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
| **Backend**     | [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), [SQLite](https://www.sqlite.org/) (dev) / [PostgreSQL](https://www.postgresql.org/) (prod) |
| **Frontend**    | [Next.js 14](https://nextjs.org/), [React 18](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/) |
| **Autenticação**| [JWT](https://jwt.io/), [Passport.js](http://www.passportjs.org/)                                        |
| **Banco de Dados** | [SQLite](https://www.sqlite.org/) (desenvolvimento), [PostgreSQL](https://www.postgresql.org/) (produção), [Prisma ORM](https://www.prisma.io/) |
| **Testes**      | [Jest](https://jestjs.io/), [Supertest](https://github.com/visionmedia/supertest), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) |
| **DevOps**      | [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/), [GitHub Actions](https://github.com/features/actions) |
| **Qualidade**   | [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/), [lint-staged](https://github.com/okonet/lint-staged), [commitlint](https://commitlint.js.org/) |

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/en/) (v18 ou superior)
- [npm](https://www.npmjs.com/) (v9 ou superior)
- [Docker](https://www.docker.com/get-started) (opcional, para produção)
- [Docker Compose](https://docs.docker.com/compose/install/) (opcional, para produção)

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

Copie os arquivos `.env.example` para `.env` em cada aplicação:

- **API (Backend)**:
  ```bash
  cp apps/api/.env.example apps/api/.env
  ```

- **Web (Frontend)**:
  ```bash
  cp apps/web/.env.example apps/web/.env
  ```

### 4. Configurar o Banco de Dados

O projeto está configurado para usar **SQLite** em desenvolvimento (mais simples) e **PostgreSQL** em produção.

#### Para Desenvolvimento (SQLite - Recomendado)

```bash
# Navegar para o diretório da API
cd apps/api

# Gerar o Prisma Client
npx prisma generate

# Criar e aplicar migrações
npx prisma migrate dev --name init

# Voltar para o diretório raiz
cd ../..
```

#### Para Desenvolvimento com PostgreSQL (Opcional)

Se preferir usar PostgreSQL em desenvolvimento, você precisará do Docker:

```bash
# Iniciar PostgreSQL com Docker
docker run --name tasks-pro-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=tasks_pro -p 5432:5432 -d postgres:15-alpine

# Atualizar o schema para PostgreSQL
# Edite apps/api/prisma/schema.prisma e mude:
# provider = "sqlite" para provider = "postgresql"

# Atualizar .env da API:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/tasks_pro?schema=public"
```

### 5. Rodar as Aplicações

Com o banco de dados configurado, inicie o backend e o frontend:

```bash
npm run dev
```

Este comando irá iniciar:
- **API (Backend)** na porta **3002**
- **Web (Frontend)** na porta **3000**

### 6. Acessar as Aplicações

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend (API)**: [http://localhost:3002](http://localhost:3002)
- **Documentação da API (Swagger)**: [http://localhost:3002/api](http://localhost:3002/api)

### 7. Credenciais de Teste

O banco de dados é populado automaticamente com usuários de teste:

- **Admin**: `admin@tasks-pro.com` / `admin123`
- **User**: `user@tasks-pro.com` / `user123`

## 🐳 Rodando com Docker (Produção)

Para simular o ambiente de produção com PostgreSQL, use o Docker Compose:

### 1. Iniciar os Serviços

```bash
# Para produção (com PostgreSQL)
docker-compose up -d

# Para desenvolvimento (apenas PostgreSQL)
docker-compose -f docker-compose.dev.yml up -d
```

### 2. Parar os Serviços

```bash
docker-compose down
```

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia os ambientes de desenvolvimento da API e do Web.
- `npm run build`: Compila as aplicações da API e do Web para produção.
- `npm run test`: Roda os testes unitários e de integração para ambas as aplicações.
- `npm run lint`: Executa o ESLint para análise de código.
- `npm run format`: Formata o código com Prettier.
- `npm run docker:dev`: Inicia apenas o PostgreSQL para desenvolvimento.
- `npm run docker:prod`: Inicia todos os serviços em modo de produção.
- `npm run docker:down`: Para todos os contêineres do Docker Compose.

## 🔄 CI/CD

O projeto está configurado com um pipeline de CI/CD usando **GitHub Actions** (`.github/workflows/ci.yml`).

⚠️ **Nota**: Os workflows do GitHub Actions precisam ser adicionados manualmente devido a limitações de permissão do GitHub App.

O pipeline executa os seguintes passos:

1.  **Lint & Format**: Verifica a formatação e a qualidade do código.
2.  **Test API**: Roda os testes unitários e e2e da API contra um banco de dados de teste.
3.  **Test Web**: Roda os testes do frontend.
4.  **Build**: Compila as aplicações e gera os artefatos.
5.  **Docker Build & Push**: (Apenas na branch `main`) Constrói e envia as imagens Docker para o GitHub Container Registry (GHCR).
6.  **Security Scan**: Analisa as dependências em busca de vulnerabilidades conhecidas.

## 🚀 Status do Projeto

- ✅ **Backend NestJS**: Funcionando na porta 3002
- ✅ **Frontend Next.js**: Funcionando na porta 3000
- ✅ **Banco SQLite**: Configurado e populado
- ✅ **Autenticação JWT**: Implementada e testada
- ✅ **RBAC**: Sistema de roles funcionando
- ✅ **Swagger**: Documentação disponível
- ✅ **Testes**: Unitários implementados
- ✅ **Docker**: Configurado para produção

## 🐛 Solução de Problemas

### Erro de Porta em Uso

Se encontrar erro de porta em uso, mate os processos:

```bash
# Matar processos na porta 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Matar processos na porta 3002 (backend)
lsof -ti:3002 | xargs kill -9
```

### Problemas com Prisma

Se encontrar problemas com o Prisma Client:

```bash
cd apps/api
npx prisma generate
npx prisma migrate reset --force
```

### Problemas com Dependências

Se encontrar problemas com dependências:

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
rm -rf apps/*/node_modules
npm install
```

## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Rodrigo Spisila** - *Desenvolvimento inicial* - [rodrigospisila](https://github.com/rodrigospisila)

## 🙏 Agradecimentos

- [NestJS](https://nestjs.com/) pela excelente framework backend
- [Next.js](https://nextjs.org/) pelo framework frontend moderno
- [Prisma](https://www.prisma.io/) pelo ORM intuitivo
- [Tailwind CSS](https://tailwindcss.com/) pelo sistema de design
