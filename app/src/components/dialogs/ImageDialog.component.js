import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ImageDialog = ({ ref }) => {
  const { dismiss } = useBottomSheetModal();
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <BottomSheetModal
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      ref={ref}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Đây là nội dung của Bottom Dialog</Text>
        <TouchableOpacity onPress={dismiss}>
          <Text style={styles.closeButton}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
  },
  closeButton: {
    fontSize: 16,
    color: "blue",
  },
});

export default ImageDialog;
