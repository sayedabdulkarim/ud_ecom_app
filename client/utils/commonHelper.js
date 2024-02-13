import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";
import mime from "mime";
import * as ImagePicker from "expo-image-picker";

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

export const convertImageToBase64 = async (uri) => {
  try {
    // Determine the mime type based on the file extension
    const fileType = mime.getType(uri);
    const base64String = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    // Use the determined MIME type, or default to 'image/jpeg' if it can't be determined
    return `data:${fileType || "image/jpeg"};base64,${base64String}`;
  } catch (error) {
    console.error("Error converting image to base64:", error);
    return null;
  }
};
