import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { UserAppProvider } from "../Contexts/UserApp";
import { toastConfig } from "../toastConfig";

export default function RootLayout() {
  return (
    <UserAppProvider>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="Itens" options={{ headerShown: false }} />
        </Stack>
        <StatusBar />
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </UserAppProvider>
  );
}
