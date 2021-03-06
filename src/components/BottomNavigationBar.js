import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import ContactList from './ContactsList';
import Home from './Home/Home';
import Loader from './Loader';

const RecentsRoute = () => <Text>Recents</Text>;

const BottomNavigationBar = () => {
  const [index, setIndex] = React.useState(0);

  const {notify, loading} = useSelector((store) => store.notify);
  const [routes] = React.useState([
    {key: 'home', title: 'Home', icon: 'home'},
    {key: 'contacts', title: 'Contacts', icon: 'contacts'},
    {key: 'saved', title: 'Saved', icon: 'bookmark-plus'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    contacts: ContactList,
    saved: RecentsRoute,
  });

  return (
    <>
      {loading ? <Loader /> : null}
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        style={{flex: 1}}
      />
    </>
  );
};

export default BottomNavigationBar;
