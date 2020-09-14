import React, {Component} from 'react';
import {Text, Picker, ScrollView, TouchableOpacity, Switch, Image} from 'react-native';
import calcInputs from './calcInput.js';
import styles from './styles.js';
import prescriptions from './prescriptions.json';

// Class that calculates the Creatine Clearance value based on the input from the user
class Details extends calcInputs {
    state = { 
      patientHeight: this.props.navigation.state.params.resultsHeight,
      patientWeight: this.props.navigation.state.params.resultsWeight,
      patientAge: this.props.navigation.state.params.resultsAge,
      patientGender: this.props.navigation.state.params.resultsGender,
      patientSCr: this.props.navigation.state.params.resultsSCr,
      patientCrCl: '', 
      selectedprescription: 'Cefepime', // Necessary to workaround not selecting a value from the picker. Matches the first value of the picker
      prescriptionsArray: [],
      isHD: false,
    }; // end state

    /***********************************************************************************/

    updateSelectedprescription = (selectedprescription) => {this.setState({ selectedprescription: selectedprescription })}
    toggleHDSwitch = (value) => this.setState({isHD: value});

    /***********************************************************************************/

    // This calculates the CrCl value. 
    componentWillMount() { 
      const kgw = (Number(this.state.patientWeight) / 2.2).toPrecision(5); // Kilograms
      const cm = (Number(this.state.patientHeight) * 2.54).toPrecision(5); // Centimeters
      const bmi = kgw / (Math.pow((cm / 100), 2)).toPrecision(5); // Body Mass Index
      let abw = 0; // Adjusted Body Weight
      let ibw = 0; // Ideal Body Weight
      let crCl = 0; // Creatinine Clearance
      let tempArray = []; // Temporary array to store JSON objects

      if (this.state.patientGender === 'female'){
        ibw = Number((45.5 + (2.3 * (Number(this.state.patientHeight) - 50)))).toPrecision(5);
      }
      else {
        ibw = Number((50 + (2.3 * (Number(this.state.patientHeight) - 50)))).toPrecision(5);
      }

      abw = (Number(ibw) + (0.4 * (kgw - Number(ibw))));

      if (kgw < Number(ibw)) {
        crCl = (((140 - Number(this.state.patientAge)) * kgw) / (72 * Number(this.state.patientSCr)));
      }
      else if (kgw > Number(ibw)) {
        crCl = (((140 - Number(this.state.patientAge)) * Number(ibw)) / (72 * Number(this.state.patientSCr)));
      }
      else if (kgw > Number(ibw * 1.3)) {
        crCl = (((140 - Number(this.state.patientAge)) * Number(abw)) / (72 * Number(this.state.patientSCr)));
      }

      if (this.state.patientGender === 'female') {
        crCl = Number(crCl) * 0.85;
      }

      prescriptions["prescription"].forEach(element => tempArray.push(element));
      this.setState({prescriptionsArray: [...this.state.prescriptionsArray, ...tempArray]});
      this.setState((state, props) => ({patientCrCl: Number(crCl).toPrecision(4) }));
    } // end componentWillMount

    /***********************************************************************************/

    // Output render of the calculated Creatine Clearance value.
    render () { 
      return (
        <ScrollView contentContainerStyle={{justifyContent: "center"}} style={styles.container}> 
          <Image style={styles.Image} source={{uri: '../assets/appIcon.png'}}/>
          <Text style={styles.headers}>Gender: </Text>
          <Text style={styles.results}>{this.state.patientGender}</Text>
          <Text style={styles.headers}>Age: </Text>
          <Text style={styles.results}>{this.state.patientAge}</Text>
          <Text style={styles.headers}>Height: </Text>
          <Text style={styles.results}>{this.state.patientHeight}</Text>
          <Text style={styles.headers}>Weight: </Text>
          <Text style={styles.results}>{this.state.patientWeight}</Text>
          <Text style={styles.headers}>SCr: </Text>
          <Text style={styles.results}>{this.state.patientSCr}</Text>
          <Text style={styles.headers}>CrCl: </Text>
          <Text style={styles.results}>{this.state.patientCrCl}</Text>
          <Picker selectedValue = {this.state.selectedprescription} onValueChange = {this.updateSelectedprescription} style={styles.picker} itemStyle={{height: 100}}> 
            {this.state.prescriptionsArray.map(prescription => {return <Picker.Item label={prescription["prescriptionName"]} value={prescription["prescriptionName"]}/>})}
          </Picker>
          <Text style={styles.headers}>Is HD: </Text>
          <Switch trackColor={{false: "#330000", true: "#000033"}} onValueChange={this.toggleHDSwitch} value={this.state.isHD}/>
          <TouchableOpacity style={styles.button} 
            onPress={() => {this.props.navigation.navigate('prescriptionInfo', {
              resultsSelectedprescription: this.state.selectedprescription,
              resultsCrCl: this.state.patientCrCl,
              resultsIsHD: this.state.isHD,
              });
            }}
            underlayColor='#ddd'>
            <Text style={{textAlign: 'center'}} >Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('Home')}} underlayColor='#ddd'>
            <Text style={{textAlign: 'center'}}>Return</Text>
        </TouchableOpacity>
        </ScrollView>
      );
    } // end render
  } // end Details class

  export default Details;