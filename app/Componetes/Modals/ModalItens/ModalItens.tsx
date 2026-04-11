import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const ModalItens = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        backdropColor={"#1A1F2E50"}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                flex: 1,
              }}
            >
              <View style={styles.container}>
                <View
                  style={{
                    width: "90%",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                  }}
                >
                  <Pressable onPress={() => setShowModal(!showModal)}>
                    <MaterialIcons name="close" size={24} color={"#3B82F6"} />
                  </Pressable>
                </View>

                <View style={{ alignItems: "center" }}>
                  <View style={styles.boxICon}>
                    <MaterialIcons
                      name="shopping-cart"
                      size={24}
                      color={"#3B82F6"}
                    />
                  </View>

                  <Text style={styles.titulo}>Arroz 5kg</Text>

                  <Text style={styles.textAux}>Ajuste os detalhes do item</Text>

                  <View style={{ alignItems: "center", gap: 5, marginTop: 32 }}>
                    <Text style={styles.textItens}>Quantidade</Text>

                    <View style={styles.boxOpcao}>
                      <Pressable style={styles.btnMenos}>
                        <MaterialIcons
                          name="remove"
                          size={24}
                          color={"#FFFF"}
                        />
                      </Pressable>
                      <Text style={styles.textUnd}>1</Text>
                      <Pressable style={styles.btnMais}>
                        <MaterialIcons name="add" size={24} color={"#FFFF"} />
                      </Pressable>
                    </View>
                  </View>

                  <View style={{ alignItems: "center", gap: 5, marginTop: 32 }}>
                    <Text style={styles.textItens}>Preço Unitário</Text>

                    <View style={styles.boxOpcao}>
                      <Text style={styles.textValue}>R$</Text>
                      <TextInput
                        keyboardType="decimal-pad"
                        placeholder="0,00"
                        placeholderTextColor={"#FFFFFF30"}
                        style={styles.input}
                      />
                    </View>
                  </View>

                  <Pressable style={styles.btnConfirmar}>
                    <Text>Confirmar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>

      <Pressable onPress={() => setShowModal(!showModal)}>
        <MaterialIcons name="more-vert" size={24} color={"#3B82F6"} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 342,
    height: 584,
    backgroundColor: "#1A1F2E",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 32,
  },

  boxICon: {
    width: 64,
    height: 64,
    backgroundColor: "#3B82F620",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    color: "#FFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },

  textAux: {
    fontSize: 14,
    color: "#94A3B8",
  },

  textItens: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#64748B",
  },

  boxOpcao: {
    width: 276,
    height: 74,
    backgroundColor: "#FFFFFF05",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#FFFFFF10",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
    marginTop: 16,
  },

  btnMenos: {
    width: 56,
    height: 56,
    backgroundColor: "#FFFFFF15",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  textBtn: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFF",
  },

  btnMais: {
    width: 56,
    height: 56,
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  textUnd: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFF",
  },
  textValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B82F6",
    paddingHorizontal: 21,
  },

  input: {
    width: 190,
    fontSize: 24,
    color: "#ffff",
    fontWeight: "bold",
  },

  btnConfirmar: {
    width: 279,
    height: 68,
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
});

export default ModalItens;
