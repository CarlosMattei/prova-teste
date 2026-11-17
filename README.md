
# 🚀 Hackathon Full Stack — TaskFlow
### Expo + Java Spring Boot + Angular

> ⏱️ **Desafio:** desenvolver, em equipe, uma aplicação full stack integrada em **3 horas e 30 minutos (210 minutos)**.
>
> **Equipes:** 3 a 4 alunos.  
> **Tecnologias obrigatórias:** Java Spring Boot, Angular, Expo/React Native e GitHub.

---

## 1. Contexto do desafio

Uma equipe precisa organizar suas atividades e acompanhar o andamento de tarefas. Sua missão é desenvolver o **TaskFlow**, um gerenciador de tarefas compartilhadas com uma API Java e duas interfaces: uma aplicação web Angular e uma aplicação mobile Expo.

As duas interfaces deverão consumir **a mesma API REST**. Uma tarefa cadastrada no Angular deverá aparecer no Expo; a alteração de status realizada no Expo deverá ser refletida no Angular ao consultar novamente os dados.

**Objetivo:** demonstrar domínio técnico, integração de sistemas, planejamento, colaboração, versionamento e revisão de código.

## 2. Requisitos funcionais

A entidade `Tarefa` deverá conter:

| Campo | Tipo | Regra |
|---|---|---|
| `id` | Long | Gerado automaticamente |
| `titulo` | String | Obrigatório |
| `descricao` | String | Opcional |
| `responsavel` | String | Obrigatório |
| `status` | String | PENDENTE, EM_ANDAMENTO ou CONCLUIDA |
| `prioridade` | String | BAIXA, MEDIA ou ALTA |

### 2.1. Backend — Java Spring Boot

Criar uma API REST com persistência H2 e organização em **Entity, Repository, Service e Controller**.

| Método | Rota | Operação |
|---|---|---|
| GET | `/api/tarefas` | Listar |
| GET | `/api/tarefas/{id}` | Consultar por ID |
| POST | `/api/tarefas` | Cadastrar |
| PUT | `/api/tarefas/{id}` | Editar |
| PATCH | `/api/tarefas/{id}/status` | Alterar status |
| DELETE | `/api/tarefas/{id}` | Excluir |

A API deverá validar campos obrigatórios, configurar CORS e retornar códigos HTTP adequados. DTOs e mapeadores podem ser utilizados conforme os conteúdos estudados.

### 2.2. Frontend Web — Angular

Implementar interface que permita:

- Listar tarefas consumindo a API Java;
- Cadastrar tarefas;
- Editar tarefas;
- Excluir tarefas;
- Filtrar tarefas por status.

Utilizar componentes Angular, formulários e serviço HTTP. Não será aceita uma interface que funcione somente com dados estáticos.

### 2.3. Aplicativo Mobile — Expo

Implementar:

- Tela de listagem de tarefas;
- Tela de detalhes;
- Alteração do status de uma tarefa;
- Consumo da API Java por Axios ou Fetch;
- Navegação entre telas.

O aplicativo deverá utilizar componentes React Native e exibir dados reais da API.

### 2.4. Demonstração obrigatória de integração

1. Cadastrar uma tarefa no Angular;
2. Consultar a tarefa no Expo;
3. Alterar seu status pelo Expo;
4. Atualizar a consulta no Angular e comprovar o novo status.

**Não é necessário:** autenticação, hospedagem em nuvem, geração de APK ou publicação nas lojas. O sistema poderá ser executado localmente.

---

## 3. GitHub — Regras obrigatórias

Cada grupo deverá criar um repositório próprio com esta estrutura:

```text
hackathon-taskflow-grupo-XX/
├── backend/
├── frontend-web/
├── frontend-mobile/
├── README.md
└── .gitignore
```

### 3.1. Branches e Pull Requests

- A branch `main` será a versão oficial do projeto.
- Depois da configuração inicial, **não serão permitidos commits diretos na main**.
- Cada funcionalidade deverá ser desenvolvida em branch específica, por exemplo:
  - `feat/api-tarefas`
  - `feat/angular-listagem`
  - `feat/expo-status`
- Toda alteração deverá ser incorporada à main por **Pull Request (PR)**.
- Cada PR deverá conter título e descrição das mudanças e ser revisado por outro integrante antes do merge.
- Cada equipe deverá concluir **no mínimo 3 PRs**, com participação de diferentes integrantes.
- Recomenda-se proteger a main exigindo PR e aprovação, caso as permissões do repositório permitam.

