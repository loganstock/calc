import React, {Component} from 'react';
import { Text, View, TextInput, Picker, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import styles from './styles.js';

// Input class where the user inputs information necessary for calculations

class calcInputs extends Component {
    state = { // States that hold the inputed values that are used in calculation
      patientGender: 'male',
      patientAge: '',
      patientHeight: '', 
      patientWeight: '',
      patientSCr: '',
    };

    /***********************************************************************************/
  
    updatePatientGender = (patientGender) => {this.setState({ patientGender: patientGender })}

    /***********************************************************************************/

    // This is the input render of the app. 
    render() {
      return ( 
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column'}} behavior="padding" enabled keyboardVerticalOffset={-200}> 
          <ScrollView contentContainerStyle={{justifyContent: 'center',}} keyboardShouldPersistTaps='handled' behavior="padding">
            <View style={styles.container}>
            <Image style={styles.Image} source={{uri: '../assets/appIcon.png'}}/>
              <Picker selectedValue = {this.state.patientGender} onValueChange = {this.updatePatientGender} style={styles.picker} itemStyle={{height: 100}}> 
                <Picker.Item label="Male" value="male"/>
                <Picker.Item label="Female" value="female"/>
              </Picker>
              <TextInput returnKeyType='done' keyboardType="number-pad" style={styles.inputs} placeholder="Age in Years (yr)" keyboardType="number-pad" maxLength={2} onChangeText={(patientAge) => this.setState({patientAge})} value={this.state.patientAge} />
              <TextInput returnKeyType='done' keyboardType="number-pad" style={styles.inputs} placeholder="Height in Inches (in)" keyboardType="number-pad" maxLength={2} onChangeText={(patientHeight) => this.setState({patientHeight})} value={this.state.patientHeight}/>
              <TextInput returnKeyType='done' keyboardType="number-pad" style={styles.inputs} placeholder="Weight in Pounds (lbs)" keyboardType="number-pad" maxLength={3} onChangeText={(patientWeight) => this.setState({patientWeight})} value={this.state.patientWeight}/>
              <TextInput returnKeyType='done' keyboardType="number-pad" style={styles.inputs} placeholder="Serum Creatinine levels in mg/dl " keyboardType="number-pad" maxLength={3} onChangeText={(patientSCr) => this.setState({patientSCr})} value={this.state.patientSCr}/>
              <TouchableOpacity style={styles.button}
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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      );
    } // end render
  } // end calcInput class

  export default calcInputs;