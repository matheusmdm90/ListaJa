import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

const BtnAdd = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable style={styles.btnAdd} onPress={onPress}>
      <MaterialIcons name="add" color={"#FFFF"} size={36} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
});
export default BtnAdd;
