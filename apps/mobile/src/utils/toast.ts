import Toast from "react-native-toast-message";

export function success(message: string) {
  Toast.show({
    type: "success",
    text1: message,
  });
}

export function error(message: string) {
  Toast.show({
    type: "error",
    text1: message,
  });
}

export function info(message: string) {
  Toast.show({
    type: "info",
    text1: message,
  });
}