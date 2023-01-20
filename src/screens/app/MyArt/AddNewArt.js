import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {layout} from '../../../global/styles/layout';
import {Formik} from 'formik';
import {addArtValidation} from '../../../utils/validations';
import {Button, TextInput} from 'react-native-paper';
import {vh} from '../../../utils/responsiveDimensions';
import {theme} from '../../../theme/appTheme';
import {category, colors, medium, subject} from '../../../utils/categoriesData';
import {
  getImageFromCamera,
  getImageFromLibrary,
} from '../../../utils/pickImage';
import ModalView from '../../../components/modalView/ModalView';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import LoadingIndicator from '../../../components/loadingIndicator/LoadingIndicator';

const FormFeild = ({children, feildName, feildDescription}) => {
  return (
    <View style={styles.feildView}>
      <Text style={styles.feildName}>{feildName}</Text>
      <Text style={styles.feildDescription}>{feildDescription}</Text>
      {children}
    </View>
  );
};

const OptionFeild = ({isActive, label, handlePress}) => {
  return (
    <TouchableOpacity style={styles.optionBox} onPress={handlePress}>
      <View
        style={[styles.optionCircle, isActive && styles.optionCircleActive]}
      />
      <Text style={styles.labelTxt}>{label}</Text>
    </TouchableOpacity>
  );
};

