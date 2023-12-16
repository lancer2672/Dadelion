import { AntDesign, Feather } from "@expo/vector-icons";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import Swiper from "react-native-swiper";

import { downloadMediaFile } from "@src/utils/downloads";

const OpenImageModal = ({
  visible,
  onClose,
  selectedIndex,
  setSelectedIndex,
  selectedImageList = [],
}) => {
  const { t } = useTranslation();
  const swiperRef = useRef(null);
  const flatlistRef = useRef(null);

  const handlePressLeft = () => {
    setSelectedIndex(
      selectedIndex - 1 < 0 ? selectedImageList.length - 1 : selectedIndex - 1
    );
  };
  const handlePressRight = () => {
    setSelectedIndex(
      selectedIndex + 1 >= selectedImageList.length ? 0 : selectedIndex + 1
    );
  };
  const handleDownloadImage = (fileUrl) => {
    downloadMediaFile(fileUrl)
      .then((uri) => {
        console.log("download success");

        showMessage({
          message: t("success"),
          type: "success",
          duration: 2000,
        });
      })
      .catch((error) => {
        console.log("download error", error);
        showMessage({
          message: t("failed"),
          type: "alert",
          duration: 2000,
        });
      });
  };
  const onImageIndexChange = (i) => {
    setSelectedIndex(() => i);
  };
  // useEffect(() => {
  //   flatlistRef.current?.scrollToIndex({
  //     index: selectedIndex,
  //     animated: false,
  //     viewPosition: 0.5,
  //   });
  // }, [selectedIndex]);
  console.log(selectedIndex);
  return (
    <Modal animationType="fade" onRequestClose={onClose} visible={visible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={{ padding: 12, alignSelf: "flex-end" }}
          >
            <AntDesign name="close" size={28} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              handleDownloadImage(selectedImageList[selectedIndex])
            }
            style={{ padding: 12, alignSelf: "flex-end" }}
          >
            <Feather name="download" size={28} color="gray" />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity onPress={handlePressLeft} style={{ padding: 24 }}>
          <Entypo name="chevron-left" size={40} color="gray" />
        </TouchableOpacity> */}

        <Swiper
          loop={false}
          index={selectedIndex}
          ref={swiperRef}
          onIndexChanged={onImageIndexChange}
          showsPagination={false}
          showsButtons={false}
        >
          {selectedImageList.map((image, index) => (
            <View key={index} style={{ flex: 1 }}>
              <Image style={{ flex: 1 }} source={{ uri: image }} />
            </View>
          ))}
        </Swiper>

        {selectedImageList.length > 1 && (
          <View style={styles.images}>
            <FlatList
              data={selectedImageList}
              horizontal
              // ref={flatlistRef}
              // onScrollToIndexFailed={(info) => {
              //   const wait = new Promise((resolve) => setTimeout(resolve, 500));
              //   wait.then(() => {
              //     flatlistRef.current?.scrollToIndex({
              //       index: info.index,
              //       animated: true,
              //     });
              //   });
              // }}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    style={{ opacity: selectedIndex === index ? 1 : 0.5 }}
                    onPress={() => {
                      setSelectedIndex(() => index);
                      console.log("click", swiperRef.current);
                      swiperRef.current.scrollBy(index, true);
                    }}
                  >
                    <View
                      style={[
                        styles.subImageWraper,
                        {
                          backgroundColor:
                            selectedIndex === index ? "gray" : null,
                        },
                      ]}
                    >
                      <Image
                        key={`list-image-item` + index}
                        style={styles.subImage}
                        resizeMode="cover"
                        source={{ uri: item }}
                        title={item.title}
                      />
                    </View>
                  </Pressable>
                );
              }}
              keyExtractor={(item) => item}
            />
          </View>
        )}
        {/* <TouchableOpacity onPress={handlePressRight} style={{ padding: 24 }}>
          <Entypo name="chevron-right" size={40} color="gray" />
        </TouchableOpacity> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "90%",
    borderRadius: 4,
    margin: 12,
    backgroundColor: "gray",
  },
  subImage: {
    width: 80,
    height: 72,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  subImageWraper: {
    borderRadius: 4,

    paddingVertical: 8,
  },
  images: {
    width: "100%",

    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default OpenImageModal;
