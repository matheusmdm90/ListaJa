import { Image, StyleSheet, Text, View } from "react-native";

type User = {
  nome: string;
};

type HeaderTabsProps = {
  user: User;
};

const HeaderTabs = ({ user }: HeaderTabsProps) => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.headerTexto1}>Minha Lista</Text>
        <Text style={styles.headerTexto2}>
          Bem vindo de volta, {user.nome.split(" ")[0]}
        </Text>
      </View>

      <View>
        <Image
          style={styles.img}
          source={require("../../assets/images/avatar.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTexto1: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },

  headerTexto2: {
    color: "#94A3B8",
  },

  img: {
    width: 44,
    height: 44,
  },
});

export default HeaderTabs;
