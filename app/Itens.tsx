import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ModalItens from "./Componetes/Modals/ModalItens/ModalItens";

const Itens = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable style={styles.btnBack} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={"#F1F5F9"} />
          </Pressable>

          <View>
            <Text style={styles.textHeadrd1}>Mercado Semanal</Text>

            <Text style={styles.textHeadrd2}>Atualizado há 2 horas</Text>
          </View>
        </View>

        <View>
          <Pressable>
            <MaterialIcons name="more-vert" size={24} color={"#64748B"} />
          </Pressable>
        </View>
      </View>

      <View style={{ width: "100%", height: "85%" }}>
        <ScrollView>
          <Pressable style={styles.boxItens}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                height: "50%",
              }}
            >
              <View style={{ flexDirection: "row", gap: 16 }}>
                <View style={styles.IconBoxItens}>
                  <MaterialIcons
                    name="shopping-cart"
                    color={"#3B82F6"}
                    size={24}
                  />
                </View>
                <View>
                  <Text style={styles.textBoxItens1}> Leite </Text>
                  <Text style={styles.textBoxItens2}> Não comprado</Text>
                </View>
              </View>
              <View>
                <ModalItens />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                height: "50%",
              }}
            >
              <View>
                <Text style={styles.textBoxItens2}>UNIDADE</Text>
                <Text style={styles.textBoxItens1}> 01</Text>
              </View>
              <View>
                <Text style={styles.textBoxItens2}>PREÇO UN.</Text>
                <Text style={styles.textBoxItens1}> R$ 4,89</Text>
              </View>
              <View>
                <Text style={styles.textBoxItens2}>SUBTOTAL</Text>
                <Text style={styles.textBoxItens1}> R$ 4,89</Text>
              </View>
            </View>
          </Pressable>
        </ScrollView>
      </View>

      <View style={styles.btnAddPosition}>
        <View style={styles.abaTotal}>
          <View>
            <Text style={styles.abaTotalText1}> Total Estimado </Text>
            <Text style={styles.abaTotalText2}>R$ 4,86</Text>
          </View>
          <View style={styles.abaTotalBtn}>
            <Text style={styles.abaTotalBtnTexto}>Finalizar</Text>
          </View>
        </View>
        <View style={styles.btnAdd}>
          <MaterialIcons name="add" color={"#FFFF"} size={36} />
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btnBack: {
    width: 40,
    height: 40,
    backgroundColor: "#ffffff10",
    borderWidth: 1,
    borderColor: "#ffffff20",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  textHeadrd1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFF",
  },

  textHeadrd2: {
    fontSize: 12,
    color: "#94A3B8",
  },

  boxItens: {
    width: "100%",
    height: 130,
    backgroundColor: "#FFFFFF10",
    borderWidth: 1,
    borderColor: "#FFFFFF15",
    borderRadius: 16,
    marginTop: 16,
    gap: 10,
    alignItems: "center",
    flexDirection: "column",
    padding: 16,
  },

  IconBoxItens: {
    width: 40,
    height: 40,
    backgroundColor: "#3B82F610",
    borderWidth: 1,
    borderColor: "#3B82F620",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  textBoxItens1: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffff",
  },

  textBoxItens2: {
    fontSize: 12,
    fontWeight: "medium",
    color: "#94A3B8",
  },

  abaTotal: {
    width: "80%",
    height: 74,
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  abaTotalText1: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#DBEAFE",
  },

  abaTotalText2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFF",
  },

  abaTotalBtn: {
    width: 103,
    height: 42,
    borderWidth: 1,
    backgroundColor: "#FFFFFF20",
    borderColor: "#FFFFFF30",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  abaTotalBtnTexto: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F1F5F9",
  },

  btnAddPosition: {
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    bottom: "5%",
    right: "5%",
    flexDirection: "row",
    gap: 12,
  },

  btnAdd: {
    backgroundColor: "#3B82F6",
    width: 56,
    height: 56,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // sombra no Android
    shadowColor: "#3B82F6", // sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default Itens;
