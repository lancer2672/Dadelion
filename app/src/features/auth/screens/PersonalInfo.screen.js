import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { Spacer } from "@src/components/spacer/spacer.component";
import { personalInfo } from "@src/utils/validationSchemas";
import AuthContainer from "../components/AuthContainer.component";
import InputText from "../components/TextInput.component";
import {
  AuthButton,
  AuthButtonContent,
  Error,
} from "../components/authentication.style";
import { Formik } from "formik";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import authApi from "@src/api/auth";
import userApi from "@src/api/user";
import { dateOfBirthFormat } from "@src/utils/timeFormatter";
import AppDatePicker from "@src/components/AppDatePicker";
import withLoading from "@src/utils/withLoading";

const dayjs = require("dayjs");
const PersonalInfo = ({}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { email } = useRoute().params;

  const navigation = useNavigation();
  const initialValues = {
    firstname: "",
    lastname: "",
    dateOfBirth: "",
  };
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const handleFormSubmit = (values) => {
    console.log("handleFormSubmit", values);
    withLoading(
      dispatch,
      async () => {
        await userApi.createUser({ ...values, email });
        navigation.navigate("Login");
      },
      (error) => {
        console.log("error", error);
        setError("Đăng ký không thành công");
      }
    );
  };

  //format ngày được chọn để hiển thị lên UI và kiểm tra độ tuổi của người dùng
  //   useEffect(() => {
  //     if (dateOfBirth) {
  //       if (dateOfBirth == null) {
  //         setFormatedDateOfBirth("Ngày sinh");
  //       } else {
  //         setFormatedDateOfBirth(dayjs(dateOfBirth).format("DD/MM/YYYY"));
  //       }
  //     }
  //   }, [dateOfBirth]);
  return (
    <AuthContainer>
      <Formik
        validationSchema={personalInfo}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,

          touched,
          handleChange,

          handleSubmit,
        }) => (
          <View
            style={{
              flex: 1,
              marginTop: 20,
            }}
          >
            <InputText
              iconLeft={"account"}
              setText={(text) => {
                handleChange("firstname")(text);
              }}
              hasValidationError={!!errors.firstname && !!touched.firstname}
              text={values.firstname}
              error={errors.firstname}
              placeholder={"Tên"}
            ></InputText>

            <InputText
              iconLeft={"account"}
              setText={(text) => {
                handleChange("lastname")(text);
              }}
              hasValidationError={!!errors.lastname && !!touched.lastname}
              text={values.lastname}
              error={errors.lastname}
              placeholder={"Họ"}
            ></InputText>

            <TouchableOpacity
              onPress={() => {
                setShowDatePicker(true);
              }}
            >
              <InputText
                iconLeft={"calendar"}
                disabled
                text={
                  values.dateOfBirth && dateOfBirthFormat(values.dateOfBirth)
                }
                placeholder={"Ngày sinh"}
                hasValidationError={
                  !!errors.dateOfBirth && !!touched.dateOfBirth
                }
                error={errors.dateOfBirth}
              ></InputText>
            </TouchableOpacity>
            <AppDatePicker
              open={showDatePicker}
              date={new Date()}
              onConfirm={(date) => {
                console.log("date", date);
                handleChange("dateOfBirth")(date.getTime().toString());
                setShowDatePicker(false);
              }}
              onCancel={() => setShowDatePicker(false)}
            ></AppDatePicker>
            {/* {showDatePicker && (
              <RNDateTimePicker
                maximumDate={new Date()}
                mode="date"
                onChange={(e, date) => {
                  if (e.type == "set") {
                    console.log("selectedDate", date);
                    console.log("selectedDate", date.getTime());
                    handleChange("firstName")("hi");
                  }
                  setShowDatePicker(() => false);
                }}
                value={
                  //   values.dateOfBirth ? new Date(values.dateOfBirth) : new Date()
                  new Date()
                }
              ></RNDateTimePicker>
            )} */}

            {error && <Error variant="error">{error}</Error>}

            <Spacer variant="bottom" size="huge"></Spacer>

            <View>
              <AuthButton onPress={handleSubmit}>
                <AuthButtonContent>Tiếp tục</AuthButtonContent>
              </AuthButton>
              <Spacer variant="top" size="large"></Spacer>
            </View>
          </View>
        )}
      </Formik>
    </AuthContainer>
  );
};

export default PersonalInfo;
