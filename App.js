import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import Axios from 'axios';
import {Spinner} from 'native-base';
import Jokes from './screens/Jokes';

const App = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getChucknorrisJokes = async () => {
    const {data} = await Axios.get('https://api.chucknorris.io/jokes/random');
    console.log(data);
    setData(data);
    setRefreshing(false);
    setLoading(false);
  };

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  useEffect(() => {
    setLoading(true);
    getChucknorrisJokes();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getChucknorrisJokes();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner color="#AE1438" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          progressBackgroundColor="#EAF0F1"
          colors={['#EA7773', '#2B2B52', '#8B78E6', '#EAF0F1']}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <View style={styles.jokesContainer}>
        <Jokes Joke={data} />
      </View>
      <View style={styles.hintContainer}>
        <Text style={styles.text}>Swipe down for more jokes</Text>
      </View>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00CCCD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#DAE0E2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  jokesContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#EC4849',
    letterSpacing: 2,
    fontFamily: 'Nunito',
  },
});
