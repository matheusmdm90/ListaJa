import { createContext, useContext, useState } from "react";

type UserContextType = {
  user: dadosDoUsuario | null;
  setUser: React.Dispatch<React.SetStateAction<dadosDoUsuario | null>>;
  dadosLogin: (userData: dadosDoUsuario | null) => void;
  listas: dadosListaType[];
  setListas: React.Dispatch<React.SetStateAction<dadosListaType[]>>;
};

type dadosListaType = {
  id: string;
  created_at: string;
  usuiario_id: string;
  nome_Lista: string;
  atualização: string;
  status_lista: string;
};

type dadosDoUsuario = {
  id: string;
  user_is: string;
  created_at: string;
  nome: string;
  email: string;
};

export const UserAppCtx = createContext<UserContextType | null>(null);

export const UserAppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<dadosDoUsuario | null>(null);
  const [listas, setListas] = useState<dadosListaType[]>([]);

  const dadosLogin = (userData: dadosDoUsuario | null) => {
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
