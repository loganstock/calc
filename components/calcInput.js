import React, {Component} from 'react';
import { Text, View, TextInput, Picker, Image, ScrollView, TouchableOpacity} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import styles from './styles.js';

class calcInputs extends Component { // This class probably should be split into an input class and an calculation class. Eh, oh well
    state = { // I may be using states wrong but I need to save the values of the original input and the calcuated values to be outputed into Details. Any help here is appreciated
      patientGender: 'male',
      patientAge: '',
      patientHeight: '', 
      patientWeight: '',
      patientSCr: '',
    };
  
    updatePatientGender = (patientGender) => {this.setState({ patientGender: patientGender })}
  
    render() { // This is the input section of the app. I need to fix the ScrollView to actually scroll on this class and Details class. 
      return (
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps='handled'
          style={styles.container}
          behavior="padding"
        >
          <Image
            style={styles.Image}
            source={{uri: '../assets/images/logoStandIn.svg'}}
          />
          <Picker selectedValue = {this.state.patientGender} onValueChange = {this.updatePatientGender} style={styles.picker} itemStyle={{height: 100}}> 
            <Picker.Item label="Male" value="male"/>
            <Picker.Item label="Female" value="female"/>
          </Picker>
          <TextInput returnKeyType='done' keyboardType="number-pad" style={styles.inputs} placeholder="Age in Years (yr)" keyboardType="number-pad" maxLength={2} onChangeText={(patientAge) => this.setState({patientAge})} value={this.state.patientAge} />
          <TextInput returnKeyType='done' keyboardType="number-pad" style={styles.inputs} placeholder="Height in Inches (in)" keyboardType="number-pad" maxLength={2} onChangeText={(patientHeight) => this.setState({patientHeight})} value={this.state.patientHeight}/>
          <TextInput returnKeyType='done' keyboardType="number-pad" style={styles.inputs} placeholder="Weight in Pounds (lbs)" keyboardType="number-pad" maxLength={3} onChangeText={(patientWeight) => this.setState({patientWeight})} value={this.state.patientWeight}/>
          <TextInput returnKeyType='done' keyboardType="number-pad" style={styles.inputs} placeholder="Serum Creatinine levels in mg/dl " keyboardType="number-pad" maxLength={3} onChangeText={(patientSCr) => this.setState({patientSCr})} value={this.state.patientSCr}/>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {this.props.navigation.navigate('Details', {
              resultsGender: this.state.patientGender,
              resultsAge: this.state.patientAge,
              resultsHeight: this.state.patientHeight,
              resultsWeight: this.state.patientWeight,
              resultsSCr: this.state.patientSCr,
            });
            }}
            underlayColor='#ddd'>
            <Text style={{textAlign: 'center'}} >Submit</Text>
          </TouchableOpacity>
          <View style={{ height: '40%' }} />
       </ScrollView>
      );
    }
  }

  export default calcInputs;