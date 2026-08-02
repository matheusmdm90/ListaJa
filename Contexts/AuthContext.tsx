import { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo, ReactNode } from "react";
import { supabase } from "../utils/supabase";
import type { Session } from "@supabase/supabase-js";

/**
 * Forma como o usuário será representado dentro do nosso app.
 */
type AppUser = {
  id: string;
  email: string;
  nome: string;
};

/**
 * Estrutura do contexto de autenticação.
 */
type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
  signingIn: boolean;
  signIn: (email: string, senha: string) => Promise<{ error: string | null }>;
  signUp: (email: string, senha: string, nome: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthCtx = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

const mapUser = (session: Session | null): AppUser | null => {
  if (!session?.user) return null;
  return {
    id: session.user.id,
    email: session.user.email ?? "",
    nome: session.user.user_metadata?.nome ?? session.user.user_metadata?.full_name ?? "",
  };
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  /**
   * Guarda o último user_id conhecido para evitar updates desnecessários.
   * Isso reduz re-render cascata causada por TOKEN_REFRESHED repetido.
   */
  const lastUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const inicializarSessao = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (!isActive) return;

        if (error) {
          console.log("Erro ao recuperar sessao:", error.message);
          setUser(null);
        } else {
          const mapped = mapUser(session);
          lastUserIdRef.current = mapped?.id ?? null;
          setUser(mapped);
        }
      } catch (erro) {
        if (!isActive) return;
        console.log("Erro inesperado na inicializacao:", erro);
        setUser(null);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    inicializarSessao();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      if (!isActive) return;

      const mapped = mapUser(session);
      const nextId = mapped?.id ?? null;

      /**
       * Atualiza o estado apenas se o usuário realmente mudou.
       * TOKEN_REFRESHED pode chegar sem alteração de sessão; se ignorarmos,
       * reduzimos re-renders e evitas o loop com expo-router.
       */
      if (nextId !== lastUserIdRef.current) {
        lastUserIdRef.current = nextId;
        setUser(mapped);
      }
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, senha: string) => {
    setSigningIn(true);
    try {
      const emailLimpo = email.trim();

      if (!emailLimpo || !senha) {
        return { error: "Preencha email e senha." };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: emailLimpo,
        password: senha,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          return { error: "Email ou senha incorretos." };
        }
        if (error.message.includes("Email not confirmed")) {
          return { error: "Confirme seu email antes de entrar." };
        }
        return { error: error.message || "Erro ao fazer login." };
      }

      return { error: null };
    } catch (erro) {
      console.log("Erro inesperado no signIn:", erro);
      return { error: "Erro inesperado ao fazer login. Tente novamente." };
    } finally {
      setSigningIn(false);
    }
  }, []);

  const signUp = useCallback(async (email: string, senha: string, nome: string) => {
    setSigningIn(true);
    try {
      const emailLimpo = email.trim();
      const nomeLimpo = nome.trim();

      if (!emailLimpo || !senha || !nomeLimpo) {
        return { error: "Preencha todos os campos." };
      }

      if (senha.length < 6) {
        return { error: "A senha deve ter pelo menos 6 caracteres." };
      }

      const { error } = await supabase.auth.signUp({
        email: emailLimpo,
        password: senha,
        options: {
          data: {
            nome: nomeLimpo,
          },
        },
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          return { error: "Este email ja esta cadastrado." };
        }
        return { error: error.message || "Erro ao criar conta." };
      }

      return { error: null };
    } catch (erro) {
      console.log("Erro inesperado no signUp:", erro);
      return { error: "Erro inesperado ao criar conta. Tente novamente." };
    } finally {
      setSigningIn(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.log("Erro no logout:", error.message);
      }

      setUser(null);
    } catch (erro) {
      console.log("Erro inesperado no signOut:", erro);
      setUser(null);
    }
  }, []);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      loading,
      signingIn,
      signIn,
      signUp,
      signOut,
    }),
    [user, loading, signingIn, signIn, signUp, signOut]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthCtx);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
