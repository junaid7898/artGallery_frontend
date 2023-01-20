import {StyleSheet} from 'react-native';
import React from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';
import PaymentForm from './PaymentForm';

const Payment = ({
  art,
  address,
  setLoading,
  hideModal,
  navigateToHomeScreen,
}) => {
  return (
    <StripeProvider publishableKey="pk_test_51MCBxuJUbnB9CMvtHAWZNLk8i3TIn57WNFXtkggOnmb9BofMu1L0dget3fiGXZNo6Z4Yu7n8mqGsMER1BDOdWvbL00xZz7wOaA">
      <PaymentForm
        art={art}
        address={address}
        setLoading={setLoading}
        hideModal={hideModal}
        navigateToHomeScreen={navigateToHomeScreen}
      />
    </StripeProvider>
  );
};

export default Payment;

const styles = StyleSheet.create({});
