import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";

import { Avatar } from "@src/components/Avatar";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { commentCreatedTimeFormater } from "@src/utils/timeFormatter";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { responseFriendRequest } from "@src/store/slices/chatSlice";

const FriendRequestItem = ({ friendRequest = {} }) => {
  const [sender, setSender] = useState({});
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, data } = useGetUserByIdQuery(
    friendRequest.sender
  );
  useEffect(() => {
    if (isSuccess && data) {
      setSender(data.user);
    }
  }, [isLoading, data]);
  const viewProfile = () => {};
  const response = (responseValue) => {
    if (responseValue != "accept" || responseValue != "decline") {
      dispatch(
        responseFriendRequest({
          requestId: friendRequest._id,
          responseValue,
        })
      );
    }
  };
  return (
    <Container>
      <TouchableOpacity onPress={viewProfile}>
        <Avatar width={50} height={50} uri={sender.avatar || null} />
      </TouchableOpacity>
      <ContentContainer>
        <NotificationContent>{`${sender.nickname} ${t(
          "sentUFriendRequest"
        )}`}</NotificationContent>
        <ButtonsContainer>
          <StyledButton2
            onPress={() => {
              response("accept");
            }}
          >
            <AcceptText>{t("accept")}</AcceptText>
          </StyledButton2>
          <StyledButton1
            onPress={() => {
              response("decline");
            }}
          >
            <DeclineText>{t("decline")}</DeclineText>
          </StyledButton1>
        </ButtonsContainer>
      </ContentContainer>
      <CreatedAt>
        {commentCreatedTimeFormater(friendRequest.createdAt)}
      </CreatedAt>
    </Container>
  );
};

const Container = styled.View`
  padding: 12px;
  flex-direction: row;
  justify-content: flex-start;
`;
const NotificationContent = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.black};
`;
const CreatedAt = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.black};
  opacity: 0.5;
`;
const ContentContainer = styled.View`
  flex: 1;
  margin-left: 12px;
`;
const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
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
export default FriendRequestItem;