### 3.2. Padrão de commits

Seguir o padrão de commits apresentado nas aulas, utilizando emoji, tipo e descrição objetiva.

```bash
git commit -m ":sparkles: feat: Implementa API de tarefas"
git commit -m ":sparkles: feat: Cria listagem Angular"
git commit -m ":bug: fix: Corrige atualização de status"
git commit -m ":books: docs: Atualiza instruções do README"
git commit -m ":test_tube: test: Adiciona teste de serviço"
```

Mensagens genéricas como `update`, `teste`, `alterações` ou `final` não atendem ao padrão.

---

## 4. GitHub Projects — Gestão das tarefas

Criar um **GitHub Project** com visualização Board e pelo menos três colunas:

| A fazer | Em andamento | Concluído |
|---|---|---|
| Tarefas planejadas | Tarefas em execução | Tarefas finalizadas |

**Requisitos:**

- Cadastrar pelo menos **6 tarefas**, preferencialmente como GitHub Issues;
- Cada tarefa deverá ter título, descrição e responsável;
- Movimentar as tarefas durante a execução do hackathon;
- Ter pelo menos **3 tarefas concluídas** na entrega;
- Sempre que possível, vincular Issues e PRs.

A avaliação considerará a utilização efetiva do quadro, e não apenas sua criação.

---

## 5. Organização da equipe

| Integrante | Responsabilidade sugerida |
|---|---|
| Aluno 1 | API Java Spring Boot e H2 |
| Aluno 2 | Interface Angular |
| Aluno 3 | Aplicativo Expo |
| Aluno 4, se houver | Integração, testes, README e apoio |

Todos deverão participar da gestão das tarefas, da revisão de PRs e da validação do resultado. Em equipes de três, integração e documentação serão compartilhadas.

---

## 7. Critérios de avaliação — Nota máxima 10,0

| Critério | Pontos | O que será avaliado |
|---|---:|---|
| Backend Java Spring Boot | 2,0 | API REST, H2, camadas, validação e funcionamento |
| Frontend Angular | 1,5 | CRUD, componentes, formulários e consumo da API |
| Aplicativo Expo | 1,5 | Listagem, detalhes, atualização de status e API |
| Integração das três tecnologias | 1,5 | Fluxo completo Angular → Java → Expo → Java → Angular |
| GitHub, branches e PRs | 1,5 | Branches, PRs revisados, commits padronizados e colaboração |
| GitHub Projects | 1,0 | Board, tarefas, responsáveis e movimentação |
| README e apresentação | 1,0 | Instruções reproduzíveis, demonstração e explicação |
| **Total** | **10,0** | |

### Regras de correção

- Serão atribuídos pontos proporcionais aos requisitos efetivamente demonstrados;
- Interfaces sem integração real com a API não recebem pontuação integral;
- O histórico de commits, PRs e Issues poderá ser utilizado para verificar contribuições;
- Todos os integrantes deverão conseguir explicar sua participação e o funcionamento geral;
- A nota de grupo poderá ter ajuste individual fundamentado na participação e apresentação;
- Ferramentas de IA podem apoiar o desenvolvimento, mas os alunos deverão compreender, testar e explicar o código produzido.

---

## 8. Entrega obrigatória

Até o encerramento do hackathon, a equipe deverá apresentar os links do **repositório GitHub** e do **GitHub Project**.

A versão avaliada será a disponível na branch `main` no prazo final.

### Checklist

- [ ] Repositório acessível ao professor;
- [ ] Main com versão integrada;
- [ ] Backend Java com H2;
- [ ] Angular consumindo a API;
- [ ] Expo consumindo a mesma API;
- [ ] Pelo menos 3 PRs revisados e concluídos;
- [ ] Commits no padrão estudado;
- [ ] Board com 3 colunas e pelo menos 6 tarefas;
- [ ] README com integrantes, instruções e URL da API;
- [ ] Demonstração do fluxo integrado.

O README deverá explicar como iniciar o backend, a aplicação Angular e o aplicativo Expo, incluindo eventuais configurações de rede necessárias para o celular acessar a API.

---

## 9. Materiais de referência

- Java/Spring
- Angular
- Desenvolvimento Mobile Expo
- Padrões de Commits — GitHub

---

> 🏁 **Desafio final:** entregar uma solução funcional e integrada, demonstrando capacidade de programar, colaborar, revisar código e organizar um projeto de software dentro do tempo estabelecido.
