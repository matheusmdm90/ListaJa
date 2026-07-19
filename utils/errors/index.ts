import Toast from "react-native-toast-message";

const erros = (erro: any) => {
  if (erro?.status === 400) {
    Toast.show({
      type: "Erros",
      text1: "Erro ao entrar!",
      text2: "E-mail ou senha estão incorretos.",
      position: "top", // 'top' ou 'bottom'
      visibilityTime: 3000, // 3 segundos
    });
    return;
  }
  if (erro?.status === 0) {
    Toast.show({
      type: "Erros",
      text1: "Erro ao entrar!",
      text2: "Sem acesso a intenet",
      position: "top", // 'top' ou 'bottom'
      visibilityTime: 3000, // 3 segundos
    });

    return;
  }

  if (erro?.code === 23505) {
    Toast.show({
      type: "Erros",
      text1: "Erro ao cadastra usuario!",
      text2: "usuario ja existe",
      position: "top", // 'top' ou 'bottom'
      visibilityTime: 3000, // 3 segundos
    });
  }

  if (erro) {
    console.log("erro não rastreado", erro.message);
    Toast.show({
      type: "Erros",
      text1: "Ops! Algo deu errado",
      text2: "Tente novamente mais tarde.",
      position: "top",
      visibilityTime: 4000,
    });
    return;
  }
};

export default erros;
