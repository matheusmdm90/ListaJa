import { StyleSheet, Text, View } from "react-native";

type typeTelaVazia = {
  Texto1: string;
  texto2: string;
};

/**
 *  componente que redenriza quando não tem nenhum Item na Lista
 * @param Texto1 - Mensagem exibida no estado vazio
 * @param Texto2 - Sugestão para o usuario
 * @returns
 */
const TelaVazia = ({ Texto1, texto2 }: typeTelaVazia) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.listaVazia}>{Texto1}</Text>
      <Text style={styles.listaVazia}>{texto2}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listaVazia: {
    color: "#94A3B8",
    fontSize: 16,
    fontWeight: "semibold",

    textAlign: "center",
  },
});

export default TelaVazia;
