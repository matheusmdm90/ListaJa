import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

// fazer login auth supabase

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

// pegando os dados do usuario

export const obterUsuario = async ({ id_usuario }: { id_usuario?: string }) => {
  let { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("user_id", id_usuario)
    .single();

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
  user: User;
}) => {
  let { data, error } = await supabase
    .from("user")
    .insert([{ nome, email, user_id: user?.id }]);
  return { data, error };
};

// cria uma lista nova

export const Addlista = async ({
  usuario_id,
  nome_Lista,
  status_lista,
}: {
  usuario_id: string;
  nome_Lista: string;
  status_lista: string;
}) => {
  let { data, error } = await supabase
    .from("lista")
    .insert([{ usuario_id, nome_Lista, status_lista }]);
  return { data, error };
};

// Pegar lista do usuario

export const obterLista = async ({ idUsuario }: { idUsuario: string }) => {
  let { data, error } = await supabase
    .from("lista")
    .select("*")
    .eq("usuario_id", idUsuario);
  return { data, error };
};

// buscar o itens da lista

export const obterItensLista = async ({ idDaLista }: { idDaLista: string }) => {
  let { data, error } = await supabase
    .from("item")
    .select("*")
    .eq("lista_id", idDaLista)
    .order("order_status", { ascending: true })
    .order("created_at", { ascending: true });

  return { data, error };
};

// adicionat item

export const adicionarItem = async ({
  nome_item,
  lista_id,
  status_item,
}: {
  nome_item: string;
  lista_id: string;
  status_item: string;
}) => {
  let { data, error } = await supabase
    .from("item")
    .insert([{ nome_item, lista_id, status_item }]);
  return { data, error };
};

// updade item

export const UpdateItem = async ({
  quantidade,
  valor_item,
  idItem,
  status_item,
  order_status,
}: {
  quantidade: number;
  valor_item: number;
  idItem: string;
  status_item: string;
  order_status: number;
}) => {
  let { data, error } = await supabase
    .from("item")
    .update({ quantidade, valor_item, status_item, order_status })
    .eq("id", idItem)
    .select();

  return { data, error };
};

// excluir item

export const excluirItem = async ({ idItem }: { idItem: string }) => {
  const { error } = await supabase.from("item").delete().eq("id", idItem);

  return { error };
};
