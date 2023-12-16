import { useRoute } from "@react-navigation/native";
import authApi from "@src/api/auth";
import withLoading from "@src/utils/withLoading";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import AuthContainer from "../components/AuthContainer.component";
import InputText from "../components/TextInput.component";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [newPassword, setNewPassword] = useState();

  const { isVerified } = useRoute().params;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const sendEmailResetPassword = async () => {
    await withLoading(
      dispatch,
      async () => {
        await authApi.sendVerificationEmail({ email, isResetPassword: true });
        navigation.navigate("Verification", { email, isResetPassword: true });
      },
      () => {
        showMessage({
          message: t("failed"),
          type: "danger",
        });
      }
    );
  };
  const resetAccountPassword = async () => {
    await withLoading(
      dispatch,
      async () => {
        await authApi.resetPassword({ email, newPassword });
        navigation.navigate("Login");
      },
      () => {
        showMessage({
          message: t("failed"),
          type: "danger",
        });
      }
    );
  };

  return (
    <AuthContainer>
      {isVerified ? (
        <InputText
          iconLeft={"lock"}
          text={newPassword}
          setText={setNewPassword}
          passwordType
          placeholder={"Mật khẩu mới"}
        ></InputText>
      ) : (
        <InputText
          text={email}
          iconLeft={"email"}
          setText={setEmail}
          placeholder={"Email"}
        ></InputText>
      )}
      <TouchableOpacity
        style={styles.btnContinue}
        onPress={() => {
          if (isVerified) {
            resetAccountPassword();
          } else {
            sendEmailResetPassword();
          }
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: "white",
          }}
        >
          Next
        </Text>
      </TouchableOpacity>
    </AuthContainer>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  btnContinue: {
    padding: 6,
    justifyContent: "center",
    marginTop: 32,
    alignItems: "center",
    borderRadius: 4,
    width: 240,
    backgroundColor: "black",
  },
});
