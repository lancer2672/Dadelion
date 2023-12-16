import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
const BottomModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              padding: 20,
            }}
          >
            <Text>user.name</Text>
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({});
