import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AuthContainer from "../components/auth-container.component";
import InputText from "../components/text-input.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  Error,
  AuthButton,
  AuthButtonContent,
} from "../components/authentication.style";
import handleValidation from "../../../utils/validator";
import { nameSchema } from "../../../utils/validationSchemas";
const RegisterScreen1 = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const navigateToRegister2 = () => {
    if (Object.keys(validationErrors).length == 0) {
      console.log("err", validationErrors);
      navigation.navigate("Register2", {
        firstname,
        lastname,
        dateOfBirth,
      });
    } else {
      console.log("cannot navigate");
    }
  };
  return (
    <AuthContainer>
      <InputText
        iconLeft={"account"}
        setText={setFirstname}
        hasValidationError={validationErrors.firstname}
        placeholder={"Tên"}
        onBlur={() =>
          handleValidation(
            nameSchema,
            "firstname",
            firstname,
            validationErrors,
            setValidationErrors
          )
        }
      ></InputText>
      {validationErrors.firstname && (
        <Error variant="error">{validationErrors.firstname}</Error>
      )}
      <InputText
        iconLeft={"account"}
        setText={setLastname}
        hasValidationError={validationErrors.lastname}
        onBlur={() =>
          handleValidation(
            nameSchema,
            "lastname",
            lastname,
            validationErrors,
            setValidationErrors
          )
        }
        placeholder={"Họ"}
      ></InputText>
      {validationErrors.lastname && (
        <Error variant="error">{validationErrors.lastname}</Error>
      )}
      <InputText
        iconLeft={"cake"}
        setText={setDateOfBirth}
        hasValidationError={validationErrors.password}
        placeholder={"Ngày sinh"}
      ></InputText>
      {validationErrors.password && (
        <Error variant="error">{validationErrors.password}</Error>
      )}

      <Spacer variant="bottom" size="huge"></Spacer>

      <View>
        <AuthButton onPress={navigateToRegister2}>
          <AuthButtonContent>Tiếp tục</AuthButtonContent>
        </AuthButton>
        <Spacer variant="top" size="large"></Spacer>
        <AuthButton onPress={() => navigation.goBack()}>
          <AuthButtonContent>Quay lại đăng nhập</AuthButtonContent>
        </AuthButton>
      </View>
    </AuthContainer>
  );
};

export default RegisterScreen1;

const styles = StyleSheet.create({});
