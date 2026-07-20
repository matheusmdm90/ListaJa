import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Lista = {
  id: string;
  nome_Lista: string;
  created_at: string;
};

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

type typeBoxLista = {
  lista: Lista;
  name: MaterialIconName;
  color: string;
};

const BoxLista = ({ lista, name, color }: typeBoxLista) => {
  const router = useRouter();
  return (
    <Pressable
      style={styles.boxLista}
      onPress={() =>
        router.push({
          pathname: "/Itens",
          params: {
            idLista: lista.id,
            nomeLista: lista.nome_Lista,
            dataCriacao: lista.created_at,
          },
        })
      }
      key={lista.id}
    >
      <View style={{ flexDirection: "row", gap: 16 }}>
        <View style={styles.IconBoxLista}>
          <MaterialIcons name={name} color={color} size={24} />
        </View>
        <View>
          <Text style={styles.textBoxLista1}>{lista.nome_Lista}</Text>
          <Text style={styles.textBoxLista2}>
            {new Date(lista.created_at).toLocaleDateString("pt-br")}
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
  );
};

const styles = StyleSheet.create({
  boxLista: {
    width: "100%",
    height: 72,
    backgroundColor: "#FFFFFF10",
    borderWidth: 1,
    borderColor: "#FFFFFF15",
    borderRadius: 16,
    marginTop: 10,
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

export default BoxLista;
