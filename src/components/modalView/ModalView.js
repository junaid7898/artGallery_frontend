import {StyleSheet, View, Modal} from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../theme/appTheme';

const ModalView = ({visible, hideModal, children, showCloseIcon = false}) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      style={{
        backgroundColor: 'red',
        zIndex: 6,
      }}
      onRequestClose={() => {
        hideModal();
      }}>
      <View style={styles.containerStyle}>
        <View style={styles.modalView}>
          {children}
          {showCloseIcon && (
            <MaterialIcon
              onPress={() => hideModal()}
              name="close-box"
              color={theme.colors.primary}
              size={50}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: [{translateX: -8}, {translateY: -8}],
              }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    width: '90%',
    maxWidth: 600,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
});
