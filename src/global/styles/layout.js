import {StyleSheet} from 'react-native';
import {theme} from '../../theme/appTheme';
import {vh, vw} from '../../utils/responsiveDimensions';

export const layout = StyleSheet.create({
  screenBox: {
    width: vw(100),
    height: vh(100),
    backgroundColor: '#ffffff',
  },
  innerBox: {
    width: '95%',
    alignSelf: 'center',
    maxWidth: 600,
  },
});
