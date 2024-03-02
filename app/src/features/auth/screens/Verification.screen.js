import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AuthContainer from "../components/AuthContainer.component";

import { useNavigation, useRoute } from "@react-navigation/native";
import authApi from "@src/api/auth";
import { setIsLoading } from "@src/store/slices/appSlice";
import withLoading from "@src/utils/withLoading";
import { useTranslation } from "react-i18next";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";

const PinItem = React.forwardRef(
  ({ value, setValue, nextItem, prevItem }, ref) => (
    <TextInput
      ref={ref}
      style={styles.input}
      maxLength={1}
      textContentType="oneTimeCode"
      onChangeText={(value) => {
        setValue(value);
        if (value && nextItem) nextItem.current.focus();
      }}
      onKeyPress={({ nativeEvent }) => {
        if (nativeEvent.key === "Backspace" && value === "" && prevItem) {
          prevItem.current.focus();
        }
      }}
      keyboardType="numeric"
      value={value}
      clearTextOnFocus={true}
    />
  )
);

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
  const [seconds, setSeconds] = useState(60);
  const code = useRef("");

  useEffect(() => {
    code.current = `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`;
    if (code.current.length === 6) {
      handleVerifyEmail();
    }
  }, [pin1, pin2, pin3, pin4, pin5, pin6]);

  const handleVerifyEmail = async () => {
    dispatch(setIsLoading(true));
    withLoading(
      dispatch,
      async () => {
        const data = { code: code.current, password, isResetPassword };
        await authApi.verifyEmail(data);
        //navigate back
        if (isResetPassword) {
          navigation.navigate("ForgotPassword", { isVerified: true });
        } else {
          navigation.navigate("PersonalInfo", { email });
        }
      },
      (error) => {
        showMessage({
          message: t("failed"),
          type: "danger",
        });
      }
    );
  };
  //counter
  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds((sec) => sec - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);
  const handleResendOTP = async () => {
    await authApi.sendVerificationEmail({ email, isResetPassword: true });
  };

  return (
    <AuthContainer>
      <View style={styles.containerInput}>
        <PinItem
          value={pin1}
          setValue={setPin1}
          nextItem={refPin2}
          ref={refPin1}
        />
        <PinItem
          value={pin2}
          setValue={setPin2}
          nextItem={refPin3}
          prevItem={refPin1}
          ref={refPin2}
        />
        <PinItem
          value={pin3}
          setValue={setPin3}
          nextItem={refPin4}
          prevItem={refPin2}
          ref={refPin3}
        />
        <PinItem
          value={pin4}
          setValue={setPin4}
          nextItem={refPin5}
          prevItem={refPin3}
          ref={refPin4}
        />
        <PinItem
          value={pin5}
          setValue={setPin5}
          nextItem={refPin6}
          prevItem={refPin4}
          ref={refPin5}
        />
        <PinItem
          value={pin6}
          setValue={setPin6}
          nextItem={null}
          prevItem={refPin5}
          ref={refPin6}
        />
      </View>
      {/* <Text style={styles.title}>Verification</Text> */}
      <Text style={styles.description}>
        We've sent you the verification code on your email
      </Text>
      <TouchableOpacity
        style={styles.btnContinue}
        onPress={() => handleVerifyEmail()}
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
    borderColor: "gray",
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
