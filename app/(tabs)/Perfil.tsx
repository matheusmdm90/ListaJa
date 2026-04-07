import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Perfil = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={styles.boxImg}>
          <Image
            style={styles.img}
            source={require("../../assets/images/avatar.png")}
          />
        </View>

        <View style={styles.boxEdit}>
          <MaterialIcons name="edit" size={14} color={"#FFFF"} />
        </View>
        <Text style={styles.textName}>Matheus Abraão</Text>

        <Text style={styles.textEmail}> mdm.matheusswat@gmail.com</Text>
      </View>

      <View style={{ marginTop: 30 }}>
        <Pressable style={styles.boxLista} onPress={() => router.push}>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <View style={styles.IconBoxLista}>
              <MaterialIcons name="person" color={"#3B82F6"} size={24} />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.textBoxLista1}> Informação Pessoal </Text>
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
      </View>

      <View>
        <Pressable style={styles.btnLogout} onPress={() => router.push("/")}>
          <MaterialIcons name="logout" size={24} color={"#FB7185"} />
          <Text style={styles.textLogout}> Sair da Conta</Text>
        </Pressable>
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
  boxImg: {
    borderWidth: 3,
    borderRadius: 100,
    borderColor: "#3B82F620",
    width: 96,
    height: 96,
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    width: 96,
    height: 96,
    borderRadius: 100,
  },

  boxEdit: {
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "# 111420",
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    left: "55%",
    bottom: "40%",
  },

  textName: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffff",
  },
  textEmail: {
    fontSize: 14,
    color: "#94A3B8",
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
    borderColor: "#3B82F610",
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
  btnLogout: {
    marginTop: 60,
    width: "100%",
    height: "25%",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#F43F5E20",
    backgroundColor: "#F43F5E10",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  textLogout: {
    color: "#FB7185",
    fontSize: 16,
    fontWeight: "semibold",
  },
});

export default Perfil;
