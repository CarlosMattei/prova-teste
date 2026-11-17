import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

import { ListCard } from "@/components/listCard";
import { Task } from "@/models/tasks";
import { fetchTasks } from "@/services/taskService";

export default function ListTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch {
        setError("Não foi possível carregar as tarefas.");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => String(item.id ?? index)}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma tarefa encontrada.</Text>}
        renderItem={({ item }) => (
          <ListCard
            title={item.title}
            description={item.description}
            onPress={() => {
              // Futuramente navegará para a página de detalhes da tarefa
              console.log("Tarefa selecionada:", item);
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  emptyText: {
    color: "#6B7280",
    fontSize: 14,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 16,
    textAlign: "center",
  },
});

