import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

export const setGlobalProps = () => {
  setCustomText({
    style: {
      fontFamily: 'Roboto'
    }
  })
}