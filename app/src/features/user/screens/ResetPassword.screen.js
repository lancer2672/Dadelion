import { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useGetFriendRequestsQuery } from "@src/store/slices/api/friendRequestApiSlice";
import { useTheme } from "styled-components";
import { useGetNotificationsQuery } from "@src/store/slices/api/notificationApiSlice";
import {
  handleValidateField,
  handleValidateObject,
} from "@src/utils/validator";
import { accountSchema } from "@src/utils/validationSchemas";
import { Error } from "@src/features/auth/components/authentication.style";
import { useNavigation } from "@react-navigation/native";
import { useChangePasswordMutation } from "@src/store/slices/api/authApi";
import { setIsLoading } from "@src/store/slices/appSlice";
import { useDispatch } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { useLayoutEffect } from "react";

const ResetPassword = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [changePassword, { isSuccess, isLoading, error }] =
    useChangePasswordMutation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [firstMount, setFirstMount] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  console.log("validationErrors", validationErrors);
  const resetUserPassword = () => {
    if (Object.keys(validationErrors).length == 0) {
      changePassword({ newPassword, currentPassword });
      resetFormInput();
    }
  };
  const resetFormInput = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };
  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [isLoading]);
  useEffect(() => {
    if (!firstMount && !isLoading) {
      showMessage({
        message: t(isSuccess ? "updateSucceeded" : "updateFailed"),
        type: isSuccess ? "success" : "danger",
      });
    }
    setFirstMount(false);
  }, [isLoading, isSuccess]);

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
            color={theme.colors.chat.text}
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
    backgroundColor: theme.colors.chat.bg.primary,
  }),
  header: (theme) => ({
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.chat.text,
  }),
  touchable: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headerText: (theme) => ({
    fontWeight: "bold",
    fontSize: 20,
    color: theme.colors.chat.text,
  }),
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  label: (theme) => ({
    color: theme.colors.chat.text,
    fontSize: 18,
    opacity: 0.8,
    marginTop: 8,
    marginBottom: 12,
  }),
  input: (theme) => ({
    color: theme.colors.chat.text,
    borderBottomWidth: 1,
    paddingVertical: 2,
    fontSize: 18,
    borderBottomColor: theme.colors.chat.text,
  }),
  saveBtnContent: (theme) => ({
    textAlign: "center",
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 500,
    color: theme.colors.chat.text,
  }),
  saveBtn: {
    backgroundColor: "gray",
    padding: 8,
    borderRadius: 4,
    marginVertical: 24,
  },
});
