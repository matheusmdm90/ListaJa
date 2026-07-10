import { avisoCampoInvalido } from "../../Components/Toast/toast";
import {
  emailsConferem,
  isEmailValido,
  isSenhaValida,
  nomeValido,
  senhasConferem,
} from "./validacoesPuras";

/**
 * Valida o cadastro
 */

const validarCadastro = (
  nome: string,
  email: string,
  confirmeEmail: string,
  senha: string,
  confirmeSenha: string,
): boolean => {
  if (!nomeValido(nome)) {
    avisoCampoInvalido("Nome é obrigatorio");
    return false;
  }

  if (!isEmailValido(email)) {
    avisoCampoInvalido("Email é Obrigatorio");
    return false;
  }

  if (!emailsConferem(email, confirmeEmail)) {
    avisoCampoInvalido("Email não confere");
    return false;
  }

  if (!isSenhaValida(senha)) {
    avisoCampoInvalido("a senha deve conter pelomenso 8 digitos");
    return false;
  }

  if (!senhasConferem(senha, confirmeSenha)) {
    avisoCampoInvalido("Senha não confere");
    return false;
  }

  return true;
};

export default validarCadastro;
