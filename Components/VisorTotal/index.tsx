import { StyleSheet, Text, View } from "react-native";
import { formatarValor } from "../../utils/fortmatacao";

const VisorTotal = ({ totalGeral }: { totalGeral: number }) => {
  return (
    <View style={styles.abaTotal}>
      <View>
        <Text style={styles.abaTotalText1}> Total Estimado </Text>
        <Text style={styles.abaTotalText2}>R$ {formatarValor(totalGeral)}</Text>
      </View>
      <View style={styles.abaTotalBtn}>
        <Text style={styles.abaTotalBtnTexto}>Finalizar</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  abaTotal: {
    width: "80%",
    height: 74,
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  abaTotalText1: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#DBEAFE",
  },

  abaTotalText2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFF",
  },

  abaTotalBtn: {
    width: 103,
    height: 42,
    borderWidth: 1,
    backgroundColor: "#FFFFFF20",
    borderColor: "#FFFFFF30",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  abaTotalBtnTexto: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F1F5F9",
  },
});

export default VisorTotal;
