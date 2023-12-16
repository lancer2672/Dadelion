import { useTranslation } from "react-i18next";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LanguageSelection = ({
  visible,
  onClose,
  currentLanguage,
  setAppLanguage,
}) => {
  const { t } = useTranslation();
  const handleSelectGender = (value) => {
    setAppLanguage(value);
    onClose();
  };
  const languageList = ["en", "vi"];
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.centeredView} onPress={onClose}>
        <View style={styles.modalView}>
          <FlatList
            data={languageList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectGender(item)}
                style={[
                  styles.touchableOpacity,
                  {
                    backgroundColor: currentLanguage == item ? "gray" : null,
                    borderColor: currentLanguage == item ? "gray" : null,
                  },
                ]}
              >
                <Text style={styles.text}>{t(item)}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => `123d${index}`}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  modalView: {
    width: 260,
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#b7bac9",
    elevation: 2,
  },
  touchableOpacity: {
    flexDirection: "row",
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    backgroundColor: "gray",
    borderRadius: 12,
    alignItems: "center",
  },
  text: {
    marginLeft: 12,
    fontWeight: "500",
    color: "white",
    fontSize: 20,
  },
});

export default LanguageSelection;
