# SuperSign - Desafio Técnico Full Stack

Este repositório contém a solução para o teste técnico de Desenvolvedor(a) Full Stack da SuperSign. O projeto consiste em uma pequena API e uma interface web para o gerenciamento de documentos.

## 🚀 Tecnologias e Ferramentas

O projeto foi dividido em duas partes principais: **Backend** e **Frontend**, utilizando as ferramentas modernas exigidas e recomendadas.

### Backend (`/backend`)

- **Node.js** com **Fastify** (Framework web rápido e de baixo overhead)
- **TypeScript** (Para tipagem estática e segurança)
- **Prisma ORM** (Para modelagem e acesso ao banco de dados)
- **PostgreSQL** (Banco de dados relacional)
- **Vitest** (Para testes automatizados rápidos)

### Frontend (`/frontend`)

- **Next.js 16** (Framework React com App Router)
- **React 19**
- **TypeScript**

---

## 🏗️ Arquitetura e Boas Práticas

O desenvolvimento do backend focou fortemente na qualidade estrutural, visando atingir todos os critérios obrigatórios e diferenciais da avaliação:

- **Clean Architecture (Arquitetura Limpa)**: O backend está organizado em camadas bem definidas (`domain`, `application`, `infra`, `presentation`), garantindo que a lógica de negócios seja independente de frameworks e do banco de dados.
- **Separação de Responsabilidades (Domain / Infra)**: Modelos de domínio puros e repositórios desacoplados da infraestrutura do Prisma.
- **Uso de DTOs**: Transferência de dados padronizada entre as camadas da aplicação (Presentation -> Application).
- **Testes Automatizados**: Implementados com Vitest para garantir a confiabilidade da aplicação.
- **Boas Práticas REST**: Endpoints padronizados para criação, listagem, atualização e deleção.
- **Tratamento de Erros**: Respostas estruturadas adequadamente conforme os status HTTP.

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos

- Node.js (v18 ou superior recomendado)
- PostgreSQL em execução (localmente ou via Docker, base de dados criada)

### 1. Configurando e Rodando o Backend

1.  Acesse a pasta do backend:
    ```bash
    cd backend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure as variáveis de ambiente baseando-se no arquivo de exemplo:
    - Crie um arquivo `.env` na raiz da pasta `backend`.
    - Copie o conteúdo de `.env.example` para `.env` e ajuste a variável `DATABASE_URL` com as credenciais do seu banco PostgreSQL.
4.  Execute as migrations do Prisma para criar as tabelas no banco de dados:
    ```bash
    npm run prisma:migrate
    ```
    _(Alternativamente: `npx prisma db push` / `npm run prisma:generate` dependendo do seu setup)_
5.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
    O backend estará rodando na porta definida (por padrão, \`http://localhost:5000\`).

**Para rodar os testes do backend:**

```bash
npm run test
```

### 2. Configurando e Rodando o Frontend

1.  Acesse a pasta do frontend a partir da raiz do projeto:
    ```bash
    cd frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
    O frontend estará acessível em \`http://localhost:3000\`.

---

## 📄 Funcionalidades Implementadas

- **Listar documentos:** Visualização de todos os documentos cadastrados.
- **Criar documento:** Cadastro de um novo documento informando título e descrição. Status inicial como "pendente".
- **Alterar status:** Funcionalidade para marcar o documento como "assinado".
- **Deletar documento:** (No backend) Rota para exclusão do documento.

**Nota sobre a interface:** Conforme orientações do desafio, a interface principal foca na funcionalidade e simplicidade, sem necessidade de design elaborado.

---

_Desenvolvido para o processo seletivo da SuperSign._
