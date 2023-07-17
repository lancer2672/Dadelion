import React, { useEffect, useState } from "react";
import { createContext } from "react";
import setAuthToken from "../../utils/setAuthToken";
import {
  loginRequest,
  registerRequest,
  checkUserLoggedIn,
  storeUserData,
  deleteUserToken,
  transformUserInformation,
  getUserById,
} from "./authentication.service";
import authApi from "../../api/authApi";
import userApi from "../../api/userApi";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginning, setIsLoginning] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Load user token and id in SecureStore
  useEffect(() => {
    onLogout();
    (async () => {
      try {
        const userData = await checkUserLoggedIn();
        if (userData) {
          setAuthToken(userData.token);
          const res = await getUserById(userData.userId);
          if (res) {
            console.log("getUserById - data", res.data);
            setUser(transformUserInformation(res.data.user));
            setIsAuthenticated(true);
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const onLogin = async (username, password, savePassword) => {
    try {
      setIsLoginning(true);
      const response = await authApi.login(username, password);
      const { token, user } = response.data.data;
      setAuthToken(token);
      setUser(transformUserInformation(user));
      setError(null);
      setIsAuthenticated(true);
      if (savePassword) {
        storeUserData({
          token,
          userId: data.user._id,
        });
      }
    } catch (err) {
      console.log("err", err);
      setAuthToken(null);
      setError("Thông tin đăng nhập không chính xác");
    } finally {
      setIsLoginning(false);
    }
  };

  const onRegister = async (data) => {
    setIsLoading(true);
    try {
      console.log("onRegister", data);
      const res = await userApi.createUser(data);
      setIsLoading(false);
      setError(null);
    } catch (e) {
      setIsLoading(false);
      setError("Lỗi! Đăng ký không thành công");
    }
  };

  const onLogout = () => {
    deleteUserToken();
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
        isLoginning,
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
