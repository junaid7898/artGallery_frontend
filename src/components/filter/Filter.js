import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../theme/appTheme';
import {
  newCategory,
  newCmedium,
  newColor,
  newMedium,
  newSubject,
} from '../../utils/categoriesData';

const Filter = ({filter, setFilter}) => {
  const [options, setOptions] = useState(1);

  return (
    <View style={styles.filterView}>
      <View style={styles.filterHead}>
        <TouchableOpacity
          style={[styles.option, options === 1 && styles.optionActive]}
          onPress={() => setOptions(1)}>
          <Text
            style={[styles.optionTxt, options === 1 && styles.optionTxtActive]}>
            Category
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, options === 2 && styles.optionActive]}
          onPress={() => setOptions(2)}>
          <Text
            style={[styles.optionTxt, options === 2 && styles.optionTxtActive]}>
            Medium
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, options === 3 && styles.optionActive]}
          onPress={() => setOptions(3)}>
          <Text
            style={[styles.optionTxt, options === 3 && styles.optionTxtActive]}>
            Subject
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, options === 4 && styles.optionActive]}
          onPress={() => setOptions(4)}>
          <Text
            style={[styles.optionTxt, options === 4 && styles.optionTxtActive]}>
            Color
          </Text>
        </TouchableOpacity>
      </View>

      {options == 1 && (
        <View style={styles.optionListView}>
          {newCategory.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  let newValue = item.value;
                  setFilter({category: newValue});
                }}
                key={index}
                style={[
                  styles.listValue,
                  filter.category === item.value && styles.listValueActive,
                ]}>
                <Text
                  style={[
                    styles.listTxt,
                    filter.category === item.value && styles.listTxtActive,
                  ]}>
                  {item.label ? item.label : 'All'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      {options == 2 && (
        <View style={styles.optionListView}>
          {newMedium.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  let newValue = item.value;
                  setFilter({medium: newValue});
                }}
                key={index}
                style={[
                  styles.listValue,
                  filter.medium === item.value && styles.listValueActive,
                ]}>
                <Text
                  style={[
                    styles.listTxt,
                    filter.medium === item.value && styles.listTxtActive,
                  ]}>
                  {item.label ? item.label : 'All'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      {options == 3 && (
        <View style={styles.optionListView}>
          {newSubject.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  let newValue = item.value;
                  setFilter({subject: newValue});
                }}
                key={index}
                style={[
                  styles.listValue,
                  filter.subject === item.value && styles.listValueActive,
                ]}>
                <Text
                  style={[
                    styles.listTxt,
                    filter.subject === item.value && styles.listTxtActive,
                  ]}>
                  {item.label ? item.label : 'All'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      {options == 4 && (
        <View style={styles.optionListView}>
          {newColor.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  let newValue = item.value;
                  setFilter({color: newValue});
                }}
                key={index}
                style={[
                  styles.listValue,
                  filter.color === item.value && styles.listValueActive,
                ]}>
                <Text
                  style={[
                    styles.listTxt,
                    filter.color === item.value && styles.listTxtActive,
                  ]}>
                  {item.label ? item.label : 'All'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  filterView: {
    position: 'absolute',
    backgroundColor: theme.colors.background,
    width: '100%',
    bottom: -250,
    zIndex: 1,
    paddingVertical: 10,
    height: 250,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  filterHead: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  option: {
    padding: 10,
    borderRightWidth: 1,
    borderColor: theme.colors.backdrop,
    width: 80,
  },
  optionActive: {
    backgroundColor: theme.colors.primary,
  },
  optionTxt: {
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
  optionTxtActive: {
    color: '#ffffff',
  },
  optionListView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    // backgroundColor: 'red',
  },
  listValue: {
    borderColor: theme.colors.onSurface,
    borderRadius: 5,
    padding: 10,
    width: 100,
  },
  listValueActive: {
    backgroundColor: theme.colors.secondary,
  },
  listTxt: {
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
  listTxtActive: {
    color: theme.colors.onSecondary,
  },
});
