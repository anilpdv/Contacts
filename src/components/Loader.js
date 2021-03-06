import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import config from '../lib/config';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Loader = (props) => (
  <View style={styles.content}>
    <ActivityIndicator size="large" color={config.PRIMARY_THEME_COLOR_600} />
  </View>
);

export default Loader;

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flex: 5,
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight + 100,
    backgroundColor: config.SEVENTH_THEME_COLOR_50,
  },
});
