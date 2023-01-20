import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore, {query, where} from '@react-native-firebase/firestore';
import {layout} from '../../global/styles/layout';
import ArtCard from '../../components/card/ArtCard';
import {theme} from '../../theme/appTheme';
import SearchBar from '../../components/searchBar/SearchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Filter from '../../components/filter/Filter';

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [arts, setArts] = useState([]); // Initial empty array of arts
  const currentUser = auth().currentUser;
  const [filter, setFilter] = useState({
    category: '',
    color: '',
    medium: '',
    subject: '',
  });

  const handleNavigation = (artId, title) => {
    navigation.navigate('art-detail', {artId, title});
  };
  useEffect(() => {
    const routeRef = firestore().collection('Art');
    const userFilter = routeRef.where('userId', '!=', currentUser.uid);
    const categoryFilter = () => {
      if (
        !filter.category &&
        !filter.color &&
        !filter.medium &&
        !filter.subject
      ) {
        return userFilter;
      }
      let newFilter = userFilter;
      if (filter.category) {
        // console.log(filter.category);
        newFilter = newFilter.where('category', '==', filter.category);
      }
      if (filter.color) {
        // console.log(filter.color);
        newFilter = newFilter.where('color', '==', filter.color);
      }
      if (filter.medium) {
        // console.log(filter.medium);
        newFilter = newFilter.where('medium', '==', filter.medium);
      }
      if (filter.subject) {
        // console.log(filter.subject);
        newFilter = newFilter.where('subject', '==', filter.subject);
      }
      return newFilter;
    };
    const subscriber = categoryFilter().onSnapshot(snapshot => {
      let artsData = [];

      if (snapshot !== null) {
        // console.log('once....');
        snapshot.forEach(item => {
          // console.log(item._data);
          artsData.push(item._data);
        });
        setArts(artsData);
      }
      // console.log(artsData);
      setLoading(false);
    });

    return () => subscriber();
  }, [filter]);

  const [showFilter, setShowFilter] = useState(false);
  const handleSetFilter = value => {
    setFilter({...filter, ...value});
  };

  return (
    <View style={layout.screenBox}>
      <View style={[layout.innerBox]}>
        <View style={styles.header}>
          <SearchBar handleNavigation={handleNavigation} />
          {!showFilter ? (
            <Ionicons
              name="filter"
              size={30}
              color={theme.colors.primary}
              onPress={() => setShowFilter(true)}
            />
          ) : (
            <Ionicons
              name="close"
              size={30}
              color={theme.colors.primary}
              onPress={() => setShowFilter(false)}
            />
          )}
          {showFilter && (
            <Filter
              filter={filter}
              setFilter={value => handleSetFilter(value)}
            />
          )}
        </View>
        <FlatList
          data={arts}
          keyExtractor={item => item.artId}
          numColumns={2}
          contentContainerStyle={[{marginTop: 10, paddingBottom: 200}]}
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
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    position: 'relative',
  },
});
