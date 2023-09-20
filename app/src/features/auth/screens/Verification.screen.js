import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import AuthContainer from "../components/AuthContainer.component";
import {
  useSendVerificationEmailMutation,
  useVerifyEmailQuery,
} from "@src/store/slices/api/authApi";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@src/store/slices/appSlice";
import { showMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";

const Verification = () => {
  const { email, password, isResetPassword = false } = useRoute().params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const refPin1 = useRef(null);
  const refPin2 = useRef(null);
  const refPin3 = useRef(null);
  const refPin4 = useRef(null);
  const refPin5 = useRef(null);
  const refPin6 = useRef(null);
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");
  const [pin5, setPin5] = useState("");
  const [pin6, setPin6] = useState("");
  const [isFirstMount, setIsFirstMount] = useState(true);
  const [seconds, setSeconds] = useState(60);
  const code = useRef("");

  const [sendVerificationEmail, { isLoading: isSending, isSuccess }] =
    useSendVerificationEmailMutation();
  const {
    isLoading: isVerifying,
    data,
    isSuccess: isEmailVerified,
  } = useVerifyEmailQuery(
    { code: code.current, password, isResetPassword },
    {
      skip: code.current.length !== 6,
    }
  );
  console.log("isVerifying", isVerifying, isEmailVerified, isResetPassword);
  useEffect(() => {
    code.current = `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`;
  }, [pin1, pin2, pin3, pin4, pin5, pin6]);

  useEffect(() => {
    if (isFirstMount) {
      setIsFirstMount(() => false);
    } else {
      if (!isVerifying && isEmailVerified) {
        if (isResetPassword) {
          navigation.navigate("ForgotPassword", { isVerified: true });
        } else {
          navigation.navigate("Login");
        }
      } else if (!isVerifying && !isEmailVerified) {
        showMessage({
          message: t("failed"),
          type: "danger",
        });
      }
      dispatch(setIsLoading(isVerifying));
    }
  }, [isVerifying, isEmailVerified]);

  useEffect(() => {
    if (isSuccess) {
      //notify user
    }
  }, [isSuccess]);
  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds((sec) => sec - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);
  const handleResendOTP = () => {
    sendVerificationEmail({ email, isResetPassword: true });
  };
  const handleVerification = () => {};

  return (
    <AuthContainer>
      <View style={styles.containerInput}>
        <TextInput
          ref={refPin1}
          style={styles.input}
          maxLength={1}
          textContentType="oneTimeCode"
          onChangeText={(value) => {
            setPin1(value);
            if (value) refPin2.current.focus();
          }}
          keyboardType="numeric"
          autoFocus={true}
          value={pin1}
          clearTextOnFocus={true}
        />
        <TextInput
          ref={refPin2}
          style={styles.input}
          maxLength={1}
          textContentType="oneTimeCode"
          onChangeText={(value) => {
            setPin2(value);
            if (value) refPin3.current.focus();
          }}
          keyboardType="numeric"
          value={pin2}
          clearTextOnFocus={true}
        />
        <TextInput
          ref={refPin3}
          style={styles.input}
          textContentType="oneTimeCode"
          maxLength={1}
          onChangeText={(value) => {
            setPin3(value);
            if (value) refPin4.current.focus();
          }}
          keyboardType="numeric"
          value={pin3}
          clearTextOnFocus={true}
        />
        <TextInput
          ref={refPin4}
          style={styles.input}
          textContentType="oneTimeCode"
          maxLength={1}
          onChangeText={(value) => {
            setPin4(value);
            if (value) refPin5.current.focus();
          }}
          keyboardType="numeric"
          value={pin4}
          clearTextOnFocus={true}
        />
        <TextInput
          ref={refPin5}
          style={styles.input}
          textContentType="oneTimeCode"
          maxLength={1}
          onChangeText={(value) => {
            setPin5(value);
            if (value) refPin6.current.focus();
          }}
          keyboardType="numeric"
          value={pin5}
          clearTextOnFocus={true}
        />
        <TextInput
          ref={refPin6}
          style={styles.input}
          maxLength={1}
          textContentType="oneTimeCode"
          onChangeText={setPin6}
          keyboardType="numeric"
          value={pin6}
          clearTextOnFocus={true}
        />
      </View>
      {/* <Text style={styles.title}>Verification</Text> */}
      <Text style={styles.description}>
        We've sent you the verification code on your email
      </Text>
      <TouchableOpacity
        style={styles.btnContinue}
        onPress={() => handleVerification()}
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

      {seconds === 0 ? (
        <TouchableOpacity
          onPress={handleResendOTP}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Resend
          </Text>
        </TouchableOpacity>
      ) : (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          {seconds}
        </Text>
      )}
    </AuthContainer>
  );
};

export default Verification;

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "black",
    textAlign: "center",
    color: "black",
    fontSize: 22,
    backgroundColor: "white",
    fontWeight: "600",
    elevation: 2,
    marginLeft: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "black",
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    width: "65%",
    fontSize: 16,
    color: "black",
    marginBottom: 50,
    textAlign: "center",
  },
  btnContinue: {
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    width: 240,
    backgroundColor: "black",
  },
});
