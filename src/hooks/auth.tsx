import React, { createContext, ReactNode, useContext } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
}

const AuthContext = createContext({} as AuthContextData);

function AuthContextProvider({ children }: AuthProviderProps) {
  const user = {
    id: "1",
    name: "John Doe",
    email: "johndoe@gmail.com",
    photo: "https://avatars0.githubusercontent.com/u/28929274?s=460&v=4"
  }

  return (
    <AuthContext.Provider
      value={{
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthContextProvider, useAuth };
