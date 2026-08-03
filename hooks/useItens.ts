import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { avisoCampoInvalido, toastsucesso } from "../Components/Toast/toast";
import { ITENS_SUPERMERCADO } from "../data/dataItem";
import erros from "../utils/errors";
import {
  adicionarItem,
  excluirItem,
  excluirLista,
  obterItensLista,
  UpdateItem,
  UpdateListaConcluida,
} from "../utils/requisicao";
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
type useItemretunr = {
  deletarLista: () => Promise<void>;
  excluirITemLista: (idItem: string) => Promise<void>;
  atualizarItem: (params: {
    quantidade: number;
    valor: number;
    idItem: string;
  }) => Promise<void>;
  adicionaritens: (name: string) => Promise<void>;
  listaSurgestao: string[];
  setItemSelecionado: (value: string | null) => void;
  itemSelecionado: string | null;
  showModalExcluir: string | null;
  setShowModalExcluit: (value: string | null) => void;
  itens: dadosItensType[];
  setShowModalAdd: (value: boolean) => void;
  showModalAdd: boolean;
  nomeLista: string;
  dataCriacao: string;
  totalGeral: number;
  pronto: boolean;
  finalizando: boolean;
  showModalExcluirLista: boolean;
  setShowModalExcluirLista: (value: boolean) => void;
  verificarListaConcluida: () => Promise<void>;
  listaConcluida: boolean;
};

const useItens = (): useItemretunr => {
  const router = useRouter();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [pronto, setPronto] = useState(false);
  const [finalizando, setFinalizando] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<string | null>(null);
  const [showModalExcluir, setShowModalExcluit] = useState<string | null>(null);
  const [showModalExcluirLista, setShowModalExcluirLista] = useState(false);
  const [atualizar, setAtualizar] = useState(0);
  const [itens, setItens] = useState<dadosItensType[]>([]);
  const { idLista, nomeLista, dataCriacao, statusListas } =
    useLocalSearchParams<{
      idLista: string;
      nomeLista: string;
      dataCriacao: string;
      statusListas: string;
    }>();
  const [listaSurgestao, setlistaSurgestao] = useState<string[]>([]);
  const [listaConcluida, setListaConcluida] = useState(false);

  useFocusEffect(
    useCallback(
      () => {
        let isActive = true;
        try {
          const buscarIntens = async () => {
            const { data: dataItens, error: errorDataItens } =
              await obterItensLista({
                idDaLista: idLista,
              });
            if (errorDataItens) {
              throw errorDataItens;
            }

            if (isActive) {
              setItens(dataItens ?? []);
              setPronto(true);
            }
          };
          buscarIntens();
        } catch (erro) {
          erros(erro);
          setPronto(true);
        }
        if (statusListas === "1") {
          setListaConcluida(true);
        }

        return () => {
          isActive = false;
        };
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
    } else {
      setlistaSurgestao([" "]);
    }
  }, [nomeLista]);

  const adicionaritens = async (name: string) => {
    const { error: errorAddItem } = await adicionarItem({
      lista_id: idLista,
      nome_item: name,
      status_item: "Item não comprando",
    });
    if (errorAddItem) {
      throw errorAddItem;
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
        status_item: 1,
        order_status: 1,
      });
      if (errorAoAtualizar) {
        throw errorAoAtualizar;
      }

      setAtualizar((prev) => prev + 1);
      setItemSelecionado(null);
    } catch (erro) {
      erros(erro);
    }
  };

  const excluirITemLista = async (idItem: string) => {
    try {
      const { error: erroraoexcluir } = await excluirItem({
        idItem,
      });
      if (erroraoexcluir) {
        throw erroraoexcluir;
      }
      setAtualizar((prev) => prev + 1);
    } catch (erro) {
      erros(erro);
    }
  };

  const deletarLista = async () => {
    try {
      const { error: erroDeletarLista } = await excluirLista({
        idLista,
      });

      if (erroDeletarLista) {
        throw erroDeletarLista;
      }

      router.back();
    } catch (erro) {
      erros(erro);
    }
  };

  const totalGeral =
    itens?.reduce((total, item) => {
      const subtotal = (item.quantidade ?? 0) * (item.valor_item ?? 0);
      return total + subtotal;
    }, 0) ?? 0;

  const verificarListaConcluida = async () => {
    if (!pronto) {
      return;
    }
    if (itens.length === 0) {
      avisoCampoInvalido("Lista vazia");
      return;
    }

    if (!itens) {
      return;
    } else if (itens.every((iten) => iten.order_status === 1)) {
      try {
        setFinalizando(true);
        const { error } = await UpdateListaConcluida({
          id_lista: idLista,
          status_lista: 1,
        });
        if (error) {
          throw error;
        }
        toastsucesso("Lista concluida!!");
        router.push("/Home");
      } catch (erro) {
        erros(erro);
      } finally {
        setFinalizando(false);
      }
    } else {
      avisoCampoInvalido("1 ou mais itens não foram comprados ");
    }
  };

  return {
    deletarLista,
    excluirITemLista,
    atualizarItem,
    adicionaritens,
    listaSurgestao,
    itemSelecionado,
    showModalExcluir,
    setShowModalExcluit,
    itens,
    dataCriacao,
    setShowModalAdd,
    showModalAdd,
    setItemSelecionado,
    nomeLista,
    totalGeral,
    pronto,
    finalizando,
    showModalExcluirLista,
    setShowModalExcluirLista,
    verificarListaConcluida,
    listaConcluida,
  };
};

export default useItens;
