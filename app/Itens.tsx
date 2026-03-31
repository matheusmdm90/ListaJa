import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

      <Text>Coe</Text>
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
});

export default Itens;
