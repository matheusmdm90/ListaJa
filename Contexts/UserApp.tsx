import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { obterUsuario } from "../utils/requisicao";

type UserContextType = {
  user: dadosDoUsuariotype | null;
  setUser: React.Dispatch<React.SetStateAction<dadosDoUsuariotype | null>>;
  dadosLogin: (userData: dadosDoUsuariotype | null) => void;
  listas: dadosListaType[];
  setListas: React.Dispatch<React.SetStateAction<dadosListaType[]>>;
};

type dadosListaType = {
  id: string;
  created_at: string;
  usuario_id: string;
  nome_Lista: string;
  atualização: string;
  status_lista: number;
};

type dadosDoUsuariotype = {
  id: string;
  user_id: string;
  created_at: string;
  nome: string;
  email: string;
};

const UserAppCtx = createContext<UserContextType | null>(null);

export const UserAppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<dadosDoUsuariotype | null>(null);
  const [listas, setListas] = useState<dadosListaType[]>([]);
  const { user: authUser } = useAuth();

  useEffect(() => {
    let isActive = true;

    const carregarPerfil = async () => {
      if (!authUser) {
        setUser(null);
        return;
      }

      try {
        const { data, error } = await obterUsuario({
          id_usuario: authUser.id,
        });

        if (isActive && !error && data) {
          setUser(data);
        }
      } catch (erro) {
        console.log("Erro ao carregar perfil do usuário:", erro);
      }
    };

    carregarPerfil();

    return () => {
      isActive = false;
    };
  }, [authUser]);

  const dadosLogin = (userData: dadosDoUsuariotype | null) => {
    setUser(userData);
  };

  return (
    <UserAppCtx.Provider
      value={{ user, setUser, dadosLogin, listas, setListas }}
    >
      {children}
    </UserAppCtx.Provider>
  );
};

export const useApp = () => {
  const context = useContext(UserAppCtx);
  if (!context) {
    throw new Error("useApp must be used within UserAppProvider");
  }
  return context;
};
