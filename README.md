# 🚀 Next.js Boilerplate (v2)

Template fullstack moderno e **opinado**, focado em alta performance, produtividade e padronização. Desenvolvido para servir como base sólida para aplicações Next.js escaláveis.

## 🛠 Pré-requisitos

- Node.js 18+
- Instância de PostgreSQL (Docker ou local)

## 🗄️ Database Setup

Este projeto vem configurado por padrão com **SQLite** para facilitar o desenvolvimento inicial.

### Opção A: Usando SQLite (Padrão)

O projeto já está pronto para uso. Basta rodar os comandos de banco mencionados abaixo.

### Opção B: Migrando para PostgreSQL

Se você decidir usar PostgreSQL em vez de SQLite, siga estes passos:

1. **Desinstalar o adaptador SQLite:**
    ```bash
    npm uninstall @prisma/adapter-better-sqlite3
    ```
2. **Instalar dependências do PostgreSQL:**
    ```bash
    npm install pg @prisma/adapter-pg
    npm install -D @types/pg
    ```
3. **Ajustar o `prisma/schema.prisma`:**
   No arquivo `prisma/schema.prisma`, comente as linhas do SQLite e descomente as do PostgreSQL no bloco `datasource db`.
4. **Modificar o `src/helpers/prisma.helper.ts`:**
   Siga as instruções comentadas dentro do arquivo para trocar o adaptador do SQLite pelo adaptador do PostgreSQL.

5. **Atualizar Variáveis de Ambiente:**
   Certifique-se de que seu `.env` contém uma `DATABASE_URL` válida para PostgreSQL.

## 🏎 Começando

1. **Instalar dependências:**

    ```bash
    npm install
    ```

2. **Configurar variáveis de ambiente:**
   Renomeie o `.env.example` para `.env` e preencha as credenciais do banco de dados.

3. **Configurar o Banco de Dados:**

    ```bash
    npm run db:generate
    npm run db:migrate:dev
    ```

4. **Interface Visual (Opcional):**

    ```bash
    npm run db:studio
    ```

5. **Iniciar servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

6. **Executar via Docker (Opcional):**
    ```bash
    docker-compose up -d
    ```

## 🐳 Docker

O projeto inclui suporte completo a Docker para desenvolvimento e produção.

- **`Dockerfile`**: Build multi-estágio otimizado para produção usando `standalone` output do Next.js.
- **`docker-compose.yml`**: Orquestra a aplicação e um banco de dados PostgreSQL.

Para iniciar o ambiente com **PostgreSQL**:
```bash
docker-compose --profile postgres up --build
```

Para iniciar apenas a aplicação usando **SQLite** (padrão do .env):
```bash
docker-compose up --build
```

## 🎨 Interface e Shadcn/UI

Para manter a aplicação leve e única em termos de design, este projeto foi projetado para utilizar o **shadcn/ui via CLI**.

> [!IMPORTANT]
> **NÃO** reutilize componentes e estilos de projetos anteriores mecanicamente. Para cada novo projeto, utilize o **shadcn/ui create** para fazer o setup inicial dos componentes base. Isso evita que todos os seus projetos tenham exatamente a mesma aparência e permite personalização total desde o início:
>
> 🔗 **[https://ui.shadcn.com/create](https://ui.shadcn.com/create)**

### 🎨 Ícones
Neste projeto, utilizamos o **`react-icons`**, priorizando a biblioteca **Lucide** (`react-icons/lu`) para manter a consistência visual.

## 📜 Convenções e Arquitetura

Este projeto segue regras estritas de arquitetura e qualidade de código documentadas no arquivo [`AGENTS.md`](./AGENTS.md).

## 🔍 SEO e Melhores Práticas

Este repositório inclui um guia completo com dicas de SEO, baseado no artigo de **Daniel Lima**:
🔗 **[Melhor Guia de SEO para Dev](https://www.tabnews.com.br/daniellimae/melhor-guia-do-seo-para-dev-usando-codigo-para-aumentar-sua-visualizacao-organica)**.

Você pode encontrar o guia localmente em [`SEO-SKILLS.md`](./SEO-SKILLS.md).

**Destaques:**

- Indentação de 4 espaços.
- Sem ponto e vírgula (`;`).
- Aspas duplas (`"`).
- Uso da palavra-chave `function` para funções utilitárias.
- **Backend Automático:** Utilize o comando `npm run ci` antes de cada commit importante para garantir que o projeto permanece estável.

## 🛣️ Rotas de API Implementadas

- `GET /api/auth/me` - Retorna os dados do usuário logado (token JWT).
- `GET /api/users` - Lista todos os usuários (Apenas Admin).
- `POST /api/users` - Cria um novo usuário (Apenas Admin).
- `GET /api/users/{id}` - Busca um usuário por ID (Admin ou o próprio Usuário).
- `PATCH /api/users/{id}` - Atualiza um usuário por ID (Admin ou o próprio Usuário).
- `DELETE /api/users/{id}` - Deleta um usuário por ID (Admin ou o próprio Usuário).

## 🤖 Scripts Úteis

- `npm run format`: Formata todo o código com Prettier.
- `npm run lint:fix`: Corrige problemas de linting automaticamente.
- `npm run ci`: Executa o fluxo completo de CI local (lint, format e testes com coverage).
- `npm run db:seed:dev`: Popula o banco com dados de teste usando `tsx`.

---

Feito com ❤️ por Marcuth.
