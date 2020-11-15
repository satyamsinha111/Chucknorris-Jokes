import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Card, CardItem, H1, Thumbnail, Left, Body} from 'native-base';

const Jokes = ({Joke}) => {
  console.log('Comming joke', Joke);
  return (
    <Card style={styles.randomJoke}>
      <CardItem>
        <Thumbnail source={{uri: Joke.icon_url}} />
      </CardItem>
      <CardItem>
        <Body>
          <H1>{Joke?.value}</H1>
        </Body>
      </CardItem>
    </Card>
  );
};

export default Jokes;

const styles = StyleSheet.create({
  randomJoke: {
    width: '80%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
});
