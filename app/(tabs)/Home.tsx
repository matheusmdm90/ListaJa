import { useApp } from "@/Contexts/UserApp";
import { Addlista } from "@/utils/requisicao";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Inputs from "../Componetes/inputs";
import ModalAdicionar from "../Componetes/Modals/ModalAdicionar/ModalAdicionar";

const HomePage = () => {
  const [showModalADD, setShowModalAdd] = useState(false);
  const router = useRouter();
  const { user, listas } = useApp();
  const status = "Não comprado";
  const id = "50";

  if (!user) {
    return router.replace("/");
  }

  const adicionarLista = async ({ name }: { name: string }) => {
    try {
      const { error } = await Addlista({
        nome_Lista: name,
        status_lista: status,
        usuario_id: id,
      });
      if (error) {
        Alert.alert("Erro ao cria lista ", error?.message);
        return;
      }

      Alert.alert("Lista Criada com Sucesso");
      setShowModalAdd(!showModalADD);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTexto1}>Minha Lista</Text>
          <Text style={styles.headerTexto2}>
            Bem vindo de volta, {user.user_metadata.name}
          </Text>
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

        {!listas || listas.length === 0 ? (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.listaVazia}>Sua lista está vazia.</Text>
            <Text style={styles.listaVazia}>
              Que tal adicionar sua primeira Lista?
            </Text>
          </View>
        ) : (
          <ScrollView>
            <Pressable
              style={styles.boxLista}
              onPress={() => router.push("/Itens")}
            >
              <View style={{ flexDirection: "row", gap: 16 }}>
                <View style={styles.IconBoxLista}>
                  <MaterialIcons
                    name="shopping-cart"
                    color={"#3B82F6"}
                    size={24}
                  />
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
            </Pressable>
          </ScrollView>
        )}
      </View>

      <View style={styles.btnAddPosition}>
        <Pressable style={styles.btnAdd} onPress={() => setShowModalAdd(true)}>
          <MaterialIcons name="add" color={"#FFFF"} size={36} />
        </Pressable>
        <ModalAdicionar
          visible={showModalADD}
          onCancel={() => setShowModalAdd(false)}
          onCreate={(name) => adicionarLista({ name })}
        />
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

  btnAddPosition: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    position: "absolute",
    bottom: "5%",
    right: "5%",
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

  listaVazia: {
    color: "#94A3B8",
    fontSize: 16,
    fontWeight: "semibold",

    textAlign: "center",
  },
});

export default HomePage;
