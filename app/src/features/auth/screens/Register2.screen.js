import { useState } from "react";
import { View } from "react-native";

import authApi from "@src/api/auth";
import userApi from "@src/api/user";
import withLoading from "@src/utils/withLoading";
import { useDispatch } from "react-redux";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { accountSchema } from "../../../utils/validationSchemas";
import { handleValidateField } from "../../../utils/validator";
import AuthContainer from "../components/AuthContainer.component";
import InputText from "../components/TextInput.component";
import {
  AuthButton,
  AuthButtonContent,
  Error,
} from "../components/authentication.style";

const RegisterScreen2 = ({ navigation, route }) => {
  const { firstname, lastname, dateOfBirth } = route.params;
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  const navigateBack = () => {
    navigation.goBack();
  };

  const handleRegistration = async () => {
    if (Object.keys(validationErrors) == 0) {
      const data = {
        email,
        password,
        firstname,
        lastname,
        dateOfBirth,
      };
      withLoading(
        dispatch,
        async () => {
          await userApi.createUser(data);
          await authApi.sendVerificationEmail({ email });
          navigation.navigate("Verification", { email, password });
        },
        (error) => {
          setError(error);
        }
      );
    }
  };

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
