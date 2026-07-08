import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ModalAdicionar from "../Components/Modals/ModalAdicionar/ModalAdicionar";
import ModalExcluir from "../Components/Modals/ModalExcluir/ModalExcluir";
import ModalItens from "../Components/Modals/ModalItens/ModalItens";
import { ITENS_SUPERMERCADO } from "../data/dataItem";
import {
  adicionarItem,
  excluirItem,
  excluirLista,
  obterItensLista,
  UpdateItem,
} from "../utils/requisicao";

const Itens = () => {
  type dadosItensType = {
    id: string;
    created_at: string;
    nome_item: string;
    quantidade?: number;
    valor_item?: number;
    lista_id: string;
    status_item: string;
    order_status: number;
  };

  const router = useRouter();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<string | null>(null);
  const [showModalExcluir, setShowModalExcluit] = useState<string | null>(null);
  const [atualizar, setAtualizar] = useState(0);
  const [itens, setItens] = useState<dadosItensType[]>();
  const { idLista, nomeLista, dataCriacao } = useLocalSearchParams<{
    idLista: string;
    nomeLista: string;
    dataCriacao: string;
  }>();
  const [listaSurgestao, setlistaSurgestao] = useState<string[] | undefined>(
    undefined,
  );

  useFocusEffect(
    useCallback(
      () => {
        try {
          const buscarIntens = async () => {
            const { data: dataItens, error: errorDataItens } =
              await obterItensLista({
                idDaLista: idLista,
              });
            if (errorDataItens) {
              Alert.alert("Erro ao buscar Itens", errorDataItens?.message);
              return;
            }

            setItens(dataItens ?? []);
          };
          buscarIntens();
        } catch {
          Alert.alert(
            "Erro de conexão",
            "Sem internet, por favor tente novamente.",
          );
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [atualizar, idLista, setItens],
    ),
  );

  useEffect(() => {
    if (
      nomeLista.toLowerCase().includes("mercado") ||
      nomeLista.toLowerCase().includes("compras")
    ) {
      setlistaSurgestao(ITENS_SUPERMERCADO);
    }
  }, [nomeLista]);

  const adicionaritens = async ({ name }: { name: string }) => {
    const { error: errorAddItem } = await adicionarItem({
      lista_id: idLista,
      nome_item: name,
      status_item: "Item não compardo",
    });
    if (errorAddItem) {
      Alert.alert("Erro ao adicionar item", errorAddItem?.message);
    }
    setShowModalAdd(!showModalAdd);
    setAtualizar((prev) => prev + 1);
  };

  const atualizarItem = async ({
    quantidade,
    valor,
    idItem,
  }: {
    quantidade: number;
    valor: number;
    idItem: string;
  }) => {
    try {
      const { error: errorAoAtualizar } = await UpdateItem({
        idItem: idItem,
        quantidade: quantidade,
        valor_item: valor,
        status_item: "Item comprado",
        order_status: 1,
      });
      if (errorAoAtualizar) {
        Alert.alert("Erro ao adicionar item", errorAoAtualizar?.message);
      }

      setAtualizar((prev) => prev + 1);
      setItemSelecionado(null);
    } catch {
      Alert.alert("Erro ao adicionar item", "tente de novo");
    }
  };

  const formatarValor = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const totalGeral =
    itens?.reduce((total, item) => {
      const subtotal = (item.quantidade ?? 0) * (item.valor_item ?? 0);
      return total + subtotal;
    }, 0) ?? 0;

  const excluirITemLista = async ({ idItem }: { idItem: string }) => {
    const { error: erroraoexcluir } = await excluirItem({
      idItem: idItem,
    });
    if (erroraoexcluir) {
      Alert.alert("Erro ao adicionar item", erroraoexcluir?.message);
    }
    setAtualizar((prev) => prev + 1);
  };

  const deletarLista = async () => {
    try {
      const { error: erroDeletarLista } = await excluirLista({
        idLista,
      });

      if (erroDeletarLista) {
        throw new Error("não foi possivel excluir a lista ");
      }
      console.log("Lista excluida com sucesso");
      router.back();
    } catch (erro) {
      console.log(erro);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable style={styles.btnBack} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={"#F1F5F9"} />
          </Pressable>

          <View>
            <Text style={styles.textHeadrd1}>{nomeLista}</Text>

            <Text style={styles.textHeadrd2}>
              {new Date(dataCriacao).toLocaleDateString("pt-br")}
            </Text>
          </View>
        </View>

        <View>
          <Pressable onPress={deletarLista}>
            <MaterialIcons name="delete" size={24} color={"#64748B"} />
          </Pressable>
        </View>
      </View>

      <View style={{ width: "100%", height: "85%" }}>
        {!itens || itens.length === 0 ? (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.listaVazia}>Poxa!! sua lista está vazia.</Text>
            <Text style={styles.listaVazia}>
              Que tal adicionar um item nela?
            </Text>
          </View>
        ) : (
          <ScrollView>
            {itens.map((item) => (
              <Pressable
                style={styles.boxItens}
                onPress={() => setItemSelecionado(item.id)}
                key={item.id}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "50%",
                  }}
                >
                  <View style={{ flexDirection: "row", gap: 16 }}>
                    <View style={styles.IconBoxItens}>
                      <MaterialIcons
                        name="shopping-cart"
                        color={"#3B82F6"}
                        size={24}
                      />
                    </View>
                    <View>
                      <Text style={styles.textBoxItens1}>{item.nome_item}</Text>
                      <Text
                        style={[
                          styles.textBoxItens2,
                          item.order_status === 1 && styles.itemComprado,
                        ]}
                      >
                        {item.status_item}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation(); // 👈 impede o clique de subir para o Pressable pai
                        setShowModalExcluit(item.id);
                      }}
                    >
                      <MaterialIcons
                        name="delete"
                        size={24}
                        color={"#64748B"}
                      />
                    </Pressable>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "50%",
                  }}
                >
                  <View>
                    <View style={styles.boxUnidade}>
                      <Pressable
                        style={styles.btnBoxUnidade}
                        onPress={() =>
                          atualizarItem({
                            valor: item.valor_item ?? 0,
                            idItem: item.id,
                            quantidade: Math.max(0, (item.quantidade ?? 0) - 1),
                          })
                        }
                      >
                        <MaterialIcons
                          name="remove"
                          size={14}
                          color={"#F1F5F9"}
                        />
                      </Pressable>
                      <Text style={styles.textBoxItens1}>
                        {" "}
                        {item.quantidade ? item.quantidade : 0}
                      </Text>
                      <Pressable
                        style={styles.btnBoxUnidade}
                        onPress={() =>
                          atualizarItem({
                            valor: item.valor_item ?? 0,
                            idItem: item.id,
                            quantidade: Math.max(0, (item.quantidade ?? 0) + 1),
                          })
                        }
                      >
                        <MaterialIcons name="add" size={14} color={"#F1F5F9"} />
                      </Pressable>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.textBoxItens2}>PREÇO UN.</Text>
                    <Text style={styles.textBoxItens1}>
                      {" "}
                      {item.valor_item
                        ? formatarValor(item.valor_item)
                        : "0,00"}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.textBoxItens2}>SUBTOTAL</Text>
                    <Text style={styles.textBoxItens1}>
                      {item.quantidade && item.valor_item
                        ? formatarValor(item.quantidade * item.valor_item) // só multiplica se os dois existirem
                        : "0,00"}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>
      {/* modal dos dados do itens  */}

      {itemSelecionado &&
        (() => {
          const item = itens.find((i) => i.id === itemSelecionado)!; // acha o item pelo id

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

      {showModalExcluir &&
        (() => {
          const item = itens.find((i) => i.id === showModalExcluir)!;
          if (!item) return null;
          return (
            <ModalExcluir
              idItem={item.id}
              visible={!!showModalExcluir}
              onCancel={() => setShowModalExcluit(null)}
              onConfirm={(idItem) => excluirITemLista({ idItem })}
            />
          );
        })()}

      {/* modal adicionar item  */}
      <ModalAdicionar
        visible={showModalAdd}
        onCancel={() => setShowModalAdd(false)}
        onCreate={(name) => adicionaritens({ name })}
        titulo="Novo Item"
        valor="Item"
        placeholder="Digite o nome do Item "
        sugestoes={listaSurgestao}
      />

      <View style={styles.btnAddPosition}>
        <View style={styles.abaTotal}>
          <View>
            <Text style={styles.abaTotalText1}> Total Estimado </Text>
            <Text style={styles.abaTotalText2}>
              R$ {formatarValor(totalGeral)}
            </Text>
          </View>
          <View style={styles.abaTotalBtn}>
            <Text style={styles.abaTotalBtnTexto}>Finalizar</Text>
          </View>
        </View>
        <Pressable style={styles.btnAdd} onPress={() => setShowModalAdd(true)}>
          <MaterialIcons name="add" color={"#FFFF"} size={36} />
        </Pressable>
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btnBack: {
    width: 40,
    height: 40,
    backgroundColor: "#ffffff10",
    borderWidth: 1,
    borderColor: "#ffffff20",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  textHeadrd1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFF",
  },

  textHeadrd2: {
    fontSize: 12,
    color: "#94A3B8",
  },

  boxItens: {
    width: "100%",
    height: 130,
    backgroundColor: "#FFFFFF10",
    borderWidth: 1,
    borderColor: "#FFFFFF15",
    borderRadius: 16,
    marginTop: 16,
    gap: 10,
    alignItems: "center",
    flexDirection: "column",
    padding: 16,
  },

  IconBoxItens: {
    width: 40,
    height: 40,
    backgroundColor: "#3B82F610",
    borderWidth: 1,
    borderColor: "#3B82F620",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  textBoxItens1: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffff",
  },

  textBoxItens2: {
    fontSize: 12,
    fontWeight: "medium",
    color: "#94A3B8",
  },

  boxUnidade: {
    width: 115,
    height: 42,
    flexDirection: "row",
    backgroundColor: "#00000020",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 100,
    padding: 5,
  },

  btnBoxUnidade: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: "#FFFFFF10",
    alignItems: "center",
    justifyContent: "center",
  },

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

  btnAddPosition: {
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    bottom: "5%",
    right: "5%",
    flexDirection: "row",
    gap: 12,
  },

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

  listaVazia: {
    color: "#94A3B8",
    fontSize: 16,
    fontWeight: "semibold",

    textAlign: "center",
  },

  itemComprado: {
    color: "#49ca65",
  },
});

export default Itens;
