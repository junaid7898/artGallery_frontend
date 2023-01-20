import {DefaultTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primaryVariant: '#3700B3',
    secondary: '#03DAC6',
    secondaryVariant: '#018786',
    onSecondary: '#000000',
  },
};

export const authInputTheme = {
  ...theme,
  roundness: 10,
};

export const authButtonTheme = {
  ...theme,
  roundness: 20,
};
