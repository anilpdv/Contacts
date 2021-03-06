import * as React from 'react';
import {List} from 'react-native-paper';
import {Switch} from 'react-native-paper';
const AccordianItem = (props) => {
  const [expanded, setExpanded] = React.useState(true);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="Duplicate Contacts">
      <List.Accordion
        title="Uncontrolled Accordion"
        left={(props) => <List.Icon {...props} icon="contacts-outline" />}>
        <List.Item
          title="First item"
          left={(props) => (
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          )}
        />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={(props) => <List.Icon {...props} icon="contacts-outline" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
  );
};

export default AccordianItem;
