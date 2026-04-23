import { CadastrarUsuario, fazerCadastro } from "@/utils/requisicao";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Inputs from "./Componetes/inputs";

const Cadastro = () => {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmeEmail, setConfirmeEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmeSenha, setConfirmeSenha] = useState("");

  const criarCadastro = async () => {
    // Validação de e-mail
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email || !emailRegex.test(email)) {
      Alert.alert("E-mail inválido", "Por favor, insira um e-mail válido.");
      return;
    }

    if (email !== confirmeEmail) {
      Alert.alert(
        "E-mails não conferem",
        "O e-mail e a confirmação precisam ser iguais.",
      );
      return;
    }

    // Validação de senha
    if (!senha || senha.length < 8) {
      Alert.alert(
        "Senha inválida",
        "A senha deve ter pelo menos 6 caracteres.",
      );
      return;
    }

    if (senha !== confirmeSenha) {
      Alert.alert(
        "Senhas não conferem",
        "A senha e a confirmação precisam ser iguais.",
      );
      return;
    }

    try {
      const { data: usuaruiaSuapa, error } = await fazerCadastro({
        email: email,
        password: senha,
        name: nome,
      });
      if (error) {
        Alert.alert("Erro ao cadastrar", error.message);
        return;
      } else {
        const { error: erroCadastrarUsuario } = await CadastrarUsuario({
          email: email,
          nome: nome,
          user: usuaruiaSuapa.user,
        });
        if (erroCadastrarUsuario) {
          Alert.alert(
            "Erro ao cadastrar usuario",

            erroCadastrarUsuario.message,
          );
          return;
        }
      }

      Alert.alert("Sucesso", "Cadastro válido. Prosseguir com registro.");
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Não foi possível conectar. Verifique sua internet.");
    }

    setConfirmeEmail("");
    setNome("");
    setEmail("");
    setConfirmeSenha("");
    setSenha("");
    router.push("/");
  };

  return (
    <SafeAreaView style={styles.container}>
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
          IconName="person"
          value={nome}
          onChangeText={setNome}
        />

        <Inputs
          nomeInput="E-mail"
          placeholder="digite teu email"
          IconName="email"
          value={email}
          onChangeText={setEmail}
        />
        <Inputs
          nomeInput="Confirme seu E-Mail"
          placeholder="Confirme seu E-Mail"
          IconName="mark-email-read"
          value={confirmeEmail}
          onChangeText={setConfirmeEmail}
        />

        <Inputs
          nomeInput="Senha"
          placeholder="*******"
          IconName="lock"
          value={senha}
          onChangeText={setSenha}
        />
        <Inputs
          nomeInput="Confirme sua senha"
          placeholder="*******"
          IconName="lock-reset"
          value={confirmeSenha}
          onChangeText={setConfirmeSenha}
        />
      </View>

      <View style={styles.btnContainer}>
        <Pressable style={styles.btn} onPress={criarCadastro}>
          <Text style={styles.btnText}>Cadastrar </Text>
          <MaterialIcons name="arrow-forward" color={"#ffff"} size={16} />
        </Pressable>
      </View>

      <View style={styles.cadastro}>
        <Text style={styles.textoCadastro1}>Ja tem uma Conta?</Text>
        <Text style={styles.textoCadastro2} onPress={() => router.push("/")}>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
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
