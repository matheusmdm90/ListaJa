import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { formatarValor } from "../../utils/fortmatacao";

type BoxItensType = {
  item: any;
  setItemSelecionado: () => void;
  ModalExclui: () => void;
  atualizarItem?: (payload: {
    valor: number;
    idItem: string;
    quantidade: number;
  }) => void;
};
/**
 * Componente que renderiza o itens da lista
 *
 * @returns
 */
const BoxItens = ({
  item,
  setItemSelecionado,
  ModalExclui,
  atualizarItem,
}: BoxItensType) => {
  return (
    <Pressable
      style={styles.boxItens}
      onPress={setItemSelecionado}
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
            <MaterialIcons name="shopping-cart" color={"#3B82F6"} size={24} />
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
          <Pressable onPress={ModalExclui}>
            <MaterialIcons name="delete" size={24} color={"#64748B"} />
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
                atualizarItem?.({
                  valor: item.valor_item ?? 0,
                  idItem: item.id,
                  quantidade: Math.max(0, (item.quantidade ?? 0) - 1),
                })
              }
            >
              <MaterialIcons name="remove" size={14} color={"#F1F5F9"} />
            </Pressable>
            <Text style={styles.textBoxItens1}>
              {" "}
              {item.quantidade ? item.quantidade : 0}
            </Text>
            <Pressable
              style={styles.btnBoxUnidade}
              onPress={() =>
                atualizarItem?.({
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
            {item.valor_item ? formatarValor(item.valor_item) : "0,00"}
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
  );
};

const styles = StyleSheet.create({
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

  itemComprado: {
    color: "#49ca65",
  },
});

export default BoxItens;
