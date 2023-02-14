import React, { useState } from "react";
import { createContext } from "react";
import setAuthToken from "../../utils/setAuthToken";
import {
  LoginRequest,
  RegisterRequest,
  TransformUserInformation,
} from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (username, password, progressEvent) => {
    setIsLoading(true);
    LoginRequest(username, password, progressEvent)
      .then((res) => {
        const { token, user } = res.data;
        setAuthToken(token);
        setUser(TransformUserInformation(user));
        setIsLoading(false);
        setError(null);
        setIsAuthenticated(true);
      })
      .catch((e) => {
        setIsLoading(false);
        setAuthToken(null);
        setError("Lỗi! Đăng nhập thất bại");
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
        setError("Lỗi! Đăng ký không thành công");
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
        isAuthenticated,
        setError,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
