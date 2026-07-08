import { MaterialIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

interface btn {
  login: () => void;
  loading: boolean;
  nameIcon?: MaterialIconName;
  nomeBtn: string;
}

const Botao = ({ login, loading, nameIcon, nomeBtn }: btn) => {
  return (
    <Pressable
      style={[styles.btn, loading && { opacity: 0.6 }]}
      onPress={login}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          <Text style={styles.btnText}>{nomeBtn} </Text>
          <MaterialIcons name={nameIcon} color={"#ffff"} size={16} />
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "80%",
    height: 56,
    backgroundColor: "#2559F4",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
    marginTop: 16,

    shadowColor: "#2559F4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // por a sombrar na parte de baixo do android

    elevation: 4,
  },

  btnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
});
export default Botao;
