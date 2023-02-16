import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const InputText = ({
  iconLeft,
  iconRight,
  onIconPress,
  showPassword,
  placeholder,
  setText,
  passwordType,
  hasValidationError,
}) => {
  console.log("render");
  return (
    <TextInput
      mode="outlined"
      outlineStyle={{
        borderRadius: 25,
      }}
      outlineColor={hasValidationError && "red"}
      style={styles.textInput}
      secureTextEntry={passwordType && !showPassword}
      left={
        <TextInput.Icon
          size={20}
          style={{
            marginRight: 0,
            fontSize: 12,
          }}
          icon={iconLeft}
        />
      }
      right={
        passwordType && (
          <TextInput.Icon
            size={20}
            onPress={onIconPress}
            icon={showPassword ? "eye-off" : "eye"}
          />
        )
      }
      onChangeText={(newText) => setText(newText)}
      placeholder={placeholder}
    ></TextInput>
  );
};

export default memo(InputText);

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    width: 250,
    marginTop: 8,
    fontSize: 14,
  },
});
