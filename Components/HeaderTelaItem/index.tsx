import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type TyprheaderTelaItem = {
  nomeLista: string;
  dataCriacao: string;
  deletarLista: () => void;
};

const HeaderTelaItem = ({
  nomeLista,
  dataCriacao,
  deletarLista,
}: TyprheaderTelaItem) => {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable style={styles.btnBack} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={"#F1F5F9"} />
        </Pressable>

        <View>
          <Text style={styles.textHeadrd1}>{nomeLista}</Text>

          <Text style={styles.textHeadrd2}>
            {new Date(dataCriacao).toLocaleDateString("pt-br")}
          </Text>
        </View>
      </View>

      <View>
        <Pressable onPress={deletarLista}>
          <MaterialIcons name="delete" size={24} color={"#64748B"} />
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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

export default HeaderTelaItem;
