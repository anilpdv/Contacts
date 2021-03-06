import * as React from 'react';
import {View} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import config from '../../lib/config';

const DetailCard = (props) => (
  <View style={{margin: 20}}>
    <Card style={{backgroundColor: config.FIFTH_THEME_COLOR_200}}>
      <Card.Content>
        <Title>{props.cardTitle}</Title>
        {props.cardContent ? <Paragraph>{props.cardContent}</Paragraph> : null}
      </Card.Content>
    </Card>
  </View>
);

export default DetailCard;
