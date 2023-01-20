import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/app/HomeScreen';
import MyArtList from '../screens/app/MyArtList';
import User from '../screens/app/User';
import {rh} from '../utils/responsiveDimensions';
import {theme} from '../theme/appTheme';
import Chat from '../screens/app/Chat';
import Orders from '../screens/app/Orders';

const AppTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'my-art') {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          } else if (route.name === 'chat') {
            iconName = focused
              ? 'chatbox-ellipses'
              : 'chatbox-ellipses-outline';
          } else if (route.name === 'orders') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={focused ? 30 : 25}
              color={focused ? 'white' : 'gray'}
            />
          );
        },
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          borderRadius: 20,
          height: rh(10),
          overflow: 'hidden',
        },
        tabBarActiveTintColor: 'white',
        tabBarItemStyle: {
          marginVertical: 10,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen
        name="my-art"
        component={MyArtList}
        options={{title: 'my art'}}
      />
      <Tab.Screen name="orders" component={Orders} />
      <Tab.Screen name="chat" component={Chat} />
      <Tab.Screen name="user" component={User} />
    </Tab.Navigator>
  );
};

export default AppTabNavigator;
