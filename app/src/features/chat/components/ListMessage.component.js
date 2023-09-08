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
import { userSelector } from "@src/store/selector";
import { useLoadChatRoomMessagesQuery } from "@src/store/slices/api/chatApiSlice";
import ImageDialog from "@src/components/dialogs/ImageDialog.component";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const ListUserMessages = ({ channelId, chatFriend }) => {
  const { user } = useSelector(userSelector);

  const [visibleMessages, setVisibleMessages] = useState(20);
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
  const { isLoading, error, isSuccess, data } =
    useLoadChatRoomMessagesQuery(channelId);
  useEffect(() => {
    if (isSuccess) {
      const groupedByUserId = [];
      let obj = { userId: null, messages: [] };

      const createMessage = (msg) => ({
        _id: msg._id,
        message: msg.message,
        imageUrl: msg.imageUrl,
        createdAt: msg.createdAt,
      });

      data.forEach((msg) => {
        if (obj.userId === null) {
          obj.userId = msg.userId;
          obj.messages.unshift(createMessage(msg));
        } else if (msg.userId === obj.userId) {
          obj.messages.unshift(createMessage(msg));
        } else {
          groupedByUserId.push(obj);
          obj = { userId: msg.userId, messages: [createMessage(msg)] };
        }
      });

      // Add the last item
      if (obj.userId != null) {
        groupedByUserId.push(obj);
      }
      setListMessage(groupedByUserId);
    }

    if (error) {
      console.log("error", error);
    }
  }, [isLoading, data]);

  const handleLoadMore = () => {
    setVisibleMessages(visibleMessages + 10);
  };
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
          data={listMessage.slice(0, visibleMessages)}
          ListEmptyComponent={() => <></>}
          onEndReached={handleLoadMore}
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
