import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { formatarValor } from "../../utils/fortmatacao";

const VisorTotal = ({
  totalGeral,
  onPress,
  ready = true,
  loading = false,
}: {
  totalGeral: number;
  onPress: () => void;
  ready?: boolean;
  loading?: boolean;
}) => {
  const disabled = !ready || loading;

  return (
    <View style={styles.abaTotal}>
      <View>
        <Text style={styles.abaTotalText1}> Total Estimado </Text>
        <Text style={styles.abaTotalText2}>R$ {formatarValor(totalGeral)}</Text>
      </View>
      <Pressable
        style={[
          styles.abaTotalBtn,
          !ready && styles.abaTotalBtnDisabled,
          loading && styles.abaTotalBtnDisabled,
        ]}
        disabled={disabled}
        onPress={onPress}
      >
        {loading ? (
          <ActivityIndicator color="#F1F5F9" />
        ) : (
          <Text style={styles.abaTotalBtnTexto}>
            {ready ? "Finalizar" : "Carregando..."}
          </Text>
        )}
      </Pressable>
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
  abaTotalBtnDisabled: {
    backgroundColor: "#FFFFFF10",
  },
});

export default VisorTotal;
