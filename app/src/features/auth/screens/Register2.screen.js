import { Alert, View } from "react-native";
import { useState, useContext, useEffect } from "react";
import React from "react";

import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AuthButton,
  Error,
  AuthButtonContent,
} from "../components/authentication.style";
import AuthContainer from "../components/AuthContainer.component";
import InputText from "../components/TextInput.component";
import { Text } from "../../../components/typography/text.component";
import { accountSchema } from "../../../utils/validationSchemas";
import {
  handleValidateField,
  handleValidateObject,
} from "../../../utils/validator";
import { ActivityIndicator } from "react-native-paper";
import { useCreateUserMutation } from "@src/store/slices/api/userApiSlice";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@src/store/slices/appSlice";

const RegisterScreen2 = ({ navigation, route }) => {
  const [createUser, { error, isSuccess, isLoading, ...createUserResult }] =
    useCreateUserMutation();
  const { firstname, lastname, dateOfBirth } = route.params;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  const navigateBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    //register succeeded
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setEmail("");
      // setFirstname("");
      // setLastname("");
      // setDateOfBirth(null);
      setConfirmPassword("");
      navigation.navigate("Login");
    }
    dispatch(setIsLoading(isLoading));
  }, [isLoading]);
  const handleRegistration = async () => {
    if (Object.keys(validationErrors) == 0) {
      try {
        const data = {
          email,
          username,
          password,
          firstname,
          lastname,
          dateOfBirth,
        };
        await createUser(data);
      } catch (err) {
        console.log("error", er);
      }
    }
  };
  if (isLoading) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  return (
    <AuthContainer>
      <InputText
        iconLeft={"email"}
        setText={setEmail}
        hasValidationError={validationErrors.email}
        placeholder={"Email"}
        onBlur={() =>
          handleValidateField(
            accountSchema,
            "email",
            email,
            validationErrors,
            setValidationErrors
          )
        }
      ></InputText>
      {validationErrors.email && (
        <Error variant="error">{validationErrors.email}</Error>
      )}
      <InputText
        iconLeft={"account"}
        setText={setUsername}
        hasValidationError={validationErrors.username}
        onBlur={() =>
          handleValidateField(
            accountSchema,
            "username",
            username,
            validationErrors,
            setValidationErrors
          )
        }
        placeholder={"Tên đăng nhập"}
      ></InputText>
      {validationErrors.username && (
        <Error variant="error">{validationErrors.username}</Error>
      )}
      <InputText
        iconLeft={"lock"}
        setText={setPassword}
        passwordType
        onBlur={() =>
          handleValidateField(
            accountSchema,
            "password",
            password,
            validationErrors,
            setValidationErrors
          )
        }
        hasValidationError={validationErrors.password}
        placeholder={"Mật khẩu"}
      ></InputText>
      {validationErrors.password && (
        <Error variant="error">{validationErrors.password}</Error>
      )}
      <InputText
        iconLeft={"lock"}
        setText={setConfirmPassword}
        passwordType
        onBlur={() =>
          handleValidateObject(
            accountSchema,
            {
              password: password,
              confirmPassword: confirmPassword,
            },
            ["confirmPassword"],
            validationErrors,
            setValidationErrors
          )
        }
        hasValidationError={validationErrors.confirmPassword}
        placeholder={"Nhập lại mật khẩu"}
      ></InputText>
      {validationErrors.confirmPassword && (
        <Error variant="error">{validationErrors.confirmPassword}</Error>
      )}

      {error && (
        <View>
          <Text variant="error">{error}</Text>
        </View>
      )}
      <Spacer variant="bottom" size="huge"></Spacer>

      <View>
        <AuthButton onPress={handleRegistration}>
          <AuthButtonContent>Đăng ký</AuthButtonContent>
        </AuthButton>
        <Spacer variant="top" size="large"></Spacer>
        <AuthButton onPress={navigateBack}>
          <AuthButtonContent>Quay lại </AuthButtonContent>
        </AuthButton>
      </View>
    </AuthContainer>
  );
};

export default RegisterScreen2;
