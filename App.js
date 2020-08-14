import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import calcInputs from './components/calcInput';
import Details from './components/details';
import prescriptionInfo from './components/displayPrescriptionInfo';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: calcInputs,
    },
    Details: {
      screen: Details,
    },
    prescriptionInfo: {
      screen: prescriptionInfo
    }
  },
  {
    initialRouteName: 'Home',
    //headerMode: 'none',
  }
);

/****************************************************************************************************/

const AppContainer = createAppContainer(RootStack);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

/****************************************************************************************************/