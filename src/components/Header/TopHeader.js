import * as React from 'react';
import {Appbar} from 'react-native-paper';

const TopHeader = (props) => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => props.navigation.goBack(null)} />
      <Appbar.Content title="Contacts" subtitle="Remove Duplicate Contacts" />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};

export default TopHeader;
