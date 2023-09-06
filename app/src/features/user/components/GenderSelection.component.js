import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Foundation } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const GenderSelection = ({ visible, onClose, gender, setGender }) => {
  const { t } = useTranslation();
  const handleSelectGender = (value) => {
    setGender(value);
    onClose();
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.centeredView} onPress={onClose}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => handleSelectGender(0)}
            style={[
              styles.touchableOpacity,
              {
                backgroundColor: gender == 0 ? "gray" : null,
                borderColor: gender == 0 ? "gray" : null,
              },
            ]}
          >
            <Foundation name="male-symbol" size={28} color="#8f9cdb" />
            <Text style={styles.text}>{t("male")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectGender(1)}
            style={[
              styles.touchableOpacity,
              {
                backgroundColor: gender == 1 ? "gray" : null,
                borderColor: gender == 1 ? "gray" : null,
              },
            ]}
          >
            <Foundation name="female-symbol" size={28} color="#e86ddd" />
            <Text style={styles.text}>{t("female")}</Text>
          </TouchableOpacity>
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

export default GenderSelection;
