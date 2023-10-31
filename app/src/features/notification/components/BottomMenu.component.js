import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Modal } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { useDeleteNotificationMutation } from "@src/store/slices/api/notificationApiSlice";
import { useEffect } from "react";

const BottomMenu = ({ visible, onClose, notificationId }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [deleteNotification, { error, isSuccess }] =
    useDeleteNotificationMutation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "red",

              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              backgroundColor: theme.colors.text.primary,
            }}
          >
            <View
              style={{
                height: 12,
                width: 100,
                alignSelf: "center",
                borderBottomWidth: 2,
                marginBottom: 12,
                borderColor: theme.colors.bg.primary,
              }}
            ></View>
            <TouchableOpacity
              style={[
                styles.optionContainer,
                {
                  backgroundColor: theme.colors.text.primary,
                  width: "100%",
                },
              ]}
              onPress={() => {
                deleteNotification(notificationId);
                onClose();
              }}
            >
              <Text style={styles.option(theme)}>{t("delete")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BottomMenu;

const styles = StyleSheet.create({
  optionContainer: {
    borderColor: "gray",
    borderTopWidth: 1,
    justifyContent: "center",
    paddingVertical: 8,
    width: "100%",
  },
  option: (theme) => ({
    fontWeight: "500",
    textAlign: "center",
    fontSize: 18,
    color: theme.colors.bg.primary,
  }),
});
