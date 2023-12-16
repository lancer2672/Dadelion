import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import authApi from "@src/api/auth";
import { Error } from "@src/features/auth/components/authentication.style";
import { accountSchema } from "@src/utils/validationSchemas";
import {
  handleValidateField,
  handleValidateObject,
} from "@src/utils/validator";
import withLoading from "@src/utils/withLoading";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { useTheme } from "styled-components";

const ResetPassword = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  console.log("validationErrors", validationErrors);
  const resetUserPassword = async () => {
    if (Object.keys(validationErrors).length == 0) {
      withLoading(
        dispatch,
        async () => {
          await authApi.changePassword({ newPassword, currentPassword });
          resetFormInput();
          showMessage({
            message: t("updateSucceeded"),
            type: "success",
          });
        },
        (error) => {
          showMessage({
            message: t("updateFailed"),
            type: "danger",
          });
        }
      );
    }
  };
  const resetFormInput = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <View style={styles.container(theme)}>
      <View style={styles.header(theme)}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.touchable}
        >
          <AntDesign
            name="arrowleft"
            size={24}
            color={theme.colors.text.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerText(theme)}>{t("resetPassword")}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label(theme)}>{t("currentPassword")}</Text>
        <TextInput
          secureTextEntry
          style={styles.input(theme)}
          onChangeText={setCurrentPassword}
          value={currentPassword}
          onBlur={() =>
            handleValidateField(
              accountSchema,
              "password",
              currentPassword,
              validationErrors,
              setValidationErrors
            )
          }
        />
        {validationErrors.password && (
          <Error variant="error">{validationErrors.password}</Error>
        )}

        <Text style={styles.label(theme)}>{t("newPassword")}</Text>
        <TextInput
          secureTextEntry
          style={styles.input(theme)}
          onChangeText={setNewPassword}
          onBlur={() =>
            handleValidateField(
              accountSchema,
              "newPassword",
              newPassword,
              validationErrors,
              setValidationErrors
            )
          }
          value={newPassword}
        />
        {validationErrors.newPassword && (
          <Error variant="error">{validationErrors.newPassword}</Error>
        )}
        <Text style={styles.label(theme)}>{t("confirmNewPassword")}</Text>
        <TextInput
          secureTextEntry
          style={styles.input(theme)}
          onChangeText={setConfirmNewPassword}
          onBlur={() =>
            handleValidateObject(
              accountSchema,
              {
                newPassword,
                confirmNewPassword,
              },
              ["confirmNewPassword"],
              validationErrors,
              setValidationErrors
            )
          }
          value={confirmNewPassword}
        />
        {validationErrors.confirmNewPassword && (
          <Error variant="error">{validationErrors.confirmNewPassword}</Error>
        )}
        <TouchableOpacity onPress={resetUserPassword} style={styles.saveBtn}>
          <Text style={styles.saveBtnContent(theme)}>{t("save")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  }),
  header: (theme) => ({
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.text.primary,
  }),
  touchable: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headerText: (theme) => ({
    fontWeight: "bold",
    fontSize: 20,
    color: theme.colors.text.primary,
  }),
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  label: (theme) => ({
    color: theme.colors.text.primary,
    fontSize: 18,
    opacity: 0.8,
    marginTop: 8,
    marginBottom: 12,
  }),
  input: (theme) => ({
    color: theme.colors.text.primary,
    borderBottomWidth: 1,
    paddingVertical: 2,
    fontSize: 18,
    borderBottomColor: theme.colors.text.primary,
  }),
  saveBtnContent: (theme) => ({
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: theme.colors.text.primary,
  }),
  saveBtn: {
    backgroundColor: "gray",
    padding: 8,
    borderRadius: 4,
    marginVertical: 24,
  },
});
