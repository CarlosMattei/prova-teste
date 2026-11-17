import { FlatList, StyleSheet, Text, View } from "react-native";

import { ListCard } from "@/components/listCard";

const TASKS = [
  {
    id: "1",
    title: "Configurar navegação Stack",
    description: "Conectar a tela inicial com a lista de tarefas usando Expo Router.",
  },
  {
    id: "2",
    title: "Criar componente ListCard",
    description: "Exibir título e descrição em um card simples e reutilizável.",
  },
  {
    id: "3",
    title: "Testar no dispositivo",
    description: "Validar o layout e a rolagem da lista no Android, iOS e Web.",
  },
    {
    id: "4",
    title: "Testar no dispositivo",
    description: "Validar o layout e a rolagem da lista no Android, iOS e Web.",
  },
];

export default function ListTasks() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>

      <FlatList
        data={TASKS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ListCard
            title={item.title}
            description={item.description}
            onPress={() => {
              // Futuramente navegará para a página de detalhes da tarefa
              console.log("Tarefa selecionada:", item.id);
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  listContent: {
    gap: 12,
    paddingBottom: 24,
  },
});

