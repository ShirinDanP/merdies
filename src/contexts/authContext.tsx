import React, { createContext, useContext } from "react";

import useSessionId from "../hooks/useSessionId";
import useAccessToken from "../hooks/useAccessToken";

/** AuthContext */
const AuthContext = createContext<any>({});

export const AuthContextProvider: React.FC<any> = ({ children }) => {
  const [{ accessToken }] = useAccessToken();
  const [{ sessionId }] = useSessionId(accessToken || "");
  return (
    <AuthContext.Provider value={{ accessToken, sessionId }}>
      {children}
    </AuthContext.Provider>
  );
};

/** AuthContext Hook */
export const useAuthContext = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "You should use auth context inside of AuthContextProvider!"
    );
  }

  return ctx;
};
