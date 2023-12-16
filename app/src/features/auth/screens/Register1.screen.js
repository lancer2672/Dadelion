import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { Spacer } from "@src/components/spacer/spacer.component";
import { ageLimit, nameSchema } from "@src/utils/validationSchemas";
import { handleValidateField } from "@src/utils/validator";
import AuthContainer from "../components/AuthContainer.component";
import InputText from "../components/TextInput.component";
import {
  AuthButton,
  AuthButtonContent,
  Error,
} from "../components/authentication.style";

const dayjs = require("dayjs");
const RegisterScreen1 = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
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
    console.log(validationErrors);
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
      if (dateOfBirth == null) {
        setFormatedDateOfBirth("Ngày sinh");
      } else {
        setFormatedDateOfBirth(dayjs(dateOfBirth).format("DD/MM/YYYY"));
        const yearsDiff = new Date().getFullYear() - dateOfBirth.getFullYear();
        console.log("yearDiff", yearsDiff);
        console.log("validationErros", validationErrors);
        if (yearsDiff >= ageLimit) {
          let e = validationErrors;
          delete e["dateOfBirth"];
          setValidationErrors(e);
        } else {
          setValidationErrors((pre) => ({
            ...pre,
            dateOfBirth: `Bạn chưa đủ ${ageLimit} tuổi`,
          }));
        }
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
          value={dateOfBirth == null ? new Date() : dateOfBirth}
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
