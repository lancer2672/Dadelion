import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import styled from "styled-components/native";
import ReadMore from "@fawazahmed/react-native-read-more";

const PostItemDescription = ({ description }) => {
  return (
    <PostDescriptionContainer numberOfLines={3}>
      <PostDescription>
        {
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lorem non tristique convallis. Integer nec neque ipsum. Fusce consectetur, odio ut venenatis malesuada, velit nunc mattis lectus, nec facilisis risus ligula quis turpis. Cras finibus dolor vel ex iaculis hendrerit. In non metus quis est dignissim porttitor. Suspendisse scelerisque tincidunt ligula, nec finibus mi ultricies sit amet. Duis tincidunt metus quis nisl eleifend luctus. Nulla consequat a neque nec elementum. Curabitur sed eros enim. Proin tincidunt facilisis malesuada. Sed eleifend velit sed volutpat egestas. Fusce tincidunt mauris eu ipsum posuere scelerisque."
        }
      </PostDescription>
    </PostDescriptionContainer>
  );
};

export default memo(PostItemDescription);
const PostDescriptionContainer = styled(ReadMore)`
  margin-left: 8px;
  margin-bottom: 4px;
  margin-top: 4px;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: white;
`;
const PostDescription = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
  color: white;
`;

const styles = StyleSheet.create({});
