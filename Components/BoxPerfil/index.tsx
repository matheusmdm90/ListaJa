import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { type ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PerfilOptionProps = {
  title: string;
  icon: ComponentProps<typeof MaterialIcons>["name"];
  onPress?: () => void;
};

const PerfilOption = ({ title, icon, onPress }: PerfilOptionProps) => {
  return (
    <Pressable style={styles.boxLista} onPress={onPress}>
      <View style={styles.leftContent}>
        <View style={styles.IconBoxLista}>
          <MaterialIcons name={icon} color="#3B82F6" size={24} />
        </View>
        <Text style={styles.textBoxLista1}>{title}</Text>
      </View>

      <MaterialIcons name="keyboard-arrow-right" size={24} color="#3B82F6" />
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
    marginTop: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  IconBoxLista: {
    width: 40,
    height: 40,
    backgroundColor: "#3B82F610",
    borderWidth: 1,
    borderColor: "#3B82F610",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  textBoxLista1: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffff",
  },
});

export default PerfilOption;
