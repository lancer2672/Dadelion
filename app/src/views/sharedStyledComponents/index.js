import styled from "styled-components/native";

export const StyledButton1 = styled.TouchableOpacity`
  padding-horizontal: 20px;
  margin-horizontal: 12px;
  width: 120px;
  border-radius: 2px;
  border-width: 2px;
  border-color: #9971ee;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

export const StyledButton2 = styled.TouchableOpacity`
  padding-horizontal: 20px;
  margin-horizontal: 12px;
  width: 120px;
  border-radius: 2px;
  background-color: #9971ee;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

export const UserDescription = styled.View`
  margin-bottom: 29px;
  align-items: center;
`;

export const Name = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: bold;
`;

export const HeaderContent = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 24px;
`;

export const HeaderContainer = styled.View`
  height: 360px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  width: 100%;
  background-color: #9971ee;
  elevation: 5;
`;

export const BottomHeader = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const ItemValue = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: bold;
  color: ${(props) => props.theme.colors.white};
`;

export const ItemLabel = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.white};
`;

export const ItemContainer = styled.View`
  align-items: center;
  margin-horizontal: 12px;
`;
