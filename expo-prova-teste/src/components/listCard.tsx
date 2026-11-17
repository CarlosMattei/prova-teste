import { Pressable, StyleSheet, Text } from "react-native";

type ListCardProps = {
  title: string;
  description: string;
  onPress?: () => void; // Adicionei a propriedade onPress para lidar com o evento de clique 
  //futuramente vai levá-lo para a página de detalhes da tarefa
};

export function ListCard({ title, description, onPress }: ListCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Pressable>
  );
}

export default ListCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    gap: 6,
  },
  pressed: {
    opacity: 0.75,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
});
