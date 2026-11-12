# Relatório Técnico — EscolaAtiva

> **Rascunho.** Revê o texto, escreve-o com as tuas palavras, adiciona as capturas de ecrã
> e exporta para PDF (ex.: copiar para o Word/Google Docs → Guardar como PDF).

**Disciplina:** Construção de Páginas Web (CPW) — 12.º ano
**Grupo:** ____________ **Turma:** ______ **Data:** 24/11/2026

---

## 1. Introdução e objetivos

Este projeto consistiu no desenvolvimento da **EscolaAtiva**, uma aplicação Web para registar, consultar e gerir
atividades escolares (workshops, visitas de estudo, concursos e eventos). A aplicação funciona totalmente no
navegador, sem servidor, guardando os dados no `localStorage`.

Objetivos:

- Compreender o conceito de *framework* e distingui-lo de *biblioteca*;
- Comparar tecnologias atuais do lado do cliente e justificar uma escolha;
- Construir uma aplicação responsiva e interativa baseada em componentes reutilizáveis;
- Testar, documentar e apresentar o trabalho desenvolvido.

## 2. Conceitos: framework e biblioteca

Uma **biblioteca** é um conjunto de funções/componentes que o programador chama quando precisa. O programador
controla o fluxo da aplicação. Exemplos: React, jQuery, Lodash.

Uma **framework** fornece uma estrutura completa e define como a aplicação se organiza; é a framework que chama o
código do programador (**inversão de controlo**). Exemplos: Angular, Vue.js (framework progressiva), Next.js.

| | Biblioteca | Framework |
|---|---|---|
| Quem controla o fluxo | O programador | A framework |
| Âmbito | Resolve um problema específico | Estrutura toda a aplicação |
| Flexibilidade | Elevada — escolhe-se o resto | Menor — segue as convenções |
| Exemplo | React (interface) | Angular (aplicação completa) |

**Frameworks de interface (CSS) vs. tecnologias de componentes e estado:**

- **Bootstrap** é uma framework de *apresentação*: fornece CSS (grelha, botões, formulários) e algum JavaScript.
  Não gere dados nem estado da aplicação.
- **React, Vue e Angular** gerem *componentes e estado*: atualizam a interface automaticamente quando os dados mudam.

Neste projeto usámos as duas camadas: **React** para os componentes e o estado, e **Bootstrap** para o aspeto visual
e a responsividade.

**Vantagens das frameworks/bibliotecas:** código organizado e reutilizável, menos código repetido, comunidade e
documentação, ferramentas de teste, desempenho otimizado (ex.: DOM virtual).

**Desvantagens:** curva de aprendizagem, dependência de terceiros e das suas atualizações, ficheiros finais maiores
do que JavaScript simples, pode ser excessivo para páginas muito simples.

## 3. Apresentação da tecnologia utilizada

**React** é uma biblioteca JavaScript criada pela Meta (Facebook) em 2013 para construir interfaces com
**componentes**. Conceitos usados no projeto:

- **Componentes** — funções que devolvem JSX (HTML dentro do JavaScript). Ex.: `ActivityCard`, `ActivityForm`.
- **Props** — dados passados de um componente pai para um filho.
- **Estado (`useState`, `useReducer`)** — dados que, quando mudam, fazem a interface atualizar sem recarregar.
- **Efeitos (`useEffect`)** — código executado quando algo muda (ex.: guardar no `localStorage`).
- **Context API** — partilha das atividades com todos os componentes sem passar props por vários níveis.

Ferramentas complementares: **Vite** (servidor de desenvolvimento e build), **React Router** (navegação entre
páginas), **Bootstrap 5** (CSS responsivo), **Vitest + Testing Library** (testes), **ESLint** (qualidade de código),
**Git/GitHub** (controlo de versões) e **GitHub Actions/Pages** (publicação automática).

## 4. Tabela comparativa

| Critério | **React** (escolhido) | **Vue.js** | **Angular** |
|---|---|---|---|
| Tipo | Biblioteca de interface | Framework progressiva | Framework completa |
| Criado por / ano | Meta, 2013 | Evan You, 2014 | Google, 2016 (AngularJS 2010) |
| Linguagem | JavaScript + JSX (TypeScript opcional) | JavaScript + templates HTML (TS opcional) | TypeScript (obrigatório) |
| Componentes | Funções com JSX e *hooks* | Ficheiros `.vue` (template, script, style) | Classes com decoradores + template |
| Gestão de estado | `useState`, `useReducer`, Context; externas (Redux, Zustand) | Reatividade integrada; Pinia | Serviços, RxJS, Signals |
| Curva de aprendizagem | Média (JSX, *hooks*) | Baixa a média | Elevada (TS, RxJS, injeção de dependências) |
| Organização do projeto | Livre — o grupo define a estrutura | Semi-guiada | Muito estruturada (módulos, serviços) |
| Documentação oficial | react.dev — tutoriais interativos | vuejs.org — muito clara, em vários idiomas | angular.dev — completa, tutoriais |
| Ecossistema | Muito grande (React Router, Next.js, React Native) | Grande (Vue Router, Nuxt, Pinia) | Tudo incluído (router, formulários, HTTP) |
| Adequação a este desafio | Boa: app pequena/média, foco em componentes | Boa: sintaxe simples | Possível, mas estrutura pesada para o tamanho do projeto |

