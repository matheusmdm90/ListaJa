import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
};

const ModalExcluir: React.FC<Props> = ({
  visible,
  onConfirm,
  onCancel,
  message = "Tem certeza que deseja remover este item da sua lista?",
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <View style={styles.iconWrapper}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={28}
                color="#ff6b6b"
              />
            </View>
          </View>

          <Text style={styles.title}>Excluir item?</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={onConfirm}
          >
            <Text style={styles.primaryText}>Excluir</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.85}
            onPress={onCancel}
          >
            <Text style={styles.secondaryText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(6,6,10,0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: 360,
    backgroundColor: "#222733",
    borderRadius: 28,
    paddingTop: 48,
    paddingBottom: 20,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 10,
  },
  iconWrapper: {
    position: "absolute",
    top: -36,
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.03)",
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#402b33",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 6,
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
  },
  message: {
    marginTop: 12,
    fontSize: 15,
    textAlign: "center",
    color: "#9aa0aa",
    lineHeight: 22,
    marginBottom: 18,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#f04b4b",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#f04b4b",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: Platform.OS === "ios" ? 0.35 : 0.2,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 12,
  },
  primaryText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  secondaryButton: {
    width: "100%",
    backgroundColor: "#2f3240",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    color: "#cfd6db",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default ModalExcluir;
