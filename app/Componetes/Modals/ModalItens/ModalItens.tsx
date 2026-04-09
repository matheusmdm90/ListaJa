import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const ModalItens = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <View style={styles.container}>
          <Pressable onPress={() => setShowModal(!showModal)}>
            <MaterialIcons name="close" size={24} color={"#3B82F6"} />
          </Pressable>
          <View>
            <View style={styles.BoxICon}>
              <MaterialIcons name="shopping-cart" size={24} color={"#3B82F6"} />
            </View>

            <Text style={styles.Titulo}>Arroz 5kg</Text>

            <Text style={styles.TextAux}>Ajuste os detalhes do item</Text>

            <View>
              <Text>Quantidade</Text>

              <View>
                <Text>1</Text>
              </View>
            </View>

            <View>
              <Text>Preço Unitário</Text>

              <View>
                <Text>R$</Text>
              </View>
            </View>

            <Pressable>
              <Text>Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable onPress={() => setShowModal(!showModal)}>
        <MaterialIcons name="more-vert" size={24} color={"#3B82F6"} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "70%",
    backgroundColor: "#1A1F2E",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    borderRadius: 32,
  },

  BoxICon: {
    width: 64,
    height: 64,
    backgroundColor: "#3B82F620",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  Titulo: {
    color: "#FFFF",
    fontSize: 24,
    fontWeight: "bold",
  },

  TextAux: {
    fontSize: 14,
    color: "#94A3B8",
  },
});

export default ModalItens;
