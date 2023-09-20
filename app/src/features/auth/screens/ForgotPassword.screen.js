import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AuthContainer from "../components/AuthContainer.component";
import InputText from "../components/TextInput.component";
import { useState } from "react";
import { useEffect } from "react";
import {
  useResetPasswordMutation,
  useSendVerificationEmailMutation,
} from "@src/store/slices/api/authApi";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@src/store/slices/appSlice";
import { showMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";
import { useRoute } from "@react-navigation/native";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [newPassword, setNewPassword] = useState();

  const { isVerified } = useRoute().params;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [
    sendVerificationEmail,
    { isLoading: isSending, isSuccess: sentSuccess },
  ] = useSendVerificationEmailMutation();
  const [resetPassword, { isSuccess }] = useResetPasswordMutation();
  const sendEmailResetPassword = () => {
    sendVerificationEmail({ email, isResetPassword: true });
  };
  console.log("Email", "password", email, newPassword);
  const resetAccountPassword = () => {
    resetPassword({ email, newPassword });
  };
  useEffect(() => {
    if (isSuccess) {
      navigation.navigate("Login");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (!isSending) {
      if (sentSuccess) {
        navigation.navigate("Verification", { email, isResetPassword: true });
      } else {
        // showMessage({
        //   message: t("failed"),
        //   type: "danger",
        // });
      }
    }
    dispatch(setIsLoading(isSending));
  }, [isSending, sentSuccess]);
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
