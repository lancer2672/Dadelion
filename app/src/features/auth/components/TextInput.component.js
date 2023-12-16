import { forwardRef, memo, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const SCREEN_WIDTH = Dimensions.get("window").width;
const InputText = forwardRef(
  (
    {
      iconLeft,
      iconRight,
      onIconPress,
      placeholder,
      text,
      setText,
      onBlur,
      disabled,
      passwordType,
      hasValidationError,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <TextInput
        mode="outlined"
        outlineStyle={{
          borderRadius: 0,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          marginHorizontal: 20,
        }}
        contentStyle={{
          margin: 0,
        }}
        placeholderTextColor={"white"}
        textColor={"white"}
        editable={!disabled}
        outlineColor={hasValidationError && "red"}
        style={styles.textInput}
        secureTextEntry={passwordType && !showPassword}
        // disabled={disabled}
        ref={ref}
        value={text}
        left={
          <TextInput.Icon
            size={20}
            style={{
              marginRight: 0,
              fontSize: 12,
            }}
            disabled={true}
            color={"white"}
            icon={iconLeft}
          />
        }
        onBlur={onBlur}
        right={
          passwordType && (
            <TextInput.Icon
              size={20}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
              color={"white"}
              icon={showPassword ? "eye" : "eye-off"}
            />
          )
        }
        onChangeText={(newText) => setText(newText)}
        placeholder={placeholder}
      ></TextInput>
    );
  }
);

export default memo(InputText);

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "rgba(0,0,0,0)",
    marginTop: 8,
    width: SCREEN_WIDTH - 32,
    fontSize: 14,
    padding: 0,
    color: "white",
  },
});
