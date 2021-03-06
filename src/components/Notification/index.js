import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Snackbar} from 'react-native-paper';
import {setNotification} from '../../actions';
import Loader from '../Loader';

const Notify = (props) => {
  const dispatch = useDispatch();
  const {notify} = useSelector((store) => store.notify);

  return (
    <View>
      <Snackbar
        visible={notify.visible}
        onDismiss={() => {
          dispatch(setNotification({visible: false, message: ''}));
        }}
        duration={40}
        // style={{backgroundColor: config.NOTIFICATION_THEME_COLOR}}
        action={{
          label: 'ok',
          onPress: () => {
            // Do something
            dispatch(setNotification({visible: false, message: ''}));
          },
        }}>
        {notify.message}
      </Snackbar>
    </View>
  );
};

export default Notify;
