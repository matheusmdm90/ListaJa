import { useRouter } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Botao from "../Components/Botao";
import Inputs from "../Components/inputs";
import Logo from "../Components/Logo";
import useLogin from "../hooks/useLogin";

export default function Index() {
  const router = useRouter();
  const { email, setEmail, loading, senha, setSenha, login } = useLogin();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#101422" }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Logo />

            <View style={styles.inputContainer}>
              <Inputs
                placeholder="exemplo@email.com"
                IconName="alternate-email"
                onChangeText={setEmail}
                value={email}
                nomeInput="E-MAIL"
                keyboardType="email-address"
              />

              <Inputs
                nomeInput="SENHA"
                placeholder="••••••••"
                IconName="lock"
                value={senha}
                onChangeText={setSenha}
              />

              <Text
                style={styles.textRestPw}
                onPress={() => router.push("./resetPasoword")}
              >
                Esqueceu a senha?
              </Text>
            </View>

            <Botao
              loading={loading}
              login={login}
              nomeBtn="Entrar"
              nameIcon="arrow-forward"
            />

            <View style={styles.cadastro}>
              <Text style={styles.textoCadastro1}>Não tem uma conta?</Text>
              <Text
                style={styles.textoCadastro2}
                onPress={() => router.push("/Cadastro")}
              >
                Cadastre-se
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101422",
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  inputContainer: {
    gap: 10,
    marginTop: 10,
  },

  textRestPw: {
    color: "#2559F4",
    left: 220,
    fontSize: 12,
    fontWeight: "400",
  },

  cadastro: {
    flexDirection: "row",
    marginTop: 32,
    gap: 4,
  },

  textoCadastro1: {
    fontSize: 14,
    color: "#FFFFFF50",
  },

  textoCadastro2: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2559F4",
  },
});
