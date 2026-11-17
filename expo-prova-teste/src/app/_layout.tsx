import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useSyncExternalStore } from 'react';
import { Platform, useColorScheme } from 'react-native';

const subscribeToHydration = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

export const unstable_settings = {
  initialRouteName: 'listTasks',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot
  );
  const useDarkTheme = colorScheme === 'dark' && (Platform.OS !== 'web' || isHydrated);

  return (
    <ThemeProvider value={useDarkTheme ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="listTasks" />
        <Stack.Screen name="detailsScreen" />
      </Stack>
    </ThemeProvider>
  );
}

