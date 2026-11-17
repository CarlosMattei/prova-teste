import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";

import { ListCard } from "@/components/listCard";

type Task = {
  id: number;
  title: string;
  description: string;
};

const API_URL = process.env.EXPO_PUBLIC_API_URL
  ?? Platform.select({
    android: "http://10.0.2.2:8080",
    default: "http://localhost:8080",
  })
  ?? "http://localhost:8080";

export default function ListTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTasks() {
      try {
        const response = await fetch(`${API_URL}/tasks`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`O servidor respondeu com o status ${response.status}.`);
        }

        const loadedTasks: Task[] = await response.json();
        setTasks(loadedTasks);
      } catch (error) {
        if (!controller.signal.aborted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Não foi possível carregar as tarefas."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadTasks();
    return () => controller.abort();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>

      {errorMessage ? (
        <Text style={styles.message}>{errorMessage}</Text>
      ) : isLoading ? (
        <Text style={styles.message}>Carregando tarefas...</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ListCard
              title={item.title}
              description={item.description}
              onPress={() =>
                router.push({
                  pathname: "/detailsScreen",
                  params: { id: String(item.id) },
                })
              }
            />
          )}
        />
      )}
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
  message: {
    fontSize: 14,
    color: "#4B5563",
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

