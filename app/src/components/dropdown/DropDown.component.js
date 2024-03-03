import React, { useEffect, useImperativeHandle, useState } from "react";
import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Text } from "react-native";
import { theme } from "@src/infrastructure/theme";
import textStyle from "../typography/text.style";
import { expandAnimation } from "@src/animation/jndex";
import { TouchableRipple } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

const DEFAULT_ITEM_HEIGHT = 44;
const MAX_ITEM_RENDER = 4;

// item : {label, value}
const DropDownComponent = React.forwardRef((props, ref) => {
  const {
    isOpen,
    onOpen,
    selectedItem,
    placeholder = "Nhấn để chọn",
    style: parentStyle,
    values,
    maxItemRender = MAX_ITEM_RENDER,
    onSelect,
    label,
  } = props;

  const [isContentVisible, setIsContentVisible] = useState(isOpen);
  const handleItemClick = (item) => {
    onSelect(item);
    LayoutAnimation.configureNext(expandAnimation);
    setIsContentVisible(false);
  };

  const toggleContentModalVisible = () => {
    LayoutAnimation.configureNext(expandAnimation);
    setIsContentVisible(!isContentVisible);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          setIsContentVisible(true);
        },
        blur() {
          setIsContentVisible(false);
        },
      };
    },
    []
  );
  useEffect(() => {
    if (isOpen) {
      setIsContentVisible(isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    if (onOpen && isContentVisible === true) {
      onOpen();
    }
  }, [isContentVisible]);
  return (
    <View style={[{ marginBottom: 20 }, parentStyle]}>
      {label && (
        <Text style={[textStyle.h[2], { marginBottom: 6, fontWeight: "bold" }]}>
          {label}
        </Text>
      )}
      <Pressable
        style={{
          backgroundColor: "red",
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 12,
          backgroundColor: "#596980",
          flexDirection: "row",
        }}
        onPress={() => {
          toggleContentModalVisible();
        }}
      >
        <Text
          style={[textStyle.h[4], { color: theme.colors.white[100], flex: 1 }]}
        >
          {selectedItem?.label ?? placeholder}
        </Text>
        <Entypo name="chevron-down" size={24} color={theme.colors.white[100]} />
      </Pressable>
      {isContentVisible && values.length !== 0 && (
        <ContentModal
          values={values}
          maxItemRender={maxItemRender}
          isContentVisible={isContentVisible}
          onItemClick={handleItemClick}
        ></ContentModal>
      )}
    </View>
  );
});

export default DropDownComponent;

const ContentModal = (props) => {
  const { values, onItemClick, maxItemRender } = props;

  const maxContentHeight =
    DEFAULT_ITEM_HEIGHT * maxItemRender + maxItemRender - 1;

  const calculatContentHeight = () => {
    return values.length < maxItemRender
      ? DEFAULT_ITEM_HEIGHT * values.length + values.length - 1
      : maxContentHeight;
  };
  const renderItem = ({ item, index }) => (
    <DropDownItem
      key={index}
      item={item}
      index={index}
      onItemClick={onItemClick}
    />
  );

  return (
    <View
      style={[
        styles.dropdown,
        //calculate content height limit   (+ maxItemRender = total border height)
        { height: calculatContentHeight() },
      ]}
    >
      <FlashList
        data={values}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        estimatedItemSize={DEFAULT_ITEM_HEIGHT}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const DropDownItem = (props) => {
  const { item, index, onItemClick } = props;
  return (
    <TouchableRipple
      onPress={() => {
        onItemClick(item);
      }}
    >
      {/* {index != 0 && (
        <Divider style={{}} color={PALETTE_COLOR.white} thickness={1}></Divider>
      )} */}
      <Text numberOfLines={1} style={[textStyle.content.medium, styles.item]}>
        {item.label}
      </Text>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#596980",
    borderRadius: 12,
    width: "100%",
    marginTop: 4,
  },
  item: {
    paddingHorizontal: 12,
    height: DEFAULT_ITEM_HEIGHT,
    lineHeight: DEFAULT_ITEM_HEIGHT,
    color: theme.colors.white[100],
  },
});
