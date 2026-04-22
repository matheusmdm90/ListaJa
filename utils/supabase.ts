import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const getEnv = (key: string): string | undefined => {
  return (
    process.env[key] ||
    Constants.expoConfig?.extra?.[key] ||
    Constants.manifest?.extra?.[key]
  );
};

const SUPABASE_URL = getEnv("EXPO_PUBLIC_SUPABASE_URL");
const SUPABASE_KEY = getEnv("EXPO_PUBLIC_SUPABASE_KEY");

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error(
    "Defina EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_KEY em .env.local",
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
