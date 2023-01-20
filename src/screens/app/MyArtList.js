import {Alert, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, IconButton} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator';
import {layout} from '../../global/styles/layout';
import ArtCard from '../../components/card/ArtCard';
import {theme} from '../../theme/appTheme';

const MyArtList = ({navigation}) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [arts, setArts] = useState([]); // Initial empty array of arts
  const currentUser = auth().currentUser;
  useEffect(() => {
    const subscriber = firestore()
      .collection('Art')
      .where('userId', '==', currentUser.uid)
      .onSnapshot(snapshot => {
        let artsData = [];
        snapshot.forEach(item => {
          artsData.push(item._data);
        });
        setArts(artsData);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  const handleNavigateToAddArt = () => {
    navigation.navigate('add-art');
  };

  const handleNavigation = (artId, title) => {
    navigation.navigate('art-detail', {artId, title});
  };

  return (
    <FlatList
      data={arts}
      keyExtractor={items => items.artId}
      numColumns={2}
      contentContainerStyle={[
        layout.innerBox,
        {marginTop: 10, paddingBottom: 200},
      ]}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      ListEmptyComponent={() => (
        <View>
          <Text
            style={{
              color: theme.colors.error,
              alignSelf: 'center',
              marginVertical: 15,
            }}>
            There is nothing to show
          </Text>
        </View>
      )}
      ListHeaderComponent={() => (
        <View style={styles.iconButton}>
          <Button
            mode="contained"
            icon="plus"
            onPress={() => handleNavigateToAddArt()}>
            new art
          </Button>
        </View>
      )}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      renderItem={({item, index}) => {
        return (
          <ArtCard
            handleNavigation={handleNavigation}
            item={item}
            index={index}
            key={item.artId}
          />
        );
      }}
    />
  );
};

export default MyArtList;

const styles = StyleSheet.create({
  iconButton: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});
