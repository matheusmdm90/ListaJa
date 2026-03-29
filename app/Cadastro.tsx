import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Inputs from "./Componetes/inputs";

const Cadastro = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.btnBack}>
          <MaterialIcons name="arrow-back" size={16} color={"#FFFFFF"} />
        </Pressable>

        <Text style={styles.titulo}>Criar Conta</Text>

        <View style={styles.iconPlaceholder} />
      </View>

      <View style={styles.inputContainer}>
        <Inputs
          nomeInput="Nome Completo"
          placeholder="Digite seu nome Completo"
          IconName="person"
        />

        <Inputs
          nomeInput="E-mail"
          placeholder="digite teu email"
          IconName="email"
        />
        <Inputs
          nomeInput="Confirme seu E-Mail"
          placeholder="Confirme seu E-Mail"
          IconName="mark-email-read"
        />

        <Inputs nomeInput="Senha" placeholder="*******" IconName="lock" />
        <Inputs
          nomeInput="Confirme sua senha"
          placeholder="*******"
          IconName="lock-reset"
        />
      </View>

      <View style={styles.btnContainer}>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Cadastrar </Text>
          <MaterialIcons name="arrow-forward" color={"#ffff"} size={16} />
        </Pressable>
      </View>

      <View style={styles.cadastro}>
        <Text style={styles.textoCadastro1}>Ja tem uma Conta?</Text>
        <Text style={styles.textoCadastro2} onPress={() => router.back()}>
          Entrar
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111420",
    paddingHorizontal: 25,
  },

  header: {
    flexDirection: "row", // Linha horizontal
    alignItems: "center", // Alinha verticalmente
    justifyContent: "space-between", // Espaço entre os elementos
    paddingHorizontal: 16, // Espaço nas laterais
    height: 60, // Altura do header
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

  btn: {
    width: "80%",
    height: 56,
    backgroundColor: "#2559F4",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 16,

    shadowColor: "#2559F4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // por a sombrar na parte de baixo do android

    elevation: 4,
  },

  btnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
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
