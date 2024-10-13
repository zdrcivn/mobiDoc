import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const BlankScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 15, fontFamily: 'Roboto-Bold'}}>
        You have no current inbox!
      </Text>
    </View>
  );
};

export default BlankScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
