import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenWidth,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';

export function vw(props) {
  return responsiveScreenWidth(props);
}
export function vh(props) {
  return responsiveScreenHeight(props);
}
export function rw(props) {
  return responsiveWidth(props);
}
export function rh(props) {
  return responsiveHeight(props);
}
export function fs(props) {
  return responsiveFontSize(props / 8.4);
}
