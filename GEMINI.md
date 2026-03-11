# 🚀 Fullstack Project Overview (Next.js 16 + Tailwind 4)

Este projeto é um **Boilerplate Fullstack** moderno, focado em escalabilidade, composição de componentes e tipagem rigorosa. Ele utiliza as versões mais recentes do ecossistema React/Next.js.

## 🛠 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Banco de Dados:** [Prisma ORM](https://www.prisma.io/)
- **Validação:** [Zod](https://zod.dev/)
- **Componentes:** [React 19](https://react.dev/) (Arquitetura de Composição)

---

## 📐 Convenções de Arquitetura

### 1. Componentes & UI

- **Composição:** Siga o padrão _Component Composition_ para evitar o "prop drilling" e criar componentes flexíveis.
- **Definição:** Use sempre `const` para definir componentes e seus métodos internos.
- **Exports:** Componentes de página ou componentes principais de arquivos devem ser exportados como `default`.
- **Tipagem:** A menos que a tipagem precise ser exportada, nomeie-a apenas como `Props`.
- **Nomenclatura:** Arquivos devem usar `kebab-case.tsx`.
- **Ícones:** Utilize preferencialmente a biblioteca **Lucide** através do pacote `react-icons/lu`.

### 2. Organização de Arquivos (`src/`)

- **`app/`**: Contém todas as páginas, layouts e componentes exclusivos de página.
    - Componentes que pertencem apenas a uma página devem ficar em uma subpasta `components/` dentro do diretório da respectiva página.
- **`schemas/`**: Esquemas de validação Zod.
    - Cada entidade deve possuir seu próprio diretório para organizar os schemas relacionados (Ex: `src/schemas/users`).
    - Nome do arquivo: `{name}.schema.ts` (kebab-case).
    - Exportação: Named export do schema e do tipo inferido `{name}Values` ou `{name}FormValues`.
- **Autenticação:** Utilize o padrão `sign-up`, `sign-in` e `sign-out` para rotas e métodos relacionados a autenticação.
- **`hooks/`**: Hooks customizados.
    - Nome do arquivo: `{name}.hook.ts`.
    - Pasta especial: `hooks/forms/` para centralizar a lógica de formulários.
- **`services/`**: Camada de comunicação com APIs ou Banco de Dados.
    - Nome do arquivo: `{name}.service.ts`.
    - Exportação: Named export.
- **`utils/`**: Funções utilitárias (formatação, cálculos, validações simples, encriptação).
    - Nome do arquivo: `{name}.util.ts`.
    - Exportação: Named export.
    - Preferências: Utilize a palavra-chave `function` em vez de `const` para funções utilitárias. Não utilize comentários internos no código.

- **`helpers/`**: Funções auxiliares e constantes globais.

### 2. Rotas de API (Padrão NestJS)

As rotas de API devem seguir a convenção RESTful inspirada no NestJS para manter a consistência e previsibilidade:

- `POST /` - Cria uma nova entidade.
- `GET /` - Busca uma lista de entidades (com suporte a filtros/paginação).
- `GET /{id}` - Busca uma única entidade pelo ID.
- `PATCH /{id}` - Atualiza parcialmente uma entidade existente.
- `DELETE /{id}` - Remove uma entidade do sistema.

### 3. Estilo de Código (Prettier & Lint)

- **Indentação:** 4 espaços.
- **Semicolons:** Não utilizar ponto e vírgula (`;`).
- **Aspas:** Utilizar aspas duplas (`"`).
- **Sem Comentários:** Evite adicionar comentários explicativos dentro do código, a menos que seja estritamente necessário para lógica complexa.

---

## 🗄️ Gerenciamento de Banco de Dados (Prisma)

O projeto utiliza **Prisma ORM**. Todas as interações com o banco devem seguir estes comandos:

- **Migrations:**
    - `npm run db:migrate:dev`: Cria e aplica uma nova migration em desenvolvimento.
    - `npm run db:migrate:deploy`: Aplica migrations pendentes em produção.
    - `npm run db:migrate:reset`: Reseta o banco de dados (Cuidado: apaga todos os dados).
- **Sincronização:**
    - `npm run db:push`: Sincroniza o schema diretamente com o banco sem criar arquivos de migration.
    - `npm run db:generate`: Gera o Prisma Client em `src/generated/prisma`. **Sempre execute após alterar o `schema.prisma`**.
- **Interface & Dados:**
    - `npm run db:studio`: Abre o Prisma Studio para visualizar e editar dados via interface web.
    - `npm run db:seed`: Executa o script de seed principal.
    - `npm run db:seed:dev`: Executa o seed de desenvolvimento usando `tsx`.

---

## 🚀 Metodologia de Trabalho

- **XP & Pair Programming:** Este projeto é desenvolvido seguindo princípios de *Extreme Programming*. Operamos em *Pair Programming* constante, onde o **USUÁRIO** atua como o navegador/mentor que direciona a visão e as regras, e o **AGENTE (AI)** atua como o executor que transforma as ideias em código funcional.
- **Autonomia com Colaboração:** Embora o AGENTE seja o executor principal, ele possui autonomia para opinar, sugerir melhorias arquiteturais, apontar possíveis débitos técnicos e tomar decisões técnicas fundamentadas para garantir que o boilerplate permaneça robusto e dentro das melhores práticas.
- **Pagamento de Débitos Técnicos:** Débitos técnicos devem ser quitados antes da implementação de novas funcionalidades. Isso inclui a refatoração de componentes grandes em sub-componentes menores, limpeza de código, melhoria de tipagens e garantia de que a base de código permaneça limpa e sustentável.

## 🤖 Diretrizes para Agentes AI

Ao trabalhar neste projeto, siga estas regras:

1. **Validação Primeiro:** Antes de criar formulários ou serviços, defina o Schema Zod em `src/schemas`.
2. **Modularização:** Se um componente começar a crescer demais, extraia sub-componentes usando o padrão de composição.
3. **Padrão de Funções:** Para utilitários e lógica geral, utilize a palavra-chave `function` em vez de `const`.
4. **Qualidade do Código:** Sempre que realizar alterações, você deve:
    - Executar `npm run ci` regularmente para garantir que o lint, format e os testes estão passando.
    - O script `ci` é o padrão ouro para validação local antes de commits ou deploys.
5. **Prisma:** O cliente do Prisma é gerado em `src/generated/prisma`. Use-o para interações com o banco de dados.
6. **Tailwind 4:** Use as novas funcionalidades do Tailwind 4. Evite CSS arbitrário se houver uma utilidade nativa.
7. **Clean Code:** Mantenha as funções pequenas, use nomes descritivos e siga o princípio de responsabilidade única.
8. **Testes Unitários:**
    - O backend deve ter uma cobertura de **100% de testes**.
    - Utilize o **Vitest** como runner de testes.
    - Testes devem ser escritos a cada nova implementação de serviço, utilitário ou lógica de negócio relevante.
    - Utilize os comandos `npm run test` ou `npm run test:coverage` para validar a implementação.
9. **Docker:** O projeto utiliza builds multi-estágio e `standalone` output no Dockerfile para otimização de imagem. O `docker-compose.yml` já configura o ambiente com PostgreSQL.

---

## 📁 Estrutura de Pastas Resumida

```text
/src
 ├── app/          # Rotas, Layouts e Componentes de Página
 ├── components/   # Componentes Globais/Shared
 ├── helpers/      # Utilitários (Ex: messages.helper.ts)
 ├── hooks/        # Hooks (Ex: use-auth.hook.ts)
 ├── schemas/      # Validações Zod (Ex: user.schema.ts)
 ├── services/     # Lógica de Negócio e Dados
 ├── utils/        # Utilitários (Ex: currency.util.ts)
 └── generated/    # Código gerado (Prisma Client)

```
