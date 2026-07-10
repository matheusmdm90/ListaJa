import { useRouter } from "expo-router";
import { useState } from "react";

import erros from "../utils/errors";
import { CadastrarUsuario, fazerCadastro } from "../utils/requisicao";

import { toastsucesso } from "../Components/Toast/toast";
import validarCadastro from "../utils/validacoes/validarCadastro";

export const useCadastro = () => {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmeEmail, setConfirmeEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmeSenha, setConfirmeSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const criarCadastro = async () => {
    if (!validarCadastro(nome, email, confirmeEmail, senha, confirmeSenha)) {
      return;
    }
    setLoading(true);

    try {
      const { data: usuarioSupabase } = await fazerCadastro({
        email: email,
        password: senha,
        name: nome,
      });
      if (!usuarioSupabase || !usuarioSupabase.user) {
        throw Error;
      } else {
        const { error: erroCadastrarUsuario } = await CadastrarUsuario({
          email: email,
          nome: nome,
          user: usuarioSupabase.user,
        });
        if (erroCadastrarUsuario) {
          throw Error;
        }
        toastsucesso("Cadastro Criado com Sucesso");
        router.push("/");
        setConfirmeEmail("");
        setNome("");
        setEmail("");
        setConfirmeSenha("");
        setSenha("");
      }
    } catch (erro) {
      // cadatrar erro code 23505
      erros(erro);
    } finally {
      setLoading(false); // 👈 sempre desliga o loading, mesmo se der erro
    }
  };

  return {
    criarCadastro,
    setNome,
    setConfirmeEmail,
    setEmail,
    setConfirmeSenha,
    setSenha,
    loading,
    nome,
    confirmeEmail,
    email,
    confirmeSenha,
    senha,
  };
};
