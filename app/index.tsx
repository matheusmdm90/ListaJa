import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conatinerTitulo}>
        <Image source={require("../assets/images/Logo.png")} />
        <Text style={styles.titulo}>
          Lista<Text style={styles.tituloDestacado}>Já</Text>
        </Text>
        <Text style={styles.textoSecundario}>Organize suas compras agora</Text>
      </View>

      <View>
        <Text>E-MAIL</Text>w
        <TextInput keyboardType="email-address" />
        <Text>E-MAIL</Text>
        <TextInput secureTextEntry />
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
});
