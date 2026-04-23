import { User } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  dadosLogin: (userData: User | null) => void;
  listas: dadosListaType[] | null;
  setLitas: React.Dispatch<React.SetStateAction<dadosListaType[]>>;
};

type dadosListaType = {
  id: string;
  created_at: string;
  usuiario_id: string;
  nome_Lista: string;
  atualização: string;
  status_lista: string;
};

export const UserAppCtx = createContext<UserContextType | null>(null);

export const UserAppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [listas, setLitas] = useState<dadosListaType[]>([]);

  const dadosLogin = (userData: User | null) => {
    setUser(userData);
  };

  return (
    <UserAppCtx.Provider
      value={{ user, setUser, dadosLogin, listas, setLitas }}
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