const AddNewArt = ({navigation}) => {
  const initialValues = {
    title: '',
    description: '',
    image: '',
    category: 'painting',
    subject: 'abstract',
    medium: 'arclic',
    color: 'black',
    size: {
      width: '',
      height: '',
    },
    price: 0,
  };

  const currentUser = auth().currentUser;
  const [img, setImg] = useState(null);

  useEffect(() => {
    if (auth().currentUser && !auth().currentUser.photoURL) {
      Alert.alert(
        'Alert',
        'Please upload a profile picture before uploading any art',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('app', {
                screen: 'user',
                params: {showEditProfile: true},
              }),
          },
        ],
      );
    }
  }, []);

  const takeImage = async (type, setFieldValue) => {
    let result;
    if (type === 'camera') {
      result = await getImageFromCamera();
    } else if (type === 'gallery') {
      result = await getImageFromLibrary();
    }

    if (result.didCancel) {
      Alert.alert('Alert', 'Are You sure you want to cancel?', [
        {
          text: 'Yes',
          onPress: () => takeImage(type),
          style: 'cancel',
        },
        {text: 'No', onPress: () => console.log('No Pressed')},
      ]);
    } else if (result.assets) {
      setFieldValue('image', result.assets[0].uri);
      setImg(result.assets[0].fileName);
    }
  };

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleArtPost = async () => {
    setLoading(true);
    setShowModal(false);
    let art = {
      ...formData,
      userId: currentUser.uid,
      userName: currentUser.displayName,
    };

    const documentRef = firestore().collection('Art').doc();
    const storageRef = storage().ref(
      `${currentUser.uid}/${documentRef.id}/${img}`,
    );
    const url = await storageRef.putFile(formData.image);
    if (url) {
      const imageUrl = await storageRef.getDownloadURL();
      art = {
        ...art,
        image: imageUrl,
        artId: documentRef.id,
        status: 'active',
        profilePic: currentUser.photoURL,
      };
      await documentRef
        .set(art)
        .then(() => {
          setLoading(false);
          Alert.alert('Success', 'Uploaded succesfully!!!', [
            {
              text: 'Ok',
              onPress: () => navigation.goBack(),
              style: 'default',
            },
          ]);
        })
        .catch(err => {
          Alert.alert('Error', 'Servers are not responding', [
            {
              text: 'Ok',
              onPress: () => console.log('ok'),
              style: 'cancel',
            },
          ]);
          setLoading(false);
        });
    }
  };
  return (
    <View style={[layout.screenBox]}>
      {loading && <LoadingIndicator />}
      <ScrollView style={[layout.innerBox, styles.innerBox]}>
        <Formik
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={addArtValidation}
          onSubmit={values => {
            setShowModal(true);
            setFormData(values);
          }}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
            values,
            errors,
          }) => {
            return (
              <View style={styles.form}>
                <ModalView
                  visible={showModal}
                  hideModal={() => setShowModal(false)}
                  showCloseIcon>
                  {formData && (
                    <View style={{width: '100%'}}>
                      <Text
                        style={{
                          color: theme.colors.primary,
                          fontSize: 20,
                          fontWeight: '500',
                          textAlign: 'center',
                        }}>
                        Summary
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={(styles.summarySection, {marginRight: 25})}>
                          <Text style={styles.summaryTitle}>Art</Text>
                          <Image
                            source={{uri: formData.image}}
                            style={{
                              width: 90,
                              height: 90,
                              borderRadius: 10,
                            }}
                          />
                        </View>
                        <View>
                          <View style={styles.summarySection}>
                            <Text style={styles.summaryTitle}>Title</Text>
                            <Text style={styles.summaryValue}>
                              {formData.title}
                            </Text>
                          </View>

                          <View
                            style={(styles.summarySection, {maxWidth: 220})}>
                            <Text style={styles.summaryTitle}>Description</Text>
                            <Text style={styles.summaryValue}>
                              {formData.description}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          marginVertical: 10,
                        }}>
                        <View
                          style={[
                            styles.summarySection,
                            {width: 100, marginBottom: 10},
                          ]}>
                          <Text style={styles.summaryTitle}>Category</Text>
                          <Text style={styles.summaryValue}>
                            {formData.category}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.summarySection,
                            {width: 100, marginBottom: 10},
                          ]}>
                          <Text style={styles.summaryTitle}>Subject</Text>
                          <Text style={styles.summaryValue}>
                            {formData.subject}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.summarySection,
                            {width: 100, marginBottom: 10},
                          ]}>
                          <Text style={styles.summaryTitle}>Medium</Text>
                          <Text style={styles.summaryValue}>
                            {formData.medium}
                          </Text>
                        </View>
                        <View style={[styles.summarySection, {width: 100}]}>
                          <Text style={styles.summaryTitle}>Color</Text>
                          <Text style={styles.summaryValue}>
                            {formData.color}
                          </Text>
                        </View>
                        <View style={[styles.summarySection, {width: 100}]}>
                          <Text style={styles.summaryTitle}>Size</Text>
                          <Text style={styles.summaryValue}>{`${
                            formData.size && formData.size.width
                          } X ${
                            formData.size && formData.size.height
                          } cm`}</Text>
                        </View>
                        <View style={[styles.summarySection, {width: 100}]}>
                          <Text style={styles.summaryTitle}>Price</Text>
                          <Text
                            style={
                              styles.summaryValue
                            }>{`$${formData.price}`}</Text>
                        </View>
                      </View>

                      <Button
                        mode="contained"
                        theme={{roundness: 10}}
                        onPress={handleArtPost}>
                        Upload Art
                      </Button>
                    </View>
                  )}
                </ModalView>
                <Text style={styles.title}>Painting Details</Text>
                <FormFeild
                  feildName="Title"
                  feildDescription="the title feild should give the gist of your painting in one to three words">
                  <View style={styles.inputBox}>
                    <TextInput
                      mode="flat"
                      value={values.title}
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      placeholder="Enter Title here"
                      maxLength={20}
                    />
                  </View>
                </FormFeild>

                <FormFeild
                  feildName="Description"
                  feildDescription="Describe your painting briefly in a paragraph. Write about the idea and motivation behind the painting and what kind of card and material is used to make it">
                  <View style={styles.inputBox}>
                    <TextInput
                      mode="flat"
                      value={values.description}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      placeholder="Enter Description here"
                      multiline
                      numberOfLines={4}
                      maxLength={250}
                    />
                  </View>
                </FormFeild>

                <FormFeild
                  feildName="Price ($)"
                  feildDescription="Set a price(in dollars) for your painting. you know your worth give it a go!!!">
                  <View style={styles.inputBox}>
                    <TextInput
                      mode="flat"
                      value={values.price}
                      onChangeText={handleChange('price')}
                      onBlur={handleBlur('price')}
                      placeholder="Enter Price here"
                      keyboardType="decimal-pad"
                    />
                  </View>
                </FormFeild>

                <FormFeild
                  feildName="Dimensions"
                  feildDescription="Set a physical dimensions for your painting. Measure the width and height preciesly and write it bellow.">
                  <View style={styles.inputBoxRow}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TextInput
                        mode="flat"
                        value={values.size.width}
                        onChangeText={handleChange('size.width')}
                        onBlur={handleBlur('size.width')}
                        placeholder="Width"
                        maxLength={3}
                        keyboardType="decimal-pad"
                        style={{width: 150}}
                      />
                      <Text style={{color: '#000000', paddingHorizontal: 10}}>
                        X
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TextInput
                        mode="flat"
                        value={values.size.height}
                        onChangeText={handleChange('size.height')}
                        onBlur={handleBlur('size.height')}
                        placeholder="height"
                        maxLength={3}
                        keyboardType="decimal-pad"
                        style={{width: 150}}
                      />
                      <Text style={{color: '#000000', paddingHorizontal: 10}}>
                        cm
                      </Text>
                    </View>
                  </View>
                </FormFeild>

                <FormFeild
                  feildName="Category"
                  feildDescription="Select a category for your art">
                  <View style={styles.optionsView}>
                    {category &&
                      category.map(item => {
                        return (
                          <OptionFeild
                            label={item.label}
                            isActive={
                              values.category === item.value ? true : false
                            }
                            handlePress={() =>
                              setFieldValue('category', item.value)
                            }
                            key={item.value}
                          />
                        );
                      })}
                  </View>
                </FormFeild>

                <FormFeild
                  feildName="Subject"
                  feildDescription="Select a subject for your art">
                  <View
                    style={[
                      styles.optionsView,
                      {flexDirection: 'row', flexWrap: 'wrap'},
                    ]}>
                    {subject &&
                      subject.map(item => {
                        return (
                          <OptionFeild
                            label={item.label}
                            isActive={
                              values.subject === item.value ? true : false
                            }
                            handlePress={() =>
                              setFieldValue('subject', item.value)
                            }
                            key={item.value}
                          />
                        );
                      })}
                  </View>
                </FormFeild>

                <FormFeild
                  feildName="Medium"
                  feildDescription="Select the most suitable medium for your art">
                  <View
                    style={[
                      styles.optionsView,
                      {flexDirection: 'row', flexWrap: 'wrap'},
                    ]}>
                    {medium &&
                      medium.map(item => {
                        return (
                          <OptionFeild
                            label={item.label}
                            isActive={
                              values.medium === item.value ? true : false
                            }
                            handlePress={() =>
                              setFieldValue('medium', item.value)
                            }
                            key={item.value}
                          />
                        );
                      })}
                  </View>
                </FormFeild>

                <FormFeild
                  feildName="Colors"
                  feildDescription="Select one of the main color in the list given bellow">
                  <View
                    style={[
                      styles.optionsView,
                      {flexDirection: 'row', flexWrap: 'wrap'},
                    ]}>
                    {colors &&
                      colors.map(item => {
                        return (
                          <OptionFeild
                            label={item.label}
                            isActive={
                              values.color === item.value ? true : false
                            }
                            handlePress={() =>
                              setFieldValue('color', item.value)
                            }
                            key={item.value}
                          />
                        );
                      })}
                  </View>
                </FormFeild>
                <FormFeild
                  feildName="Picture"
                  feildDescription="upload a picture for your art for the reference">
                  <View style={styles.imgPickerBox}>
                    <Text
                      style={{
                        color: theme.colors.error,
                        textAlign: 'center',
                        marginVertical: 10,
                      }}>
                      {values.image ? 'change picture' : 'take picture'}
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Button
                        mode="outlined"
                        icon="plus"
                        style={{flex: 1}}
                        onPress={() => takeImage('gallery', setFieldValue)}>
                        From Gallery
                      </Button>
                      <Button
                        mode="outlined"
                        icon="plus"
                        style={{flex: 1}}
                        onPress={() => takeImage('camera', setFieldValue)}>
                        From Camera
                      </Button>
                    </View>
                  </View>
                </FormFeild>
                {values.image && (
                  <Image
                    source={{uri: values.image}}
                    style={{
                      width: 200,
                      height: 200,
                      alignSelf: 'center',
                      marginBottom: 10,
                      borderRadius: 10,
                    }}
                  />
                )}

                <View>
                  {errors && errors.title ? (
                    <Text style={styles.errors}>{errors.title}</Text>
                  ) : errors && errors.description ? (
                    <Text style={styles.errors}>{errors.description}</Text>
                  ) : errors && errors.image ? (
                    <Text style={styles.errors}>{errors.image}</Text>
                  ) : errors && errors.size && errors.size.width ? (
                    <Text style={styles.errors}>{errors.size.width}</Text>
                  ) : errors && errors.size && errors.size.height ? (
                    <Text style={styles.errors}>{errors.size.height}</Text>
                  ) : (
                    errors &&
                    errors.price && (
                      <Text style={styles.errors}>{errors.price}</Text>
                    )
                  )}
                </View>

                <Button
                  mode="contained"
                  style={{marginBottom: 300}}
                  onPress={handleSubmit}>
                  confirm
                </Button>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default AddNewArt;

const styles = StyleSheet.create({
  innerBox: {
    marginTop: vh(2),
  },
  title: {
    color: theme.colors.primary,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  feildView: {
    marginVertical: 15,
  },
  feildName: {
    color: theme.colors.onSurface,
    fontSize: 17,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  feildDescription: {
    color: theme.colors.backdrop,
    fontSize: 17,
    fontWeight: '300',
  },
  inputBox: {
    marginTop: 10,
  },
  inputBoxRow: {
    flexDirection: 'row',
  },
  optionsView: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // marginBottom: 200,
  },
  optionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    // flex: 4,
    width: 150,
  },
  optionCircle: {
    width: 15,
    height: 15,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    // borderColor: theme.colors.placeholder,
    // borderWidth: 2,
  },
  optionCircleActive: {
    backgroundColor: theme.colors.primary,
  },
  labelTxt: {
    color: theme.colors.onSurface,
    fontSize: 18,
    marginRight: 10,
  },
  errors: {
    color: theme.colors.error,
  },
  summarySection: {
    alignItems: 'flex-start',
  },
  summaryTitle: {
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: 16,
  },
  summaryValue: {
    color: theme.colors.onSurface,
    fontSize: 15,
    fontWeight: '400',
  },
});
