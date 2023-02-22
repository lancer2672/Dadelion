import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";

import RNDateTimePicker from "@react-native-community/datetimepicker";
import AuthContainer from "../components/auth-container.component";
import InputText from "../components/text-input.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  Error,
  AuthButton,
  AuthButtonContent,
} from "../components/authentication.style";
import { handleValidateField } from "../../../utils/validator";
import { nameSchema, ageLimit } from "../../../utils/validationSchemas";

const dayjs = require("dayjs");
const RegisterScreen1 = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date("01/01/2002"));
  const [formatedDateOfBirth, setFormatedDateOfBirth] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigateToRegister2 = () => {
    handleValidateField(
      nameSchema,
      "firstname",
      firstname,
      validationErrors,
      setValidationErrors
    );
    handleValidateField(
      nameSchema,
      "lastname",
      lastname,
      validationErrors,
      setValidationErrors
    );
    if (!lastname || !firstname) {
      return;
    }
    console.log("length", Object.keys(validationErrors).length);
    if (Object.keys(validationErrors).length == 0) {
      navigation.navigate("Register2", {
        firstname,
        lastname,
        dateOfBirth: dateOfBirth.toISOString(),
        // setFirstname,
        // setLastname,
        // setDateOfBirth,
      });
    } else {
      console.log("cannot navigate");
    }
  };

  //format ngày được chọn để hiển thị lên UI và kiểm tra độ tuổi của người dùng
  useEffect(() => {
    if (dateOfBirth) {
      setFormatedDateOfBirth(dayjs(dateOfBirth).format("DD/MM/YYYY"));
      const yearsDiff = new Date().getFullYear() - dateOfBirth.getFullYear();
      if (yearsDiff >= ageLimit) {
        let e = validationErrors;
        delete e[dateOfBirth];
        setValidationErrors(e);
      } else {
        setValidationErrors((pre) => ({
          ...pre,
          dateOfBirth: `Bạn chưa đủ ${ageLimit} tuổi`,
        }));
      }
    }
  }, [dateOfBirth]);
  return (
    <AuthContainer>
      <InputText
        iconLeft={"account"}
        setText={setFirstname}
        hasValidationError={validationErrors.firstname}
        placeholder={"Tên"}
        onBlur={() =>
          handleValidateField(
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
          handleValidateField(
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
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <InputText
          iconLeft={"calendar"}
          disabled
          text={formatedDateOfBirth}
          hasValidationError={validationErrors.password}
          placeholder={"Ngày sinh"}
        ></InputText>
      </TouchableOpacity>
      {showDatePicker && (
        <RNDateTimePicker
          maximumDate={new Date()}
          mode="date"
          onChange={(e, date) => {
            if (e.type == "set") {
              setDateOfBirth(date);
            }
            setShowDatePicker(false);
          }}
          value={dateOfBirth}
        ></RNDateTimePicker>
      )}
      {validationErrors.dateOfBirth && (
        <Error variant="error">{validationErrors.dateOfBirth}</Error>
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
