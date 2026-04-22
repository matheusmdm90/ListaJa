import { supabase } from "./supabase";

// fazer login

export const fazerLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  return { data, error };
};

// fazer cadastro supaBase

export const fazerCadastro = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: { data: { name } },
  });
  return { data, error };
};

// cadastrar usuario no banco de dados

export const CadastrarUsuario = async ({
  nome,
  email,
  user,
}: {
  nome: string;
  email: string;
  user: any;
}) => {
  let { data, error } = await supabase
    .from("user")
    .insert([{ nome, email, user_id: user?.id }]);
  return { data, error };
};
