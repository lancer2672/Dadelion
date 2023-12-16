import { Avatar } from "@src/components/Avatar";
import { Spacer } from "@src/components/spacer/spacer.component";
import { userSelector } from "@src/store/selector";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
const Friend = ({ navigation, friend }) => {
  const { user } = useSelector(userSelector);
  console.log("friend", friend);
  const navigateToFriendProfile = () => {
    if (user._id !== friend.userId) {
      navigation.navigate("Guest", { guestId: friend._id });
    } else {
      navigation.navigate("User");
    }
  };
  return (
    <Container onPress={navigateToFriendProfile}>
      <Avatar source={{ uri: friend.avatar }}></Avatar>
      <Spacer position={"left"} size={"medium"}></Spacer>

      <View>
        <Name>{friend.nickname}</Name>
        <Email>{friend.email}</Email>
      </View>
    </Container>
  );
};
const Container = styled(TouchableOpacity)`
  flex-direction: row;
  padding-left: 12px;
  margin-vertical: 4px;
  padding-vertical: 12px;
  elevation: 3;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;
const Name = styled(Text)`
  margin-right: 12px;
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.text.primary};
`;
const Email = styled(Text)`
  flex: 1;
  font-size: ${(props) => props.theme.fontSizes.medium};
  opacity: 0.7;
  color: ${(props) => props.theme.colors.text.primary};
`;
export default Friend;
