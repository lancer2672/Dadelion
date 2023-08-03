import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { Avatar } from "@src/components/Avatar";
import { formatNamesWithAnd } from "@src/utils/textFormatter";
import { useTranslation } from "react-i18next";
import { colors } from "@src/infrastructure/theme/colors";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { Spacer } from "@src/components/spacer/spacer.component";
import { commentCreatedTimeFormater } from "@src/utils/timeFormatter";

const NotificationItem = ({ notification = {} }) => {
  //   const formattedNames = formatNamesWithAnd(names);
  const { t } = useTranslation();
  //get data of user created notification
  const [notificationUser, setNotificationUser] = useState({});
  const { isLoading, isSuccess, data } = useGetUserByIdQuery(
    notification.userId
  );
  useEffect(() => {
    if (isSuccess && data) {
      setNotificationUser(data.user);
    }
  }, [isLoading, data]);
  return (
    <View
      style={{
        padding: 12,
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      <Avatar width={50} height={50} uri={notificationUser.avatar || null} />
      {notification.isAddFriendRequest ? (
        <View>
          <NotificationContent>{t("sentUFriendRequest")}</NotificationContent>
          <View style={{ flexDirection: "row", marginTop: 16 }}>
            <StyledButton2>
              <AcceptText>{t("accept")}</AcceptText>
            </StyledButton2>
            <StyledButton1>
              <DeclineText>{t("decline")}</DeclineText>
            </StyledButton1>
          </View>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginLeft: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <NotificationContent>{`${notificationUser.nickname} ${notification.content}  `}</NotificationContent>
          </View>
          <CreatedAt>
            {commentCreatedTimeFormater(notification.createdAt)}
          </CreatedAt>
        </View>
      )}
    </View>
  );
};
export const NotificationContent = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.black};
`;
export const CreatedAt = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.black};
`;
const StyledButton1 = styled.TouchableOpacity`
  padding-horizontal: 12px;
  margin-horizontal: 12px;
  width: 100px;
  border-radius: 2px;
  border-width: 2px;
  border-color: #9971ee;
  justify-content: center;
  align-items: center;
  height: 36px;
`;
const StyledButton2 = styled.TouchableOpacity`
  padding-horizontal: 12px;
  margin-horizontal: 12px;
  width: 100px;
  border-radius: 2px;
  background-color: #9971ee;
  justify-content: center;
  align-items: center;
  height: 36px;
`;
const AcceptText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: ${(props) => props.theme.colors.white};
`;

const DeclineText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: #9971ee;
`;
export default NotificationItem;
