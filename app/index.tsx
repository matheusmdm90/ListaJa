import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Botao from "../Components/Botao";
import Inputs from "../Components/inputs";
import Logo from "../Components/Logo";
import { useApp } from "../Contexts/UserApp";
import erros from "../utils/errors";
import { fazerLogin, obterUsuario } from "../utils/requisicao";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const { dadosLogin } = useApp();

  const login = async () => {
    if (!email?.trim()) {
      Toast.show({
        type: "Erros",
        text1: "Erro ao entrar!",
        text2: "Email Obrigatorio",
        position: "top", // 'top' ou 'bottom'
        visibilityTime: 3000, // 3 segundos
      });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await fazerLogin({
        email,
        password: senha,
      });

      if (error) {
        throw error;
      }

      const id = data.user?.id;

      const { data: dadosUser, error: errorDadosUser } = await obterUsuario({
        id_usuario: id,
      });
      if (errorDadosUser) {
        throw errorDadosUser;
      }

      Toast.show({
        type: "sucesso2",
        text1: "Sucesso!",
        text2: "Seu login foi realizado com sucesso.",
        position: "top", // 'top' ou 'bottom'
        visibilityTime: 3000, // 3 segundos
      });
      dadosLogin(dadosUser);
      router.replace("/(tabs)/Home");
    } catch (erro: any) {
      erros(erro);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#101422" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        style={{ flex: 1 }}
      >
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
    fontWeight: 400,
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
