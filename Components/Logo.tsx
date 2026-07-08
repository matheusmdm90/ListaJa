import { Image, StyleSheet, Text, View } from "react-native";

const Logo = () => {
  return (
    <View style={styles.conatinerTitulo}>
      <Image source={require("../assets/images/Logo.png")} />
      <Text style={styles.titulo}>
        Lista<Text style={styles.tituloDestacado}>Já</Text>
      </Text>
      <Text style={styles.textoSecundario}>Organize suas compras agora</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Logo;
