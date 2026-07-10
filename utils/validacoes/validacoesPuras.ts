const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

/**
 * Verifica se o e-mail tem um formato válido.
 */
export function isEmailValido(email: string): boolean {
  return !!email && EMAIL_REGEX.test(email);
}

/**
 * Verifica se dois e-mails são iguais (usado na confirmação de e-mail).
 */
export function emailsConferem(email: string, confirmeEmail: string): boolean {
  return email === confirmeEmail;
}

/**
 * Verifica se a senha atende ao tamanho mínimo exigido.
 */
export function isSenhaValida(senha: string, tamanhoMinimo = 8): boolean {
  return !!senha && senha.length >= tamanhoMinimo;
}

/**
 * Verifica se duas senhas são iguais (usado na confirmação de senha).
 */
export function senhasConferem(senha: string, confirmeSenha: string): boolean {
  return senha === confirmeSenha;
}

/**
 * Verifica se o nome não esta vazio.
 */

export const nomeValido = (nome: string): boolean => {
  return !!nome?.trim();
};
