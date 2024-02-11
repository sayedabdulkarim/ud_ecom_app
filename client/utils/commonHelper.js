import Toast from "react-native-toast-message";

export const showToast = ({
  type,
  text1,
  text2,
  position = "top",
  autoHide = true,
  duration = 2000,
}) => {
  Toast.show({
    type, // 'success', 'error', 'info'
    text1,
    text2,
    position, // 'top' or 'bottom'
    autoHide,
    visibilityTime: duration, // Duration the toast should stay visible
  });
};
