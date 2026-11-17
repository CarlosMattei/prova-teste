export type Task = {
  id: string;
  title: string;
  description: string;
  assignee: string;
  role: string;
  initials: string;
  status: 'Em andamento' | 'A fazer' | 'Concluída';
  priority: 'Alta' | 'Média' | 'Baixa';
  category: string;
  dueDate: string;
  progress: number;
};

export const mockTasks: Task[] = [
  {
    id: 'T-2048',
    title: 'Planejar reunião de alinhamento',
    description:
      'Preparar a pauta da reunião, reunir as atualizações de cada área e compartilhar os próximos passos com o time.',
    assignee: 'Camila Oliveira',
    role: 'Gerente de produto',
    initials: 'CO',
    status: 'Em andamento',
    priority: 'Alta',
    category: 'Planejamento',
    dueDate: '20 de novembro de 2026',
    progress: 68,
  },
  {
    id: 'T-2049',
    title: 'Atualizar documentação do produto',
    description:
      'Revisar as instruções de uso e registrar as mudanças recentes para facilitar a consulta do time.',
    assignee: 'João Pedro',
    role: 'Analista de operações',
    initials: 'JP',
    status: 'A fazer',
    priority: 'Média',
    category: 'Documentação',
    dueDate: '24 de novembro de 2026',
    progress: 0,
  },
  {
    id: 'T-2050',
    title: 'Revisar feedback dos clientes',
    description:
      'Agrupar os comentários recebidos e destacar oportunidades de melhoria para o próximo ciclo.',
    assignee: 'Ana Martins',
    role: 'Designer de produto',
    initials: 'AM',
    status: 'Concluída',
    priority: 'Baixa',
    category: 'Pesquisa',
    dueDate: '15 de novembro de 2026',
    progress: 100,
  },
];
