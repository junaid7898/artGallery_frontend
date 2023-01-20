import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {layout} from '../../global/styles/layout';
import BackBtn from '../../components/buttons/BackBtn';
import {Button, TextInput} from 'react-native-paper';
import {fs, rh, vh} from '../../utils/responsiveDimensions';
import {authButtonTheme, authInputTheme, theme} from '../../theme/appTheme';
import {Formik} from 'formik';
import {loginSchema} from '../../utils/validations';

import auth from '@react-native-firebase/auth';
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator';

const ErrorComponent = ({errors}) => {
  return (
    <View>
      {errors && errors.email ? (
        <Text style={styles.error}>{errors.email}</Text>
      ) : errors && errors.password ? (
        <Text style={styles.error}>{errors.password}</Text>
      ) : null}
    </View>
  );
};

const LoginScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const navigateBack = () => {
    navigation.goBack();
  };
  return (
    <View style={[layout.screenBox]}>
      {loading && <LoadingIndicator />}
      <View style={[layout.innerBox, styles.innerBox]}>
        <BackBtn goBack={navigateBack} />
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subTitle}>
            Provide us with your email address and password to login for art
            gallery.
          </Text>

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={async (values, actions) => {
              setLoading(true);
              await auth()
                .signInWithEmailAndPassword(values.email, values.password)
                .then(res => console.log(res))
                .catch(() => {
                  setLoading(false);
                  Alert.alert('Error', 'Invalid username or password', [
                    {
                      text: 'OK',
                      onPress: () =>
                        actions.resetForm({
                          email: '',
                          password: '',
                        }),
                    },
                  ]);
                });
            }}>
            {({handleBlur, handleChange, handleSubmit, errors, values}) => {
              return (
                <View>
                  <View style={styles.inputView}>
                    <TextInput
                      mode="outlined"
                      style={{marginBottom: 10}}
                      label="email"
                      theme={authInputTheme}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      keyboardType="email-address"
                    />
                    <TextInput
                      mode="outlined"
                      label="password"
                      secureTextEntry
                      theme={authInputTheme}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                    />
                  </View>

                  <ErrorComponent errors={errors} />

                  <Button
                    onPress={handleSubmit}
                    mode="contained"
                    theme={authButtonTheme}
                    style={{paddingVertical: 5}}>
                    Login
                  </Button>
                </View>
              );
            }}
          </Formik>

          <View style={styles.divider}>
            <Text style={styles.dividerTxt}>Don't have any account?</Text>
          </View>

          <Button
            mode="outlined"
            theme={authButtonTheme}
            onPress={() => navigation.navigate('signup')}
            style={{paddingVertical: 5}}>
            Sign up
          </Button>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  innerBox: {
    marginTop: vh(5),
    flex: 1,
  },
  container: {
    width: '85%',
    alignSelf: 'center',
    flex: 1,
    marginTop: vh(5),
  },
  title: {
    color: theme.colors.onSurface,
    fontSize: fs(30),
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  subTitle: {
    color: theme.colors.backdrop,
    fontSize: fs(18),
  },
  inputView: {
    marginVertical: vh(3),
  },

  divider: {
    backgroundColor: theme.colors.disabled,
    marginVertical: rh(4),
    height: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerTxt: {
    fontSize: 15,
    color: theme.colors.text,
    height: 18,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  error: {
    color: theme.colors.error,
  },
});
