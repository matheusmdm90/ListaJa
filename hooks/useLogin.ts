import { useState } from "react";
import Toast from "react-native-toast-message";
import { useApp } from "../Contexts/UserApp";
import erros from "../utils/errors";
import { fazerLogin, obterUsuario } from "../utils/requisicao";

interface UseLoginReturn {
  email: string;
  setEmail: (value: string) => void;
  senha: string;
  setSenha: (value: string) => void;
  loading: boolean;
  login: () => Promise<void>;
}

const useLogin = (): UseLoginReturn => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const { dadosLogin } = useApp();

  const login = async () => {
    if (!email?.trim()) {
      Toast.show({
        type: "Erros",
        text1: "Erro ao entrar!",
        text2: "Email Obrigatorio",
        position: "top", // 'top' ou 'bottom'
        visibilityTime: 3000, // 3 segundos
      });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await fazerLogin({
        email,
        password: senha,
      });

      if (error) {
        throw error;
      }

      const id = data.user?.id;
      const { data: dadosUser, error: errorDadosUser } = await obterUsuario({
        id_usuario: id,
      });
      if (errorDadosUser) {
        throw errorDadosUser;
      }

      Toast.show({
        type: "sucesso2",
        text1: "Sucesso!",
        text2: "Seu login foi realizado com sucesso.",
        position: "top", // 'top' ou 'bottom'
        visibilityTime: 3000, // 3 segundos
      });

      dadosLogin(dadosUser);
    } catch (erro: unknown) {
      erros(erro);
    } finally {
      setLoading(false);
    }
  };
  return {
    email,
    setEmail,
    senha,
    setSenha,
    loading,
    login,
  };
};

export default useLogin;
