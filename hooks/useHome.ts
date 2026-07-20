import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { toastsucesso } from "../Components/Toast/toast";
import { useApp } from "../Contexts/UserApp";
import erros from "../utils/errors";
import { Addlista, obterLista } from "../utils/requisicao";

type dadosListaType = {
  id: string;
  created_at: string;
  usuario_id: string;
  nome_Lista: string;
  atualização: string;
  status_lista: number;
};

type typeReturnUseHome = {
  adicionarLista: (name: string) => Promise<void>;
  showModalADD: boolean;
  setShowModalAdd: (value: boolean) => void;
  listaNaoConcluida: dadosListaType[];
};

const useHome = (): typeReturnUseHome => {
  const router = useRouter();
  const [atualizar, setAtualizar] = useState(0);
  const [showModalADD, setShowModalAdd] = useState(false);
  const { user, setListas } = useApp();
  const status = "Não comprado";
  const { listas } = useApp();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user, router]);

  useFocusEffect(
    useCallback(() => {
      if (!user) return;

      try {
        const buscarLista = async () => {
          const { data: dataLista, error: errorLista } = await obterLista({
            idUsuario: user.id,
          });

          if (errorLista) {
            throw errorLista;
          }

          setListas(dataLista ?? []);
        };
        buscarLista();
      } catch (erro) {
        erros(erro);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [atualizar, user, setListas]),
  );

  const adicionarLista = async (name: string) => {
    if (!user) return;
    try {
      const { error } = await Addlista({
        nome_Lista: name,
        status_lista: status,
        usuario_id: user.id,
      });
      if (error) {
        throw error;
      }

      toastsucesso("Lista adicionada com sucerro");
      setShowModalAdd(!showModalADD);
      setAtualizar((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const listaNaoConcluida = listas.filter((lista) => lista.status_lista === 0);
  return {
    adicionarLista,
    showModalADD,
    setShowModalAdd,
    listaNaoConcluida,
  };
};

export default useHome;
