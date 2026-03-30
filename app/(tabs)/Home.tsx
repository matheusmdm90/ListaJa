import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Inputs from "../Componetes/inputs";

const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTexto1}>Minha Lista</Text>
          <Text style={styles.headerTexto2}>Bem vindo de volta, Matheus </Text>
        </View>

        <View>
          <Image
            style={styles.img}
            source={require("../../assets/images/avatar.png")}
          />
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <Inputs placeholder="Procure sua lista" IconName="search" />
      </View>
      <View style={styles.listaContainer}>
        <View>
          <Text style={styles.textoLista}>Listas</Text>
        </View>

        <View style={styles.boxLista}>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <View style={styles.IconBoxLista}>
              <MaterialIcons name="shopping-cart" color={"#3B82F6"} size={24} />
            </View>
            <View>
              <Text style={styles.textBoxLista1}> Mercado </Text>
              <Text style={styles.textBoxLista2}> 01/04/2026</Text>
            </View>
          </View>
          <View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={"#3B82F6"}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101422",
    padding: 24,
  },

  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTexto1: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },

  headerTexto2: {
    color: "#94A3B8",
  },

  img: {
    width: 44,
    height: 44,
  },

  listaContainer: {
    marginTop: 16,
    justifyContent: "center",
  },

  textoLista: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#64748B",
  },

  boxLista: {
    width: "100%",
    height: 72,
    backgroundColor: "#FFFFFF10",
    borderWidth: 1,
    borderColor: "#FFFFFF15",
    borderRadius: 16,
    marginTop: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
  },

  IconBoxLista: {
    width: 40,
    height: 40,
    backgroundColor: "#3B82F610",
    borderWidth: 1,
    borderColor: "#3B82F620",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  textBoxLista1: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffff",
  },

  textBoxLista2: {
    fontSize: 11,
    fontWeight: "medium",
    color: "#94A3B8",
  },
});

export default HomePage;
