import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onCreate: (name: string) => void;
  onCancel: () => void;
  titulo?: string;
  // valor você vai dizer oque quer cria
  valor?: string;
  // e o placeholder do input oque vc quer colocar nele
  placeholder?: string;
  sugestoes?: string[];
};

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = Math.min(520, width - 40);

const ModalAdicionar = ({
  visible,
  onCreate,
  onCancel,
  titulo,
  valor,
  placeholder,
  sugestoes,
}: Props) => {
  const [name, setName] = useState("");

  const [sugestoesVisiveis, setSugestoesVisiveis] = useState<string[]>([]);

  const handleChangeText = (text: string) => {
    setName(text);
    if (sugestoes && text.length > 0) {
      // 👈 só filtra se vier sugestoes
      const filtrados = sugestoes
        .filter((item) => item.toLowerCase().startsWith(text.toLowerCase()))
        .slice(0, 5);
      setSugestoesVisiveis(filtrados);
    } else {
      setSugestoesVisiveis([]);
    }
  };

  const handleCreate = () => {
    if (!name.trim()) {
      alert("Por favor, digite um nome");
      return;
    }
    onCreate(name.trim());
    setName("");
    setSugestoesVisiveis([]);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        visible={visible}
        transparent={false}
        animationType="fade"
        onRequestClose={onCancel}
        backdropColor={"#1A1F2E50"}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.backdrop}>
              <View style={styles.container}>
                <View
                  style={{
                    width: "100%",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                  }}
                >
                  <Pressable onPress={onCancel}>
                    <MaterialCommunityIcons
                      name="close"
                      size={24}
                      color="#bfc7d6"
                    />
                  </Pressable>
                </View>

                <Text style={styles.title}>
                  {titulo ? titulo : "Nova Lista"}
                </Text>
                <Text style={styles.subtitle}>
                  Defina um nome para começar a organizar.
                </Text>

                <Text style={styles.label}>NOME</Text>
                <View style={{ position: "relative" }}>
                  <TextInput
                    value={name}
                    onChangeText={handleChangeText}
                    placeholder={
                      placeholder
                        ? placeholder
                        : "Ex: Churrasco, Mercado, Roupa"
                    }
                    placeholderTextColor="#6b7380"
                    style={styles.input}
                    returnKeyType="done"
                  />

                  {/* 👇 lista de sugestões */}
                  {sugestoesVisiveis.length > 0 && (
                    <View style={styles.sugestoes}>
                      {sugestoesVisiveis.map((item, index) => (
                        <Pressable
                          key={item}
                          style={[
                            styles.sugestaoItem,
                            index < sugestoesVisiveis.length - 1 && {
                              borderBottomWidth: 1,
                              borderBottomColor: "rgba(255,255,255,0.05)",
                            },
                          ]}
                          onPress={() => {
                            setName(item);
                            setSugestoesVisiveis([]);
                          }}
                        >
                          <MaterialCommunityIcons
                            name="magnify"
                            size={16}
                            color="#64748B"
                          />
                          <Text style={styles.sugestaoTexto}>{item}</Text>
                        </Pressable>
                      ))}
                    </View>
                  )}
                </View>

                <View style={{ height: 12 }} />

                <TouchableOpacity
                  style={styles.createButton}
                  activeOpacity={0.85}
                  onPress={handleCreate}
                >
                  <View style={styles.createContent}>
                    <View style={styles.plusCircle}>
                      <MaterialCommunityIcons
                        name="plus"
                        size={24}
                        color="#ffff"
                      />
                    </View>
                    <Text style={styles.createText}>
                      Criar {valor ? valor : "Lista"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    width: 360,
    alignSelf: "center",
    backgroundColor: "#1e2733",
    borderRadius: 22,
    paddingVertical: 26,
    paddingHorizontal: 22,

    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#eaf0ff",
  },
  subtitle: {
    marginTop: 6,
    color: "#97a0b8",
    fontSize: 15,
    marginBottom: 18,
  },
  label: {
    color: "#6f8ab8",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    color: "#dbe7ff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.02)",
  },
  createButton: {
    marginTop: 18,
    backgroundColor: "#3B82F6",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: Platform.OS === "ios" ? 0.35 : 0.18,
    shadowRadius: 18,
    elevation: 10,
  },
  createContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  plusCircle: {
    width: 34,
    height: 34,
    borderRadius: 18,
    backgroundColor: "#00000040",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  createText: {
    color: "#ffff",
    fontSize: 18,
    fontWeight: "700",
  },

  sugestoes: {
    position: "absolute", // flutua
    top: "100%", // cola abaixo do input
    left: 0,
    right: 0,
    marginTop: 6,
    backgroundColor: "#0f1420",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    elevation: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    zIndex: 999,
  },
  sugestaoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  sugestaoTexto: {
    color: "#dbe7ff",
    fontSize: 14,
  },
});

export default ModalAdicionar;
