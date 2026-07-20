import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, StyleSheet, Text } from "react-native";

type LogoutButtonProps = {
  title?: string;
  onPress?: () => void;
};

const LogoutButton = ({
  title = "Sair da Conta",
  onPress,
}: LogoutButtonProps) => {
  return (
    <Pressable style={styles.btnLogout} onPress={onPress}>
      <MaterialIcons name="logout" size={24} color="#FB7185" />
      <Text style={styles.textLogout}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnLogout: {
    marginTop: 60,
    width: "100%",
    height: 72,
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

export default LogoutButton;
