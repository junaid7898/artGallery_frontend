import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStackNavigator from './AuthStackNavigator';

import auth from '@react-native-firebase/auth';
import AppTabNavigator from './AppTabNavigator';
import AddNewArt from '../screens/app/MyArt/AddNewArt';
import ArtDetatils from '../screens/app/artDetails/ArtDetatils';
import {theme} from '../theme/appTheme';
import Messages from '../screens/app/chat/Messages';

const RootStackNavigator = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: '#ffffff',
        }}>
        {!user && <Stack.Screen name="auth" component={AuthStackNavigator} />}
        {user && <Stack.Screen name="app" component={AppTabNavigator} />}

        <Stack.Screen name="add-art" component={AddNewArt} />
        <Stack.Screen
          name="art-detail"
          component={ArtDetatils}
          options={({route}) => ({
            headerTitle: route.params.title,
            headerShown: true,
          })}
        />
        <Stack.Screen name="messaging" component={Messages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
