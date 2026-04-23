import { useApp } from "@/Contexts/UserApp";
import { fazerLogin } from "@/utils/requisicao";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  const [mostrarSenha, setMostrarSenha] = useState(true);
  const [email, setEmail] = useState("");
  const [senha, setSanha] = useState("");
  const { dadosLogin } = useApp();

  const login = async () => {
    try {
      const { data, error } = await fazerLogin({
        email,
        password: senha,
      });
      if (error) {
        Alert.alert("Erro ao Entrar", error.message);
        return;
      } else {
        {
          Alert.alert("login Efetuado com SUCESSO! ");
          dadosLogin(data.user);
          router.push("/(tabs)/Home");
        }
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Não foi possível conectar. Verifique sua internet.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conatinerTitulo}>
        <Image source={require("../assets/images/Logo.png")} />
        <Text style={styles.titulo}>
          Lista<Text style={styles.tituloDestacado}>Já</Text>
        </Text>
        <Text style={styles.textoSecundario}>Organize suas compras agora</Text>
      </View>

      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputText}>E-MAIL</Text>

          <View style={styles.boxInput}>
            <MaterialIcons
              name="alternate-email"
              size={20}
              color={"#FFFFFF30"}
            />
            <TextInput
              placeholder="exemplo@email.com"
              placeholderTextColor={"#FFFFFF30"}
              keyboardType="email-address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>
        <View>
          <Text style={styles.inputText}>SENHA</Text>

          <View style={styles.boxInput}>
            <MaterialIcons name="lock" size={20} color={"#FFFFFF30"} />
            <TextInput
              placeholder="••••••••"
              placeholderTextColor={"#FFFFFF30"}
              style={styles.input}
              secureTextEntry={mostrarSenha}
              value={senha}
              onChangeText={setSanha}
            />
            <Pressable onPress={() => setMostrarSenha(!mostrarSenha)}>
              <MaterialIcons
                name={mostrarSenha ? "visibility" : "visibility-off"}
                size={20}
                color={"#FFFFFF30"}
              />
            </Pressable>
          </View>
        </View>

        <Text
          style={styles.textRestPw}
          onPress={() => router.push("./resetPasoword")}
        >
          Esqueceu a senha?
        </Text>
      </View>
      <Pressable style={styles.btn} onPress={() => login()}>
        <Text style={styles.btnText}>Entrar </Text>
        <MaterialIcons name="arrow-forward" color={"#ffff"} size={16} />
      </Pressable>

      <View style={styles.cadastro}>
        <Text style={styles.textoCadastro1}>Não tem uma conta?</Text>
        <Text
          style={styles.textoCadastro2}
          onPress={() => router.push("/Cadastro")}
        >
          Cadastre-se
        </Text>
      </View>
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

  conatinerTitulo: {
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    color: "#ffff",
    fontSize: 30,
    fontWeight: "bold",
  },

  tituloDestacado: {
    color: "#2559F4",
    fontSize: 30,
    fontWeight: "bold",
  },

  textoSecundario: {
    color: "#ffffff50",
    fontSize: 14,
  },

  boxInput: {
    width: 350,
    height: 56,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: "#FFFFFF40",
    backgroundColor: "#FFFFFF20",
    paddingHorizontal: 10,
    color: "#ffff",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  input: {
    width: 260,
    height: 56,
    fontSize: 16,
    color: "#ffff",
  },

  inputText: {
    color: "#FFFFFF70",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 20,
    paddingVertical: 5,
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

  btn: {
    width: "80%",
    height: 56,
    backgroundColor: "#2559F4",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
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
