import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {layout} from '../../global/styles/layout';
import {authButtonTheme, authInputTheme, theme} from '../../theme/appTheme';
import BackBtn from '../../components/buttons/BackBtn';
import {fs, rh, vh, vw} from '../../utils/responsiveDimensions';
import {Button, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import {signUpSchema} from '../../utils/validations';
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ErrorComponent = ({errors}) => {
  return (
    <View>
      {errors && errors.name ? (
        <Text style={styles.error}>{errors.name}</Text>
      ) : errors && errors.email ? (
        <Text style={styles.error}>{errors.email}</Text>
      ) : errors && errors.password ? (
        <Text style={styles.error}>{errors.password}</Text>
      ) : null}
    </View>
  );
};

const SignupScreen = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const [loading, setIsLoading] = useState(false);

  return (
    <View style={[layout.screenBox]}>
      {loading && <LoadingIndicator />}
      <View style={[layout.innerBox, styles.innerBox]}>
        <BackBtn goBack={navigateBack} />
        <View style={styles.container}>
          <Text style={styles.title}>Sign up</Text>
          <Text style={styles.subTitle}>
            Provide us with your name, email address and password to create an
            account for your gallery.
          </Text>

          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={signUpSchema}
            onSubmit={async (values, actions) => {
              setIsLoading(true);
              await auth()
                .createUserWithEmailAndPassword(values.email, values.password)
                .then(async _ => {
                  let update = {
                    displayName: values.name,
                  };
                  await auth().currentUser.updateProfile(update);
                })
                .then(() => {
                  return firestore()
                    .collection('userChats')
                    .doc(auth().currentUser.uid)
                    .set({});
                })
                .then(() => {
                  setIsLoading(false);
                })
                .catch(error => {
                  if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('Error', 'Email is already in use', [
                      {
                        text: 'OK',
                        onPress: () =>
                          actions.resetForm({
                            name: values.name,
                            email: '',
                            password: '',
                          }),
                      },
                    ]);
                  }

                  if (error.code === 'auth/invalid-email') {
                    Alert.alert('Error', 'Invalid Email', [
                      {
                        text: 'OK',
                        onPress: () =>
                          actions.resetForm({
                            name: values.name,
                            email: '',
                            password: '',
                          }),
                      },
                    ]);
                  }
                  setIsLoading(false);
                });
            }}>
            {({handleSubmit, handleChange, handleBlur, errors, values}) => {
              return (
                <View>
                  <View style={styles.inputView}>
                    <TextInput
                      mode="outlined"
                      label="name"
                      style={{marginBottom: 10}}
                      theme={authInputTheme}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                    <TextInput
                      mode="outlined"
                      style={{marginBottom: 10}}
                      label="email"
                      theme={authInputTheme}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      keyboardType="email-address"
                      value={values.email}
                    />
                    <TextInput
                      mode="outlined"
                      label="password"
                      secureTextEntry
                      theme={authInputTheme}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />

                    <Text style={styles.subTitle}>
                      Must Contain 8 Characters, One Uppercase, One Lowercase,
                      One Number and One Special Case Character
                    </Text>
                  </View>

                  <ErrorComponent errors={errors} />

                  <Button
                    onPress={handleSubmit}
                    mode="contained"
                    theme={authButtonTheme}
                    style={{paddingVertical: 5}}>
                    Sign up
                  </Button>
                </View>
              );
            }}
          </Formik>

          <View style={styles.divider}>
            <Text style={styles.dividerTxt}>Already have an account?</Text>
          </View>

          <Button
            mode="outlined"
            theme={authButtonTheme}
            onPress={() => navigation.navigate('login')}
            style={{paddingVertical: 5}}>
            Login
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;

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
