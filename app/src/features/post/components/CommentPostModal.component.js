import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState, memo, useRef, useEffect } from "react";
import styled from "styled-components/native";
import ReadMore from "@fawazahmed/react-native-read-more";
import InputBar from "./PostInputbar.component";
import CommentItemComponent from "./CommentItem.component";
import { useSelector } from "react-redux";
import { postSelector } from "@src/store/selector";

const CommentPostModal = ({ isVisible, onClose, isFocusInput }) => {
  const { selectedPost } = useSelector(postSelector);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Container>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={{ height: "50%" }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                paddingHorizontal: 12,
              }}
            >
              <CommentContainer>
                {selectedPost.comments.map((comment) => {
                  return (
                    <CommentItemComponent
                      key={`${selectedPost._id + comment._id}`}
                      comment={comment}
                    ></CommentItemComponent>
                  );
                })}
              </CommentContainer>
            </ScrollView>
            <InputBar autoFocus={isFocusInput} postId={selectedPost._id} />
          </View>
        </TouchableWithoutFeedback>
      </Container>
    </Modal>
  );
};

const Container = styled(View)`
  justify-content: flex-end;
  background-color: black;
  flex: 1;
`;

const CommentContainer = styled(View)`
  flex: 1;
  background-color: gray;
`;

export default memo(CommentPostModal);

const styles = StyleSheet.create({});
