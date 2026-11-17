import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaxContentWidth, Spacing } from '@/constants/theme';
import { mockTasks } from '@/data/mockTasks';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const task = mockTasks.find((item) => item.id === (id ?? mockTasks[0].id));
  const colors = {
    accent: '#315FCE',
    accentBackground: '#EAF0FF',
    success: '#18794E',
    successBackground: '#E7F6ED',
    warning: '#985B00',
    warningBackground: '#FFF3D9',
    border: '#E5E7EB',
  };
  const statusColors = task?.status === 'Concluída'
    ? { text: colors.success, background: colors.successBackground }
    : task?.status === 'A fazer'
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
                  <View style={[styles.statusBadge, { backgroundColor: statusColors.background }]}>
                    <View style={[styles.statusDot, { backgroundColor: statusColors.text }]} />
                    <Text style={[styles.text, styles.smallBold]}>
                      {task.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoItem}>
                  <Text style={[styles.text, styles.fieldLabel]}>
                    PRIORIDADE
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: colors.warningBackground }]}>
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
    backgroundColor: '#FFFFFF',
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
    paddingVertical: Spacing.four,
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
    marginBottom: Spacing.two,
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
    borderRadius: 24,
    padding: Spacing.four,
    gap: Spacing.three,
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
    minWidth: 140,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
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
    borderRadius: 20,
    padding: Spacing.three,
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
