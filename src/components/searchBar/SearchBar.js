import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Searchbar} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {theme} from '../../theme/appTheme';

const SearchBar = ({handleNavigation}) => {
  const currentUser = auth().currentUser;
  const [searchText, setSearchText] = useState('');
  const [searchItems, setSearchItems] = useState([]);

  const handleSearch = text => {
    setSearchText(text);
    setTimeout(() => {
      firestore()
        .collection('Art')
        .orderBy('title')
        .startAt(text)
        .endAt(text + '\uf8ff')
        .get()
        .then(res => {
          let result = [];
          res.forEach(snapshot => {
            result.push(snapshot._data);
          });
          setSearchItems(result);
        });
    }, 1000);
  };
  return (
    <View style={{flex: 1, marginRight: 10}}>
      <Searchbar
        placeholder="Search"
        onChangeText={text => handleSearch(text)}
        value={searchText}
      />
      {searchItems && searchText && (
        <ScrollView style={styles.searchItemView}>
          {searchItems.length > 0
            ? searchItems.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => handleNavigation(item.artId, item.title)}
                    style={styles.artView}
                    key={item.artId}>
                    <Image
                      source={{uri: item.image}}
                      style={{width: 50, height: 50, borderRadius: 10}}
                    />
                    <View style={styles.desc}>
                      <Text
                        style={{
                          color: theme.colors.onSurface,
                          fontSize: 18,
                          fontWeight: '500',
                        }}>
                        {item.title}
                      </Text>
                      <Text style={{color: theme.colors.backdrop}}>
                        {item.category}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            : null}
        </ScrollView>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchItemView: {
    position: 'absolute',
    bottom: -300,
    height: 300,
    backgroundColor: theme.colors.background,
    width: '100%',
    zIndex: 2,
    overflow: 'hidden',
  },
  artView: {
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.disabled,
  },
  desc: {
    marginLeft: 10,
  },
});
