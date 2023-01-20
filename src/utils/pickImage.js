import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const options = {
  mediaType: 'photo',
  maxWidth: 500,
  maxHeight: 500,
  quality: 0.3,
};

export const getImageFromCamera = async () => {
  const result = await launchCamera(options);
  return result;
};

export const getImageFromLibrary = async () => {
  const result = await launchImageLibrary(options);
  return result;
};
