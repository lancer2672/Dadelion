import { Text, View } from "react-native";
import React, { memo } from "react";
import { Checkbox } from "react-native-paper";
import styled from "styled-components/native";

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const SavePasswordText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;
const RememberPassword = ({ savePassword, setSavePassword }) => {
  console.log("checkbox render");

  return (
    <Container>
      <Checkbox
        status={savePassword ? "checked" : "unchecked"}
        onPress={() => setSavePassword(!savePassword)}
      />
      <SavePasswordText>Lưu mật khẩu</SavePasswordText>
    </Container>
  );
};

export default memo(RememberPassword);
