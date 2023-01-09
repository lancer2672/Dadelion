import React, { useState } from "react";
import { createContext } from "react";
import setAuthToken from "../../utils/setAuthToken";
import { LoginRequest, RegisterRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (username, password) => {
    setIsLoading(true);
    LoginRequest(username, password)
      .then((res) => {
        const { token, user } = res.data;
        setAuthToken(token);
        setUser(user);
        setIsLoading(false);
        setError(null);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log("er", e);
        setError(e.toString());
      });
  };

  const onRegister = (email, username, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    RegisterRequest(email, username, password)
      .then(function (response) {
        setIsLoading(false);
        setError(null);
      })
      .catch(function (error) {
        setIsLoading(false);
        setError(error.response.data);
      });
  };

  const onLogout = () => {
    return;
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
