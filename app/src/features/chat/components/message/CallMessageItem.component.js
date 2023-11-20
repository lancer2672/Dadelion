import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { callingTimeFormatter } from "@src/utils/timeFormatter";

const CallMessageItem = ({ callHistory }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const theme = useTheme();

  const handleRecall = () => {
    navigation.navigate("CallingScreen", {});
  };
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bg.secondary }]}
    >
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: callHistory.duration === 0 ? "tomato" : "gray",
            },
          ]}
        >
          <Feather
            name={
              callHistory.duration === 0 ? "phone-missed" : "phone-incoming"
            }
            size={16}
            color={"white"}
          />
        </View>
        <View>
          <Text style={{ color: theme.colors.text.primary }}>
            {callHistory.duration === 0 ? t("missCall") : t("call")}
          </Text>
          <Text style={{ color: theme.colors.text.primary }}>
            {callHistory.duration !== 0 &&
              callingTimeFormatter(callHistory.duration)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleRecall}
        style={styles.recallBtnContainer}
      >
        <Text style={styles.recallBtnContent}>{t("recall")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CallMessageItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 12,
    minWidth: 200,
    marginTop: 12,
  },
  iconContainer: {
    borderRadius: 1000,
    marginRight: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  recallBtnContainer: {
    borderRadius: 8,
    marginVertical: 4,
    paddingVertical: 6,
    backgroundColor: "gray",
  },
  recallBtnContent: {
    fontWeight: "500",
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
});
