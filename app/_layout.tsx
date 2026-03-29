import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar />
    </SafeAreaProvider>
  );
}
