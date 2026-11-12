# EscolaAtiva

Aplicação Web para **registar, consultar e gerir atividades escolares** (workshops, visitas de estudo, concursos, eventos…).
Projeto prático da disciplina de Construção de Páginas Web (CPW) — 12.º ano.

**Tecnologia principal:** [React](https://react.dev) (biblioteca de componentes), com [Bootstrap](https://getbootstrap.com) (framework CSS), [React Router](https://reactrouter.com) e [Vite](https://vite.dev).

---

## Requisitos

| Software | Versão mínima | Verificar com |
|----------|---------------|---------------|
| [Node.js](https://nodejs.org) (inclui o npm) | 18 (recomendado 20 LTS ou superior) | `node -v` |
| [Git](https://git-scm.com) (só para clonar) | qualquer | `git --version` |
| Navegador moderno | Chrome, Edge, Firefox ou Safari | — |

Não é preciso servidor nem base de dados: os dados ficam guardados no `localStorage` do navegador.

## Instalação

```bash
git clone https://github.com/<UTILIZADOR>/escola-ativa.git
cd escola-ativa
npm install
```

(Ou descompactar o ZIP, abrir a pasta `escola-ativa` num terminal e correr `npm install`.)

## Execução

```bash
npm run dev
```

Abrir no navegador o endereço que aparece no terminal (normalmente <http://localhost:5173>).

### Outros comandos

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento com recarregamento automático |
| `npm test` | Corre os testes automáticos (Vitest) |
| `npm run lint` | Verifica a qualidade do código (ESLint) |
| `npm run build` | Gera a versão final otimizada na pasta `dist/` |
| `npm run preview` | Serve a versão de `dist/` para testar localmente |

## Versão online

Cada `git push` para o ramo `main` publica automaticamente a aplicação no **GitHub Pages** (ver `.github/workflows/deploy.yml`):
`https://<UTILIZADOR>.github.io/escola-ativa/`

## Funcionalidades

### Requisitos obrigatórios

| N.º | Requisito | Onde está implementado |
|-----|-----------|------------------------|
| R1 | Interface responsiva | Grelha do Bootstrap (`col-12 col-md-6 col-xl-4`), menu que colapsa no telemóvel, `src/styles/app.css` |
| R2 | Componentes reutilizáveis | 11 componentes em `src/components/` (ex.: `ActivityForm` usado para criar **e** editar, `ConfirmModal`, `StatCard`, `ActivityCard`) |
| R3 | Adicionar, listar, editar, eliminar | `ActivitiesContext.jsx` (reducer) + páginas `HomePage`, `NewActivityPage`, `EditActivityPage` |
| R4 | Pesquisa por título e filtro por estado | `SearchFilters.jsx` + `utils/filters.js` (ignora maiúsculas e acentos) |
| R5 | Validação | `utils/validation.js` + `ActivityForm.jsx` (mensagens por campo, foco no 1.º erro) |
| R6 | Interatividade sem recarregar | SPA em React: estado + React Router, nada recarrega a página |
| R7 | Persistência em localStorage | `utils/storage.js` + `useEffect` no `ActivitiesContext` |
| R8 | Organização | Pastas separadas para componentes, páginas, contexto (estado), utilitários (lógica) e estilos |

### Funcionalidades opcionais

- **Categorias** e filtro por categoria
- **Ordenação** por data ou título
- **Navegação entre páginas** (React Router)
- **Mensagens de confirmação** (janela antes de eliminar + notificações "toast")
- **Acessibilidade**: etiquetas em todos os campos, `aria-invalid`, `aria-live`, link "Saltar para o conteúdo", foco visível, navegação por teclado (Esc fecha a janela)
- **Consumo de API pública**: próximos feriados em Portugal ([Nager.Date](https://date.nager.at))
- Estatísticas (total, pendentes, concluídas, progresso), aviso de data ultrapassada, exportar para JSON
- **Testes automáticos** (18 testes) e **deploy automático** no GitHub Pages

Cada atividade tem: **título, descrição, data, estado (pendente/concluída)**, categoria e local (opcional).

## Estrutura do projeto

```
escola-ativa/
├── public/                  ficheiros estáticos (ícone)
├── src/
│   ├── components/          componentes reutilizáveis (interface)
│   │   ├── ActivityCard.jsx
│   │   ├── ActivityForm.jsx
│   │   ├── ActivityList.jsx
│   │   ├── ConfirmModal.jsx
│   │   ├── EmptyState.jsx
│   │   ├── HolidaysWidget.jsx
│   │   ├── Navbar.jsx
│   │   ├── SearchFilters.jsx
│   │   ├── StatCard.jsx
│   │   ├── StatusBadge.jsx
│   │   └── Toast.jsx
│   ├── pages/               uma página por rota
│   ├── context/             estado global (Context API + useReducer)
│   ├── utils/               lógica pura: validação, filtros, localStorage
│   ├── styles/app.css       estilos próprios
│   ├── __tests__/           testes automáticos
│   ├── App.jsx              layout e rotas
│   └── main.jsx             ponto de entrada
├── docs/RELATORIO.md        rascunho do relatório
├── index.html
├── package.json
└── vite.config.js
```

## Testes

```bash
npm test
```

Os testes verificam: validação com formulários incompletos, pesquisa com/sem acentos, filtros e ordenação,
guardar/recuperar do `localStorage` (incluindo dados corrompidos) e o fluxo completo adicionar → editar → eliminar.

## Autores

- _Nome do aluno 1_
- _Nome do aluno 2_
