import Toast from "react-native-toast-message";

export const avisoCampoInvalido = (mensagem: string) => {
  Toast.show({
    type: "info",
    text1: "Aviso!",
    text2: mensagem,
    position: "top",
    visibilityTime: 3000,
  });
};
/**
 * Toast de sucesso
 */
export const toastsucesso = (mensagem: string) => {
  Toast.show({
    type: "sucesso2",
    text1: "Sucesso!",
    text2: mensagem,
    position: "top",
    visibilityTime: 3000,
  });
};