**Critérios usados:** curva de aprendizagem, componentes, linguagem, organização, documentação, ecossistema e
adequação ao desafio (conforme o enunciado). As informações foram retiradas da documentação oficial de cada
tecnologia (ver referências).

## 5. Justificação da escolha

Escolhemos **React** pelos seguintes motivos:

1. **Adequação ao desafio** — a aplicação é de dimensão média e assenta em componentes reutilizáveis (cartões,
   formulário, filtros, janelas), que é precisamente o foco do React.
2. **Linguagem** — usa JavaScript, que já conhecíamos; o JSX é parecido com HTML. Angular exigiria aprender
   TypeScript, RxJS e injeção de dependências, o que não se justifica para este projeto.
3. **Ecossistema e documentação** — a documentação em react.dev tem exemplos interativos; existe muita informação
   disponível e bibliotecas maduras (React Router, Testing Library).
4. **Mercado e continuidade** — o mesmo conhecimento serve para Next.js (sites) e React Native (apps móveis).

O Vue.js seria também uma escolha válida e, na nossa opinião, com curva de aprendizagem ligeiramente mais suave
(os templates parecem HTML normal). Optámos por React pela maior flexibilidade na organização e por ser a
tecnologia que queríamos aprofundar. Não afirmamos que React é "sempre a melhor": para uma aplicação empresarial
grande com muitas equipas, a estrutura rígida do Angular poderia ser uma vantagem.

## 6. Descrição da aplicação e capturas de ecrã

**Funcionalidades:**

- Lista de atividades em cartões, com estatísticas (total, pendentes, concluídas, progresso);
- Adicionar e editar atividades com o mesmo formulário (componente reutilizável) e validação;
- Eliminar com janela de confirmação; marcar como concluída/pendente com um clique;
- Pesquisa por título (ignora maiúsculas e acentos), filtro por estado e categoria, ordenação;
- Persistência automática no `localStorage`;
- Próximos feriados nacionais obtidos de uma API pública (Nager.Date);
- Página "Sobre" com exportação dos dados para JSON e reposição de exemplos;
- Interface responsiva (telemóvel, tablet, computador) e preocupações de acessibilidade.

**Organização do código (R8):**

| Pasta | Responsabilidade |
|---|---|
| `src/components/` | Componentes visuais reutilizáveis |
| `src/pages/` | Páginas (uma por rota) |
| `src/context/` | Estado global e operações (adicionar, editar, eliminar) |
| `src/utils/` | Lógica pura: validação, filtros, `localStorage` |
| `src/styles/` | Estilos próprios |
| `src/__tests__/` | Testes automáticos |

**Capturas de ecrã** _(inserir)_:

1. Página principal no computador
2. Página principal no telemóvel (menu fechado e aberto)
3. Formulário com erros de validação
4. Janela de confirmação de eliminação
5. Pesquisa/filtros aplicados

## 7. Testes, dificuldades e soluções

**Testes automáticos** (`npm test`, 18 testes, todos a passar):

| Teste | Resultado |
|---|---|
| Submeter formulário vazio → mostra erros e não guarda | ✔ |
| Título só com espaços / demasiado curto | ✔ rejeitado |
| Data em formato inválido, estado desconhecido | ✔ rejeitado |
| Pesquisar "ROBOTICA" encontra "Robótica" | ✔ |
| Filtrar por estado e categoria, ordenar | ✔ |
| Adicionar → editar → eliminar (fluxo completo) | ✔ |
| Recarregar a página mantém as atividades (`localStorage`) | ✔ |
| Dados corrompidos no `localStorage` não bloqueiam a app | ✔ |

**Testes manuais:** computador (Chrome/Edge, 1920 px), telemóvel emulado (375 px), navegação apenas com teclado,
sem ligação à Internet (o widget de feriados mostra uma mensagem e o resto funciona).

**Dificuldades e soluções** _(adaptar às vossas)_:

| Dificuldade | Solução |
|---|---|
| Partilhar as atividades entre várias páginas | Context API + `useReducer` num único `ActivitiesProvider` |
| Pesquisa não encontrava palavras com acentos | Função `normalizar()` que remove acentos antes de comparar |
| Menu do Bootstrap não abria sem o JavaScript do Bootstrap | Controlar a abertura com `useState` no React |
| Ao publicar no GitHub Pages, as rotas davam erro 404 | Usar `HashRouter` e `base: './'` no Vite |
| A notificação desaparecia antes do tempo | Memorizar a função com `useCallback` para o temporizador não reiniciar |

## 8. Conclusão e referências

O projeto cumpre os requisitos R1 a R8 e várias funcionalidades opcionais. Aprendemos a diferença entre
bibliotecas e frameworks, a pensar a interface em componentes e a separar a lógica da apresentação. Como
melhorias futuras: sincronizar dados com um servidor, autenticação de utilizadores e calendário visual.

**Referências:**

- React — documentação oficial: <https://react.dev/learn>
- Vue.js — guia oficial: <https://vuejs.org/guide/introduction.html>
- Angular — documentação oficial: <https://angular.dev/tutorials>
- Bootstrap 5 — documentação: <https://getbootstrap.com/docs/>
- React Router: <https://reactrouter.com>
- Vite: <https://vite.dev/guide/>
- MDN — Web Storage API (`localStorage`): <https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage>
- MDN — JavaScript: <https://developer.mozilla.org/en-US/docs/Web/JavaScript>
- Nager.Date — API de feriados: <https://date.nager.at/Api>
- Vitest: <https://vitest.dev>
