import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

export const unstable_settings = {
  initialRouteName: 'listTasks',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="listTasks" />
        <Stack.Screen name="detailsScreen" />
      </Stack>
    </ThemeProvider>
  );
}

