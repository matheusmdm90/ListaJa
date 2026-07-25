import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BoxLista from "../../Components/BoxLista/inde";
import HeaderTabs from "../../Components/HeaderTabs";
import Inputs from "../../Components/Inputs";
import TelaVazia from "../../Components/TelaVazia";
import { useApp } from "../../Contexts/UserApp";

const Concluidos = () => {
  const { listas } = useApp();

  const listaConcluida = listas.filter((lista) => lista.status_lista === 1);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTabs texto1="Concluido" texto2="Historico de compras" />

      <View style={{ alignItems: "center" }}>
        <Inputs placeholder="Procure sua lista" iconName="search" />
      </View>

      <View style={styles.textoHistoricos}>
        <Text style={styles.textoHistoricos1}>Histórico Recente</Text>
      </View>

      {!listaConcluida || listaConcluida.length === 0 ? (
        <TelaVazia
          Texto1="Você ainda não concluiu nenhuma lista"
          texto2="conclua uma lista!!"
        />
      ) : (
        <ScrollView>
          {listaConcluida.map((lista) => (
            <BoxLista
              key={lista.id}
              lista={lista}
              name="check-circle-outline"
              color={"#22C55E"}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101422",
    padding: 24,
  },

  textoHistoricos: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 16,
  },

  textoHistoricos1: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#64748B",
  },
});

export default Concluidos;
