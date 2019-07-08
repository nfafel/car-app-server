import React, { Component, Fragment } from 'react';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>Home</Text>
      </View>
    );
  }
}

class CarsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>Cars</Text>
      </View>
    );
  }
}

class RepairsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>Repairs</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: {screen: HomeScreen},
    Cars: {screen: CarsScreen},
    Repairs: {screen: RepairsScreen},
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 20,
        margin: 0,
        padding: 0
      }
    }
  }
);

const AppContainer = createAppContainer(TabNavigator);

class App extends Component {

  render () { 
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
          </ScrollView>
        </SafeAreaView>
        <AppContainer />
      </Fragment>
    );

    /*
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
          </ScrollView>
        </SafeAreaView>
        <AppContainer />
      </Fragment>
    );
    */

  }

}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
