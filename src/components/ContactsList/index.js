import React, {useEffect} from 'react';
import {View, PermissionsAndroid, Text, ScrollView} from 'react-native';
import {List, withTheme, Button} from 'react-native-paper';
import Contacts from 'react-native-contacts';
import Loader from '../Loader';
import config from '../../lib/config';
import {useDispatch, useSelector} from 'react-redux';
import {setContactsInStore, setLoading, setNotification} from '../../actions';

function ContactList(props) {
  const [contactsState, setContacts] = React.useState([]);
  const dispatch = useDispatch();

  const {notify, loading} = useSelector((store) => store.notify);
  const {colors} = props.theme;

  useEffect(() => {
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
        await setContacts(contacts);
        dispatch(setContactsInStore(contacts));
        dispatch(setLoading(false));
      })
      .catch((e) => {
        dispatch(setLoading(false));
      });

    Contacts.checkPermission();
  };

  const deleteContact = (recordId) => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to write your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(() => {
      loadDeleteContact(recordId);
    });
  };

  const loadDeleteContact = (recordID) => {
    Contacts.deleteContact({recordID: recordID})
      .then((recordId) => {
        // contact deleted
        dispatch(
          setNotification({
            message: 'Contact Deleted Successfully!',
            visible: true,
          }),
        );
        updateContactsWhenDeleted(recordID);
      })
      .catch((err) => {
        console.log(err);
      });

    Contacts.checkPermission();
  };

  const updateContactsWhenDeleted = (recordID) => {
    let updateContacts = contactsState.filter(
      (contact) => contact.recordID !== recordID,
    );
    setContacts(updateContacts);
    setContactsInStore(dispatch(updateContacts));
  };

  const getDuplicateNames = () => {
    let duplicateContacts = {};

    contactsState.forEach((contact) => {
      if (duplicateContacts[contact.displayName] >= 0) {
        duplicateContacts[contact.displayName] += 1;
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
  };

  function compare(a, b) {
    if (a.displayName < b.displayName) {
      return -1;
    }
    if (a.displayName > b.displayName) {
      return 1;
    }
    return 0;
  }

  return (
    <View>
      <ScrollView>
        <>
          {!loading &&
            contactsState &&
            contactsState.sort(compare).map((item) => (
              <List.Item
                key={item.rawContactId}
                title={item.displayName}
                description={
                  item.phoneNumbers &&
                  item.phoneNumbers[0] &&
                  item.phoneNumbers[0].number
                }
                left={(props) => <List.Icon {...props} icon="contacts" />}
                right={(props) => (
                  <Button
                    style={{
                      backgroundColor: config.SECONDARY_THEME_COLOR_500,
                      height: 40,
                    }}
                    icon="delete"
                    mode="contained"
                    onPress={() => deleteContact(item.recordID)}>
                    Remove
                  </Button>
                )}
              />
            ))}
        </>
      </ScrollView>
    </View>
  );
}

export default withTheme(ContactList);
