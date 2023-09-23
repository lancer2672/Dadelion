import { Image } from "react-native";
import styled from "styled-components/native";

export const Avatar = styled(Image).attrs((props) => {
  if (props.uri) {
    return {
      source: {
        uri: props.uri,
      },
    };
  }
})`
  border-radius: 1000px;
  width: ${({ width }) => width || "50px"};
  height: ${({ height }) => height || "50px"};
`;

Avatar.defaultProps = {
  // source: require("@assets/imgs/DefaultAvatar.png"),
  source: require("../../assets/imgs/DefaultAvatar.png"),
};
