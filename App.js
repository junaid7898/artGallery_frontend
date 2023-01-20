import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import {theme} from './src/theme/appTheme';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <RootStackNavigator />
    </PaperProvider>
  );
};

export default App;
