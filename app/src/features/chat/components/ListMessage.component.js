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

const ListUserMessages = ({ channelId }) => {
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
      setListMessage(data);
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
          initialNumToRender={20}
          data={listMessage.slice(0, visibleMessages)}
          ListEmptyComponent={() => null}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => {
            const { userId: memberId, message, imageUrl } = item;
            let isMyMessage = memberId == user._id ? true : false;
            return (
              <UserMessage
                imageUrl={imageUrl}
                isMyMessage={isMyMessage}
                message={message}
                handleShowDialog={handlePresentModalPress}
              />
            );
          }}
          keyExtractor={(item) => {
            return `$!@#${item._id}`;
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
