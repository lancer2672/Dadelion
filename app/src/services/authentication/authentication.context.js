import React, { useEffect, useState } from "react";
import { createContext } from "react";
import setAuthToken from "../../utils/setAuthToken";
import {
  LoginRequest,
  RegisterRequest,
  CheckUserLoggedIn,
  StoreUserData,
  DeleteUserToken,
  TransformUserInformation,
  GetUserById,
} from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Load user token and id in SecureStore
  useEffect(() => {
    (async () => {
      try {
        const userData = await CheckUserLoggedIn();
        if (userData) {
          setAuthToken(userData.token);
          const res = await GetUserById(userData.userId);
          if (res) {
            setUser(TransformUserInformation(res.data.user));
            setIsAuthenticated(true);
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const onLogin = async (username, password, savePassword, progressEvent) => {
    try {
      setIsLoading(true);
      const data = await LoginRequest(username, password, progressEvent);
      const { token, user } = data;
      setAuthToken(token);
      setUser(TransformUserInformation(user));
      setIsLoading(false);
      setError(null);
      setIsAuthenticated(true);
      if (savePassword) {
        StoreUserData({
          token,
          userId: data.user._id,
        });
      }
    } catch (err) {
      console.log("err", err);
      setIsLoading(false);
      setAuthToken(null);
      setError("Thông tin đăng nhập không chính xác");
    }
  };

  const onRegister = (
    email,
    username,
    password,
    firstname,
    lastname,
    dateOfBirth
  ) => {
    setIsLoading(true);
    RegisterRequest(email, username, password, firstname, lastname, dateOfBirth)
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
    DeleteUserToken();
    setIsAuthenticated(false);
    setAuthToken(null);
    setUser(null);
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
