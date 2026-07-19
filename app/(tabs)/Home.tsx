import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BoxLista from "../../Components/BoxLista/inde";
import BtnAdd from "../../Components/BtnAdd";
import HeaderTabs from "../../Components/HeaderTabs";
import Inputs from "../../Components/Inputs";
import ModalAdicionar from "../../Components/Modals/ModalAdicionar/ModalAdicionar";
import TelaVazia from "../../Components/TelaVazia";
import { useApp } from "../../Contexts/UserApp";
import useHome from "../../hooks/useHome";

const HomePage = () => {
  const { adicionarLista, showModalADD, setShowModalAdd } = useHome();
  const { user, listas } = useApp();
  if (!user) return;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTabs user={user} />

      <View style={{ alignItems: "center" }}>
        <Inputs placeholder="Procure sua lista" IconName="search" />
      </View>

      <View style={styles.listaContainer}>
        <View>
          <Text style={styles.textoLista}>Listas</Text>
        </View>

        <View style={{ width: "100%", height: "100%", paddingBottom: 120 }}>
          {!listas || listas.length === 0 ? (
            <TelaVazia
              Texto1="Sua lista está vazia."
              texto2="Que tal adicionar seu primeiro Item?"
            />
          ) : (
            <ScrollView>
              {listas.map((lista) => (
                <BoxLista key={lista.id} lista={lista} />
              ))}
            </ScrollView>
          )}
        </View>
      </View>

      <View style={styles.btnAddPosition}>
        <BtnAdd onPress={() => setShowModalAdd(true)} />

        <ModalAdicionar
          visible={showModalADD}
          onCancel={() => setShowModalAdd(false)}
          onCreate={(name) => adicionarLista(name)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101422",
    padding: 24,
  },

  listaContainer: {
    marginTop: 16,
    justifyContent: "center",
  },

  textoLista: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#64748B",
  },

  btnAddPosition: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    position: "absolute",
    bottom: "5%",
    right: "5%",
  },
});

export default HomePage;
