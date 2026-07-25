import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
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
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../../Components/Toast/toastConfig";

type Props = {
  visible: boolean;
  onCreate: (name: string) => Promise<void>;
  onCancel: () => void;
  titulo?: string;
  valor?: string;
  placeholder?: string;
  sugestoes?: string[];
};

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
  const [loading, setLoading] = useState(false);
  const [sugestoesVisiveis, setSugestoesVisiveis] = useState<string[]>([]);

  const titleText = titulo ?? "Nova Lista";
  const placeholderText = placeholder ?? "Ex: Churrasco, Mercado, Roupa";
  const createLabel = valor ?? "Lista";

  const resetModalState = () => {
    setName("");
    setSugestoesVisiveis([]);
  };

  const handleChangeText = (text: string) => {
    setName(text);

    if (!sugestoes?.length || text.length === 0) {
      setSugestoesVisiveis([]);
      return;
    }

    const filtrados = sugestoes
      .filter((item) => item.toLowerCase().startsWith(text.toLowerCase()))
      .slice(0, 5);

    setSugestoesVisiveis(filtrados);
  };

  const handleSuggestionPress = (item: string) => {
    setName(item);
    setSugestoesVisiveis([]);
  };

  const handleClose = () => {
    resetModalState();
    onCancel();
  };

  const handleCreate = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      alert("Por favor, digite um nome");
      return;
    }

    setLoading(true);

    try {
      await onCreate(trimmedName);
      resetModalState();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={handleClose}
      backdropColor={"#1A1F2E50"}
    >
      <Toast config={toastConfig} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        style={styles.flex}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.backdrop}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Pressable onPress={handleClose} hitSlop={8}>
                  <MaterialCommunityIcons
                    name="close"
                    size={24}
                    color="#bfc7d6"
                  />
                </Pressable>
              </View>

              <Text style={styles.title}>{titleText}</Text>
              <Text style={styles.subtitle}>
                Defina um nome para começar a organizar.
              </Text>

              <Text style={styles.label}>NOME</Text>

              <View style={styles.inputWrapper}>
                <TextInput
                  value={name}
                  onChangeText={handleChangeText}
                  placeholder={placeholderText}
                  placeholderTextColor="#6b7380"
                  style={styles.input}
                  returnKeyType="done"
                />

                {sugestoesVisiveis.length > 0 && (
                  <View style={styles.sugestoes}>
                    {sugestoesVisiveis.map((item, index) => {
                      const isLastItem = index === sugestoesVisiveis.length - 1;

                      return (
                        <Pressable
                          key={item}
                          style={[
                            styles.sugestaoItem,
                            !isLastItem && styles.sugestaoItemBorder,
                          ]}
                          onPress={() => handleSuggestionPress(item)}
                        >
                          <MaterialCommunityIcons
                            name="magnify"
                            size={16}
                            color="#64748B"
                          />
                          <Text style={styles.sugestaoTexto}>{item}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              </View>

              <View style={styles.spacer} />

              <TouchableOpacity
                style={[
                  styles.createButton,
                  loading && styles.createButtonLoading,
                ]}
                activeOpacity={0.85}
                onPress={handleCreate}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <View style={styles.createContent}>
                    <View style={styles.plusCircle}>
                      <MaterialCommunityIcons
                        name="plus"
                        size={24}
                        color="#ffff"
                      />
                    </View>
                    <Text style={styles.createText}>Criar {createLabel}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 24,
  },
  container: {
    width: "100%",
    maxWidth: 360,
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
  header: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-start",
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
  inputWrapper: {
    position: "relative",
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
  spacer: {
    height: 12,
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
  createButtonLoading: {
    opacity: 0.6,
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
    position: "absolute",
    top: "100%",
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
  },
  sugestaoItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  sugestaoTexto: {
    color: "#dbe7ff",
    fontSize: 14,
  },
});

export default ModalAdicionar;
