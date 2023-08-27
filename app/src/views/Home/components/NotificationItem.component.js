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
    <Container>
      <Avatar width={50} height={50} uri={notificationUser.avatar || null} />
      <ContentContainer>
        <NotificationContent>{`${notificationUser.nickname} ${notification.content}  `}</NotificationContent>
        <CreatedAt>
          {commentCreatedTimeFormater(notification.createdAt)}
        </CreatedAt>
      </ContentContainer>
    </Container>
  );
};

const NotificationContent = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.black};
`;

const CreatedAt = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.black};
  opacity: 0.5;
`;
const Container = styled.View`
  padding: 12px;
  flex-direction: row;
  justify-content: flex-start;
`;
const ContentContainer = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export default NotificationItem;
