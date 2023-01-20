import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {layout} from '../../global/styles/layout';
import {theme} from '../../theme/appTheme';
import {rh, vh} from '../../utils/responsiveDimensions';
import {Button} from 'react-native-paper';

const SplashScreen = ({navigation}) => {
  return (
    <View style={[layout.screenBox, styles.screenBox]}>
      <View style={[layout.innerBox, styles.innerBox]}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Welcome To</Text>
          <Text style={[styles.title, styles.subTitle]}>Art Gallery</Text>
        </View>
        <View style={styles.actions}>
          <Button
            onPress={() => navigation.navigate('login')}
            mode="contained"
            style={{alignSelf: 'center', paddingHorizontal: 50}}
            theme={{roundness: 15, colors: {primary: theme.colors.background}}}>
            Login
          </Button>
          <View style={styles.divider}>
            <Text style={styles.dividerTxt}>Don't have any account?</Text>
          </View>
          <Button
            onPress={() => navigation.navigate('signup')}
            mode="text"
            style={{alignSelf: 'center', paddingHorizontal: 50}}
            theme={{roundness: 15, colors: {primary: theme.colors.background}}}>
            sign up
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  screenBox: {
    backgroundColor: theme.colors.primary,
  },
  innerBox: {
    minHeight: rh(100),
  },
  titleBox: {
    marginTop: rh(40),
    alignSelf: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.background,
    textTransform: 'uppercase',
  },
  subTitle: {
    fontSize: 30,
    fontStyle: 'italic',
    color: theme.colors.background,
    letterSpacing: 10,
  },
  actions: {
    marginTop: rh(30),
  },
  divider: {
    backgroundColor: theme.colors.disabled,
    marginVertical: rh(2),
    marginTop: rh(3),
    height: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerTxt: {
    fontSize: 15,
    color: theme.colors.background,
    height: 18,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 10,
    // textTransform: 'uppercase',
  },
});
