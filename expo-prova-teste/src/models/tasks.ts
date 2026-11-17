export type Task = {
  id?: number | string;
  title: string;
  description: string;
  // TODO (Integração Backend - Tela de Detalhes):
  // Adicionar aqui os demais campos retornados pelo backend Java que serão exibidos em `detailsScreen.tsx`
  // (ex: status, priority, category, responsible/assignee, etc.).
};
