import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BoxItens from "../Components/BoxItens";
import BtnAdd from "../Components/BtnAdd";
import HeaderTelaItem from "../Components/HeaderTelaItem";
import ModalAdicionar from "../Components/Modals/ModalAdicionar/ModalAdicionar";
import ModalExcluir from "../Components/Modals/ModalExcluir/ModalExcluir";
import ModalItens from "../Components/Modals/ModalItens/ModalItens";
import TelaVazia from "../Components/TelaVazia";
import VisorTotal from "../Components/VisorTotal";
import useItens from "../hooks/useItens";

const Itens = () => {
  const {
    deletarLista,
    excluirITemLista,
    atualizarItem,
    adicionaritens,
    listaSurgestao,
    itemSelecionado,
    setItemSelecionado,
    showModalExcluir,
    setShowModalExcluit,
    itens,
    dataCriacao,
    setShowModalAdd,
    showModalAdd,
    nomeLista,
    totalGeral,
    pronto,
    verificarListaConcluida,
  } = useItens();

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTelaItem
        dataCriacao={dataCriacao}
        nomeLista={nomeLista}
        deletarLista={deletarLista}
      />

      <View style={{ width: "100%", height: "85%" }}>
        {!itens || itens.length === 0 ? (
          <TelaVazia
            Texto1="Poxa!! sua lista está vazia."
            texto2="Que tal adicionar um item nela? "
          />
        ) : (
          <ScrollView>
            {itens.map((item) => (
              <BoxItens
                key={item.id}
                setItemSelecionado={() => setItemSelecionado(item.id)}
                ModalExclui={() => setShowModalExcluit(item.id)}
                item={item}
                atualizarItem={(payload) =>
                  atualizarItem({
                    quantidade: payload.quantidade,
                    valor: payload.valor,
                    idItem: payload.idItem,
                  })
                }
              />
            ))}
          </ScrollView>
        )}
      </View>
      {/* modal add os dados do itens  */}

      {itemSelecionado &&
        (() => {
          const item = itens?.find((i) => i.id === itemSelecionado); // acha o item pelo id

          if (!item) return null;

          return (
            <ModalItens
              idItem={item.id}
              nomeItem={item.nome_item}
              valorAtual={item.valor_item ?? 0}
              quantidadeAtual={item.quantidade ?? 0}
              visible={!!itemSelecionado}
              onRequestClose={() => setItemSelecionado(null)}
              onCreate={(quantidade, valor, idItem) =>
                atualizarItem({ quantidade, valor, idItem })
              }
            />
          );
        })()}

      {/* modal excluir item  */}

      {showModalExcluir &&
        (() => {
          const item = itens?.find((i) => i.id === showModalExcluir);
          if (!item) return null;
          return (
            <ModalExcluir
              idItem={item.id}
              visible={!!showModalExcluir}
              onCancel={() => setShowModalExcluit(null)}
              onConfirm={(idItem) => excluirITemLista(idItem)}
            />
          );
        })()}

      {/* modal adicionar item  */}
      <ModalAdicionar
        visible={showModalAdd}
        onCancel={() => setShowModalAdd(false)}
        onCreate={(name) => adicionaritens(name)}
        titulo="Novo Item"
        valor="Item"
        placeholder="Digite o nome do Item "
        sugestoes={listaSurgestao}
      />

      <View style={styles.btnAddPosition}>
        <VisorTotal totalGeral={totalGeral} onPress={verificarListaConcluida} ready={pronto} />
        <BtnAdd onPress={() => setShowModalAdd(true)} />
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

  btnAddPosition: {
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    bottom: "5%",
    right: "5%",
    flexDirection: "row",
    gap: 12,
  },
});

export default Itens;
