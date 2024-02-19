import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";

import { Spacer } from "@src/components/spacer/spacer.component";
import { ageLimit, credentialSchema } from "@src/utils/validationSchemas";
import { handleValidateField } from "@src/utils/validator";
import AuthContainer from "../components/AuthContainer.component";
import InputText from "../components/TextInput.component";
import {
  AuthButton,
  AuthButtonContent,
  Error,
} from "../components/authentication.style";
import { Formik } from "formik";
import PagerView from "react-native-pager-view";
import { useNavigation } from "@react-navigation/native";
import withLoading from "@src/utils/withLoading";
import { useDispatch } from "react-redux";
import authApi from "@src/api/auth";
const dayjs = require("dayjs");

const testID = "register";
const RegisterScreen = ({}) => {
  const navigation = useNavigation();
  const initialValues = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const handleFormSubmit = (values) => {
    const { email, password } = values;
    console.log("handleRegister", { email, password });
    withLoading(
      dispatch,
      async () => {
        await authApi.sendVerificationEmail({ email, isRegister: true });
        navigation.navigate("Verification", { email, password });
      },
      (error) => {
        console.log("error", error);
        setError("Đăng ký không thành công");
      }
    );
  };

  return (
    <AuthContainer testID={testID}>
      <Formik
        validationSchema={credentialSchema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,

          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <View
            style={{
              flex: 1,
              marginTop: 20,
            }}
          >
            <InputText
              iconLeft={"email"}
              setText={(text) => {
                handleChange("email")(text);
              }}
              // text={values.email}
              placeholder={"Email"}
              hasValidationError={!!errors.email && !!touched.email}
              text={values.email}
              error={errors.email}
            ></InputText>
            <InputText
              iconLeft={"lock"}
              text={values.password}
              setText={(text) => {
                handleChange("password")(text);
              }}
              passwordType
              hasValidationError={!!errors.password && !!touched.password}
              placeholder={"Mật khẩu"}
              error={errors.password}
            ></InputText>

            <View style={{ padding: 16, alignItems: "center" }}>
              {error && <Error variant="error">{error}</Error>}
              <Spacer variant="bottom" size="small"></Spacer>

              <AuthButton onPress={handleSubmit}>
                <AuthButtonContent>Tiếp tục</AuthButtonContent>
              </AuthButton>
            </View>
          </View>
        )}
      </Formik>
      <Spacer variant="bottom" size="huge"></Spacer>
    </AuthContainer>
  );
};

const RegisterForm1 = ({
  values,
  touched,
  errors,
  onTextChange,
  onPageChange,
}) => {
  const handleNext = () => {
    console.log("click", errors, values);
  };
  return (
    <View style={{ flex: 1 }}>
      <InputText
        iconLeft={"email"}
        setText={async (text) => {
          await onTextChange("email")(text);
        }}
        // text={values.email}
        hasValidationError={!!errors.email}
        placeholder={"Email"}
      ></InputText>
      <InputText
        iconLeft={"lock"}
        setText={(text) => {
          onTextChange("password", text);
        }}
        passwordType
        hasValidationError={!!errors.password}
        placeholder={"Mật khẩu"}
      ></InputText>

      <View style={{ padding: 16 }}>
        <AuthButton onPress={handleNext}>
          <AuthButtonContent>Tiếp tục</AuthButtonContent>
        </AuthButton>
      </View>
    </View>
  );
};
const RegisterForm2 = ({ values, errors, onTextChange, onsubmit }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  useEffect(() => {
    if (values.dateOfBirth) {
      if (values.dateOfBirth == null) {
        onTextChange("dateOfBirth", "Ngày sinh");
      } else {
        onTextChange(
          "dateOfBirth",
          dayjs(values.dateOfBirth).format("DD/MM/YYYY")
        );
        const yearsDiff =
          new Date().getFullYear() - values.dateOfBirth.getFullYear();
        console.log("yearDiff", yearsDiff);
        console.log("validationErrors", errors);
        if (yearsDiff >= ageLimit) {
          let e = errors;
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
  }, [values.dateOfBirth]);

  return (
    <View style={{ flex: 1 }}>
      <InputText
        iconLeft={"account"}
        setText={(text) => {
          onTextChange("firstname", text);
        }}
        text={values.firstname}
        hasValidationError={errors.firstname}
        placeholder={"Tên"}
      ></InputText>

      <InputText
        iconLeft={"account"}
        setText={(text) => {
          onTextChange("lastname", text);
        }}
        text={values.lastname}
        hasValidationError={errors.lastname}
        placeholder={"Họ"}
      ></InputText>

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <InputText
          iconLeft={"calendar"}
          disabled
          text={values.dateOfBirth}
          hasValidationError={errors.dateOfBirth}
          placeholder={"Ngày sinh"}
        ></InputText>
      </TouchableOpacity>
      {showDatePicker && (
        <RNDateTimePicker
          maximumDate={new Date()}
          mode="date"
          onChange={(e, date) => {
            if (e.type == "set") {
              console.log("date", date);
              onTextChange("dateOfBirth", date);
            }
            setShowDatePicker(false);
          }}
          value={values.dateOfBirth == null ? new Date() : values.dateOfBirth}
        ></RNDateTimePicker>
      )}

      <AuthButton onPress={onsubmit}>
        <AuthButtonContent>Tiếp tục</AuthButtonContent>
      </AuthButton>
    </View>
  );
};
export default RegisterScreen;
