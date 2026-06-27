import React, {
    useState,
  } from "react";
  
  import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    TextInputProps,
  } from "react-native";
  
  import {
    Ionicons,
  } from "@expo/vector-icons";
  
  import { useAppTheme } from "../../theme/useAppTheme";
  
  type Props = TextInputProps & {
    label?: string;
  
    icon?: keyof typeof Ionicons.glyphMap;
  
    error?: string;
  
    helperText?: string;
  
    secure?: boolean;
  
    rightComponent?: React.ReactNode;
  };
  
  export default function FormInput({
    label,
  
    icon,
  
    error,
  
    helperText,
  
    secure = false,
  
    rightComponent,
  
    ...props
  }: Props) {
    const { palette } =
      useAppTheme();
  
    const [hidden, setHidden] =
      useState(secure);
  
    return (
      <View style={styles.container}>
        {!!label && (
          <Text
            style={[
              styles.label,
              {
                color:
                  palette.text,
              },
            ]}
          >
            {label}
          </Text>
        )}
  
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor:
                palette.card,
  
              borderColor: error
                ? palette.danger
                : palette.border,
            },
          ]}
        >
          {icon && (
            <Ionicons
              name={icon}
              size={22}
              color={
                palette.subtext
              }
              style={styles.icon}
            />
          )}
  
          <TextInput
            {...props}
            secureTextEntry={
              hidden
            }
            placeholderTextColor={
              palette.subtext
            }
            style={[
              styles.input,
              {
                color:
                  palette.text,
              },
            ]}
          />
  
          {secure && (
            <Pressable
              onPress={() =>
                setHidden(
                  !hidden
                )
              }
            >
              <Ionicons
                size={22}
                color={
                  palette.subtext
                }
                name={
                  hidden
                    ? "eye-off"
                    : "eye"
                }
              />
            </Pressable>
          )}
  
          {rightComponent}
        </View>
  
        {!!helperText && !error && (
          <Text
            style={[
              styles.helper,
              {
                color:
                  palette.subtext,
              },
            ]}
          >
            {helperText}
          </Text>
        )}
  
        {!!error && (
          <Text
            style={[
              styles.error,
              {
                color:
                  palette.danger,
              },
            ]}
          >
            {error}
          </Text>
        )}
      </View>
    );
  }
  
  const styles =
    StyleSheet.create({
      container: {
        marginBottom: 18,
      },
  
      label: {
        marginBottom: 8,
        fontWeight: "600",
        fontSize: 15,
      },
  
      inputContainer: {
        flexDirection: "row",
        alignItems: "center",
  
        borderWidth: 1,
  
        borderRadius: 16,
  
        paddingHorizontal: 16,
  
        minHeight: 58,
      },
  
      icon: {
        marginRight: 12,
      },
  
      input: {
        flex: 1,
  
        fontSize: 16,
      },
  
      helper: {
        marginTop: 6,
  
        fontSize: 13,
      },
  
      error: {
        marginTop: 6,
  
        fontSize: 13,
      },
    });