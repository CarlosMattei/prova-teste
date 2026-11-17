import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mockTasks } from '@/data/mockTasks';

const Spacing = {
  one: 4,
  two: 8,
  three: 12,
  four: 16,
};

const MaxContentWidth = 720;
const statusOptions = ['Pendente', 'Em andamento', 'Concluída'] as const;
type TaskStatus = (typeof statusOptions)[number];

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const task = mockTasks.find((item) => item.id === (id ?? mockTasks[0].id));
  const [status, setStatus] = useState<TaskStatus>(() => {
    if (task?.status === 'Em andamento' || task?.status === 'Concluída') {
      return task.status;
    }

    return 'Pendente';
  });
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const colors = {
    accent: '#315FCE',
    accentBackground: '#EAF0FF',
    success: '#18794E',
    successBackground: '#E7F6ED',
    warning: '#985B00',
    warningBackground: '#FFF3D9',
    border: '#E5E7EB',
  };
  const statusColors = status === 'Concluída'
    ? { text: colors.success, background: colors.successBackground }
    : status === 'Pendente'
      ? { text: colors.warning, background: colors.warningBackground }
      : { text: colors.accent, background: colors.accentBackground };
  function handleGoBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  }

  if (!task) {
    return (
      <View style={[styles.container, styles.whiteBackground]}>
        <SafeAreaView style={styles.safeArea}>
          <View style={[styles.content, styles.notFoundContent]}>
            <Text style={[styles.text, styles.pageTitle]}>Tarefa não encontrada</Text>
            <Text style={styles.text}>
              Não encontramos uma tarefa com esse identificador.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={handleGoBack}
              style={({ pressed }) => [
                styles.returnButton,
                { backgroundColor: colors.accentBackground },
                pressed && styles.pressed,
              ]}>
              <Text style={[styles.text, styles.smallBold, styles.returnButtonText]}>
                Voltar para tarefas
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.whiteBackground]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Voltar para a lista de tarefas"
              onPress={handleGoBack}
              style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
              <Text style={[styles.text, styles.backArrow]}>←</Text>
              <Text style={[styles.text, styles.smallBold]}>
                Voltar para tarefas
              </Text>
            </Pressable>

            <View style={styles.pageHeading}>
              <Text style={[styles.text, styles.pageTitle]}>Detalhes da tarefa</Text>
            </View>

            <View
              style={[
                styles.taskCard,
                { borderColor: colors.border, backgroundColor: '#FFFFFF' },
              ]}>
              <View style={styles.cardTopRow}>
                <Text style={[styles.text, styles.eyebrow]}>
                  TAREFA {task.id}
                </Text>
                <View style={[styles.categoryBadge, { backgroundColor: colors.accentBackground }]}>
                  <Text style={[styles.text, styles.smallBold]}>
                    {task.category}
                  </Text>
                </View>
              </View>

              <Text style={[styles.text, styles.taskTitle]}>{task.title}</Text>
              <Text style={[styles.text, styles.description]}>
                {task.description}
              </Text>

              <View style={[styles.separator, { backgroundColor: colors.border }]} />

              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={[styles.text, styles.fieldLabel]}>
                    STATUS
                  </Text>
                  <View style={styles.statusPicker}>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Status: ${status}`}
                      accessibilityState={{ expanded: isStatusMenuOpen }}
                      onPress={() => setIsStatusMenuOpen((isOpen) => !isOpen)}
                      style={({ pressed }) => [
                        styles.statusSelectButton,
                        { backgroundColor: statusColors.background },
                        pressed && styles.pressed,
                      ]}>
                      <View style={styles.statusSelectValue}>
                        <View style={[styles.statusDot, { backgroundColor: statusColors.text }]} />
                        <Text style={[styles.text, styles.statusSelectText]}>{status}</Text>
                      </View>
                      <View style={styles.statusChevron} />
                    </Pressable>
                    {isStatusMenuOpen && (
                      <View style={styles.statusMenu}>
                        {statusOptions.map((option) => (
                          <Pressable
                            key={option}
                            accessibilityRole="button"
                            accessibilityState={{ selected: status === option }}
                            onPress={() => {
                              setStatus(option);
                              setIsStatusMenuOpen(false);
                            }}
                            style={({ pressed }) => [
                              styles.statusOption,
                              status === option && styles.selectedStatusOption,
                              pressed && styles.pressed,
                            ]}>
                            <Text style={[styles.text, styles.statusOptionText]}>{option}</Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.infoItem}>
                  <Text style={[styles.text, styles.fieldLabel]}>
                    PRIORIDADE
                  </Text>
                  <View style={[styles.priorityBadge, { backgroundColor: colors.warningBackground }]}>
                    <Text style={[styles.text, styles.smallBold]}>
                      {task.priority}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.secondaryGrid}>
              <View
                style={[
                  styles.detailCard,
                  { borderColor: colors.border, backgroundColor: '#FFFFFF' },
                ]}>
                <Text style={[styles.text, styles.fieldLabel]}>
                  RESPONSÁVEL
                </Text>
                <View style={styles.assigneeRow}>
                  <View style={[styles.avatar, { backgroundColor: colors.accentBackground }]}>
                    <Text style={[styles.text, styles.smallBold]}>
                      {task.initials}
                    </Text>
                  </View>
                  <View style={styles.assigneeInfo}>
                    <Text style={[styles.text, styles.smallBold]}>{task.assignee}</Text>
                    <Text style={[styles.text, styles.small]}>
                      {task.role}
                    </Text>
                  </View>
                </View>
              </View>

            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  whiteBackground: {
    backgroundColor: '#F5F7FB',
  },
  text: {
    color: '#000000',
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: 32,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },
  notFoundContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  backButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
  },
  backArrow: {
    fontSize: 24,
    lineHeight: 24,
  },
  pageHeading: {
    gap: Spacing.one,
    marginBottom: Spacing.one,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  pageTitle: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '700',
  },
  taskCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    gap: Spacing.three,
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  categoryBadge: {
    borderRadius: 20,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
  },
  taskTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    lineHeight: 25,
  },
  separator: {
    height: 1,
    marginVertical: Spacing.one,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.four,
  },
  infoItem: {
    gap: Spacing.two,
    minWidth: 150,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  statusPicker: {
    width: '100%',
    gap: Spacing.one,
  },
  statusSelectButton: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    paddingVertical: 10,
  },
  statusSelectText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  statusSelectValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  statusChevron: {
    width: 8,
    height: 8,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#111827',
    transform: [{ rotate: '45deg' }],
  },
  statusMenu: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    padding: Spacing.one,
  },
  statusOption: {
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
  },
  statusOptionText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  selectedStatusOption: {
    backgroundColor: '#F1F5F9',
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  secondaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  detailCard: {
    flexGrow: 1,
    flexBasis: 240,
    borderWidth: 1,
    borderRadius: 16,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  assigneeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assigneeInfo: {
    flex: 1,
    gap: Spacing.one,
  },
  demoNote: {
    textAlign: 'center',
  },
  returnButton: {
    minHeight: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  returnButtonText: {
    color: '#000000',
  },
  pressed: {
    opacity: 0.75,
  },
});
