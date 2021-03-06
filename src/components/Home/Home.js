import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import Contacts from 'react-native-contacts';
import {useSelector, useDispatch} from 'react-redux';
import tailwind from 'tailwind-rn';
import {setContactsInStore, setLoading} from '../../actions';
import RemoveDuplicateContactList from '../RemoveDuplicates/RemoveDuplicateContactList';
import DetailCard from './DetailCard';

export default function Home(props) {
  const [showDuplicateContacts, setShowDisplayContacts] = React.useState(false);
  const dispatch = useDispatch();
  const {contacts} = useSelector((store) => store.contacts);
  React.useEffect(() => {
    getContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getContacts = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(() => {
      loadContacts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    });
  };

  const loadContacts = () => {
    dispatch(setLoading(true));
    Contacts.getAll()
      .then(async (contacts) => {
        dispatch(setContactsInStore(contacts));
        dispatch(setLoading(false));
      })
      .catch((e) => {
        dispatch(setLoading(false));
      });

    Contacts.checkPermission();
  };

  const setDuplicateContactsByName = () => {
    let duplicateNamesObj = getDuplicateNames();
    setShowDisplayContacts(true);
  };

  const getDuplicateNames = () => {
    let duplicateContacts = {};
    let duplicateContactsObj = {};

    contacts.forEach((contact) => {
      if (duplicateContacts[contact.displayName] >= 0) {
        duplicateContacts[contact.displayName] += 1;
        if (
          duplicateContactsObj[contact.displayName] &&
          duplicateContactsObj[contact.displayName].length >= 0
        ) {
          duplicateContactsObj[contact.displayName].push(contact);
        } else {
          duplicateContactsObj[contact.displayName] = {};
          duplicateContactsObj[contact.displayName] = [contact];
        }
      } else {
        duplicateContacts[contact.displayName] = 0;
      }
    });

    Object.keys(duplicateContacts).forEach((key) => {
      if (duplicateContacts[key] === 0) {
        delete duplicateContacts[key];
      }
    });
    console.log(duplicateContacts);
    console.log(duplicateContactsObj);
    return duplicateContactsObj;
  };
  return (
    <SafeAreaView>
      <View style={tailwind('')}>
        {showDuplicateContacts ? (
          <RemoveDuplicateContactList />
        ) : (
          <>
            <TouchableOpacity onPress={(event) => setDuplicateContactsByName()}>
              <DetailCard
                cardTitle={'Remove Duplicate Contacts'}
                cardContent={'*removes duplicate contacts.'}
              />
            </TouchableOpacity>
            <DetailCard
              cardTitle={'Remove Duplicate By Name'}
              cardContent={'*removes duplicate name contacts.'}
            />
            <DetailCard
              cardTitle={'Remove Duplicate By Number'}
              cardContent={'*removes duplicate number contacts.'}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
