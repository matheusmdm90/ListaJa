import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Inputs from "../Components/Inputs";

import Botao from "../Components/Botao";
import { useCadastro } from "../hooks/useCadastro";

const Cadastro = () => {
  const {
    criarCadastro,
    setNome,
    setConfirmeEmail,
    setEmail,
    setConfirmeSenha,
    setSenha,
    loading,
    nome,
    confirmeEmail,
    email,
    confirmeSenha,
    senha,
  } = useCadastro();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.header}>
              <Pressable style={styles.btnBack} onPress={() => router.back()}>
                <MaterialIcons name="arrow-back" size={16} color={"#FFFFFF"} />
              </Pressable>

              <Text style={styles.titulo}>Criar Conta</Text>

              <View style={styles.iconPlaceholder} />
            </View>

            <View style={styles.inputContainer}>
              <Inputs
                nomeInput="Nome Completo"
                placeholder="Digite seu nome Completo"
                iconName="person"
                value={nome}
                onChangeText={setNome}
              />

              <Inputs
                nomeInput="E-mail"
                placeholder="digite teu email"
                iconName="email"
                value={email}
                onChangeText={(texto) => setEmail(texto.toLowerCase())}
              />
              <Inputs
                nomeInput="Confirme seu E-Mail"
                placeholder="Confirme seu E-Mail"
                iconName="mark-email-read"
                value={confirmeEmail}
                onChangeText={(texto) => setConfirmeEmail(texto.toLowerCase())}
              />

              <Inputs
                nomeInput="Senha"
                placeholder="*******"
                iconName="lock"
                value={senha}
                onChangeText={setSenha}
              />
              <Inputs
                nomeInput="Confirme sua senha"
                placeholder="*******"
                iconName="lock-reset"
                value={confirmeSenha}
                onChangeText={setConfirmeSenha}
              />
            </View>

            <View style={styles.btnContainer}>
              <Botao
                nomeBtn="Cadastrar"
                loading={loading}
                login={criarCadastro}
                nameIcon="arrow-forward"
              />
            </View>

            <View style={styles.cadastro}>
              <Text style={styles.textoCadastro1}>Ja tem uma Conta?</Text>
              <Text
                style={styles.textoCadastro2}
                onPress={() => router.push("/")}
              >
                Entrar
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111420",
    paddingHorizontal: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    height: 60,
  },

  btnBack: {
    width: 40,
    height: 40,
    backgroundColor: "#ffffff10",
    borderWidth: 1,
    borderColor: "#ffffff20",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    color: "#FFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  iconPlaceholder: {
    width: 40,
    height: 40,
  },

  inputContainer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },

  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },

  cadastro: {
    flexDirection: "row",
    marginTop: 32,
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
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

export default Cadastro;
