import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
  View,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import UserMessage from "./Message.component";
import { useSelector } from "react-redux";
import { chatSelector, userSelector } from "@src/store/selector";
import { useLoadChatRoomMessagesQuery } from "@src/store/slices/api/chatApiSlice";
import ImageDialog from "@src/components/dialogs/ImageDialog.component";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const ListUserMessages = ({ chatFriend }) => {
  const { user } = useSelector(userSelector);
  const { selectedChannel } = useSelector(chatSelector);
  console.log("selectedChannel", selectedChannel);
  // const [visibleMessages, setVisibleMessages] = useState(20);
  const [listMessage, setListMessage] = useState([]);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "40%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleHideModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const { isLoading, error, isSuccess, data } = useLoadChatRoomMessagesQuery(
    selectedChannel._id
  );
  useEffect(() => {
    if (isSuccess) {
      const createMessage = (msg) => ({
        _id: msg._id,
        message: msg.message,
        imageUrls: msg.imageUrls,
        createdAt: msg.createdAt,
        callHistory: msg.callHistory,
      });

      const groupedByUserId = data.reduce((acc, msg) => {
        const lastGroup = acc[acc.length - 1];
        const newMessage = createMessage(msg);
        if (lastGroup) {
          const lastMessage = lastGroup.messages[0];
          const timeDifference =
            new Date(lastMessage.createdAt) - new Date(newMessage.createdAt);

          if (timeDifference > 30 * 60 * 1000) {
            newMessage.timeMarker = true;
            lastMessage.timeMarker = true;
          }
        }
        if (!lastGroup || lastGroup.userId !== msg.userId) {
          acc.push({ userId: msg.userId, messages: [newMessage] });
        } else {
          lastGroup.messages.unshift(newMessage);
        }

        return acc;
      }, []);

      setListMessage(groupedByUserId);
    }

    if (error) {
      console.log("error", error);
    }
  }, [isLoading, data]);
  console.log("grouped msg", listMessage);
  return (
    <>
      <Pressable style={{ flex: 1 }} onPress={handleHideModal}>
        <FlatList
          style={{
            flex: 1,
            paddingBottom: 8,
          }}
          inverted={true}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
          data={listMessage}
          ListEmptyComponent={() => <></>}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => {
            const { userId: memberId, messages } = item;
            let isMyMessage = memberId == user._id ? true : false;
            return (
              <UserMessage
                isMyMessage={isMyMessage}
                chatFriend={chatFriend}
                messages={messages}
                handleShowDialog={handlePresentModalPress}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return `#!${item.userId} + ${index}`;
          }}
        ></FlatList>
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheetModal>
    </>
  );
};

export default ListUserMessages;

const styles = StyleSheet.create({});
