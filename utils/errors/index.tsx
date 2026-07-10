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
  if (erro) {
    Toast.show({
      type: "Erros",
      text1: "Erro ao entrar!",
      text2: "usuario não encontrado",
      position: "top", // 'top' ou 'bottom'
      visibilityTime: 3000, // 3 segundos
    });
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
};

export default erros;
