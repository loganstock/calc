import React, {Component} from 'react';
import { Text, View, TextInput, Picker, Button, ScrollView} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import calcInputs from './components/calcInput';
import Details from './components/details';

const RootStack = createStackNavigator(  // This is pulled from the React Navigation example. This was working and now is not. I do not know enough of React Navigation to know what the issue is
  {
    Home: {
      screen: calcInputs,
    },
    Details: {
      screen: Details,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

/****************************************************************************************************/

const AppContainer = createAppContainer(RootStack); // Also part of the React Navigation example

export default class App extends React.Component { // Also part of the React Navigation example
  render() {
    return <AppContainer />;
  }
}

/****************************************************************************************************/