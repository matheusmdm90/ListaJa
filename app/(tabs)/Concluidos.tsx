import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Inputs from "../Componetes/inputs";

const Concluidos = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTexto1}>Concluidos</Text>
          <Text style={styles.headerTexto2}>Historico de compras </Text>
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

      <View style={styles.textoHistoricos}>
        <Text style={styles.textoHistoricos1}>Histórico Recente</Text>

        <Text style={styles.textoHistoricos2}>Total: 24 listas</Text>
      </View>

      <ScrollView>
        <Pressable
          style={styles.boxLista}
          onPress={() => router.push("/Itens")}
        >
          <View style={{ flexDirection: "row", gap: 16 }}>
            <View style={styles.IconBoxLista}>
              <MaterialIcons
                name="check-circle-outline"
                color={"#22C55E"}
                size={24}
              />
            </View>
            <View>
              <Text style={styles.textBoxLista1}> Churrasco de Domingo </Text>
              <Text style={styles.textBoxLista2}>
                {" "}
                Concluidon em: 02/04/2026
              </Text>
            </View>
          </View>
          <View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={"#3B82F6"}
            />
          </View>
        </Pressable>
      </ScrollView>
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },

  headerTexto2: {
    color: "#94A3B8",
    textAlign: "center",
  },

  img: {
    width: 44,
    height: 44,
  },

  textoHistoricos: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 24,
  },

  textoHistoricos1: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#64748B",
  },

  textoHistoricos2: {
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
    backgroundColor: "#22C55E10",
    borderWidth: 1,
    borderColor: "#22C55E20",
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

export default Concluidos;
