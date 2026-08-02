import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/Toast/toastConfig";
import { AuthProvider } from "../Contexts/AuthContext";
import { UserAppProvider } from "../Contexts/UserApp";

export default function RootLayout() {
  return (
    <AuthProvider>
      <UserAppProvider>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="Cadastro" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="Itens" options={{ headerShown: false }} />
          </Stack>
          <StatusBar />
          <Toast config={toastConfig} topOffset={0} />
        </SafeAreaProvider>
      </UserAppProvider>
    </AuthProvider>
  );
}
