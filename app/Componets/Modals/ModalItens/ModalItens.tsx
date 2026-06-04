import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  ActivityIndicator,
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

interface ModalProps {
  idItem: string;
  nomeItem: string;
  visible: boolean;
  valorAtual: number;
  quantidadeAtual: number;
  onRequestClose?: () => void;
  onCreate: (
    quantidade: number,
    valor: number,
    idItem: string,
  ) => Promise<void>;
}

const ModalItens = ({
  visible,
  onRequestClose,
  onCreate,
  idItem,
  nomeItem,
  valorAtual,
  quantidadeAtual,
}: ModalProps) => {
  const [quantidade, setQuantidade] = useState(
    quantidadeAtual ? quantidadeAtual : 1,
  );
  const [valor, setValor] = useState(valorAtual ? `${valorAtual}` : "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    // transforma entring em number
    setLoading(true);
    try {
      await onCreate(quantidade, parseFloat(valor.replace(",", ".")), idItem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={false}
        onRequestClose={onRequestClose}
        visible={visible}
        backdropColor={"#1A1F2E50"}
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
                  <Pressable onPress={onRequestClose}>
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

                  <Text style={styles.titulo}>{nomeItem}</Text>

                  <Text style={styles.textAux}>Ajuste os detalhes do item</Text>

                  <View style={{ alignItems: "center", gap: 5, marginTop: 32 }}>
                    <Text style={styles.textItens}>Quantidade</Text>

                    <View style={styles.boxOpcao}>
                      <Pressable
                        style={styles.btnMenos}
                        onPress={() => setQuantidade((q) => Math.max(0, q - 1))}
                      >
                        <MaterialIcons
                          name="remove"
                          size={24}
                          color={"#FFFF"}
                        />
                      </Pressable>
                      <Text style={styles.textUnd}>{quantidade}</Text>
                      <Pressable
                        style={styles.btnMais}
                        onPress={() => setQuantidade((q) => q + 1)}
                      >
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
                        value={valor}
                        onChangeText={setValor}
                      />
                    </View>
                  </View>

                  <Pressable
                    style={[styles.btnConfirmar, loading && { opacity: 0.6 }]}
                    onPress={handleUpdate}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text>Confirmar</Text>
                    )}
                  </Pressable>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
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
