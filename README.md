# 🚀 PM2 Web Panel

Interface web moderna, rápida e auto-hospedada para gerenciamento de processos PM2. Desenvolvida com foco em performance bruta, experiência de usuário premium e zero configurações desnecessárias.

## 🛠 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Database:** [Prisma ORM](https://www.prisma.io/) (SQLite)
- **Validation:** [Zod](https://zod.dev/)
- **Components:** [React 19](https://react.dev/) + [Shadcn/UI](https://ui.shadcn.com/)

---

## ✨ Principais Funcionalidades

- **Dashboard Ecosystem:** Visão geral em tempo real da saúde do servidor, CPU e Memória RAM.
- **Gerenciamento de Projetos:** Listagem estilo Vercel para organizar seus workspaces.
- **Controle de Processos:** Inicie, pare, reinicie e exclua processos PM2 via interface.
- **Terminal Live:** Visualização minimalista de logs (stdout/stderr) em tempo real com estética de console real.
- **Integração Git:** Botão de pull direto para atualizar seus repositórios antes de reiniciar os processos.
- **Edição Dinâmica:** Gerencie variáveis de ambiente e configurações de runtime sem tocar em arquivos JSON.

---

## 🏎 Começando

1. **Instalar dependências:**
    ```bash
    npm install
    ```

2. **Configurar o Banco de Dados:**
    ```bash
    npm run db:generate
    npm run db:push
    ```

3. **Iniciar servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

---

## 🎨 Filosofia do Projeto

- **Performance & UX First:** Interface fluída com micro-animações e feedback instantâneo.
- **Zero SEO:** Aplicação focada em uso interno/administrativo. Sem meta tags ou rastreadores.
- **No Auth:** Acesso aberto para redes locais ou protegidas por VPN. Prioridade total na facilidade de acesso.
- **Premium Design:** Estética escura (Dark Mode) por padrão, inspirada em terminais modernos e ferramentas de desenvolvedor de alto nível.

## 📂 Convenções

- **Indentação:** 4 espaços.
- **Semicolons:** Não utilizados (`;` removidos).
- **Kebab-case:** Padrão para nomes de arquivos e componentes.

---

Feito com ❤️ por Marcuth.
