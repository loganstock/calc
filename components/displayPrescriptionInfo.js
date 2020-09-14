import React, {Component} from 'react';
import {Text, ScrollView, Picker, TouchableOpacity, Image} from 'react-native';
import calcInputs from './calcInput.js';
import styles from './styles.js';
import prescriptions from './prescriptions.json'

// Class that displays the Creatine Clearance values and retrieves values of the prescription that has been selected
class prescriptionInfo extends calcInputs { 
  state = {
    patientprescription: this.props.navigation.state.params.resultsSelectedprescription,
    patientCrCl: this.props.navigation.state.params.resultsCrCl,
    returnedIsHD: this.props.navigation.state.params.resultsIsHD,
    prescriptionBranches: [],
    prescriptionDosage: [],
    selectedBranch: '',
    selectedDosage: '',
  }; // end state

  /***********************************************************************************/

  // Function that updates the dosage value based on the selected picker value
  updateSelectedBranch(indexCondition) {
    this.state.prescriptionBranches.map( (v, i) => {
      if (indexCondition == i) {
        this.setState({
          selectedDosage: this.state.prescriptionDosage[indexCondition], 
          selectedBranch: this.state.prescriptionBranches[indexCondition],
        })
      }
    });
  } // end updateSelectedBranch

  /***********************************************************************************/

  // Finds prescription information based on calculated Creatine Clearance values and returned selected precriptions
  componentWillMount() {
    let tempArray = [];
    let valueArray = [];
    let dosageStorageValue = 0;
    let branchArray = [];
    let branchArrayName = '';
    let branchArrayValue = '';
    
    prescriptions["prescription"].forEach(element => tempArray.push(element));

    // This is the logic that dynamically retrieves information from the json file
    // It is a bit of a mess, but functions as intended
    for (let index1 = 0; index1 < tempArray.length; index1++) {

      
      if (this.state.patientprescription === tempArray[index1].prescriptionName) {
        
        // If the HD switch returns true, return only HD values
        // Will override and return the HD values if the switch is toggled
        if (this.state.returnedIsHD == true) {
          tempArray[index1].branch.forEach(objHD => branchArray.push(objHD));
          this.setState({returnedIsHD: 'true'});

          for (let indexHD = 0; indexHD < branchArray.length; indexHD++) {
            branchArrayName = branchArray[indexHD].branchName;
            branchArrayValue = branchArray[indexHD].hdDosageValues;
            this.state.prescriptionBranches.push(branchArrayName);
            this.state.prescriptionDosage.push(branchArrayValue);

            // Safety net for prescriptions with a single branch, will return the first dosage value
            this.setState({selectedDosage: this.state.prescriptionDosage[0]});
          }
          break;
        } // end retrieveing HD values

        /***********************************************************************************/
        
        this.setState({returnedIsHD: 'false'});
        tempArray[index1].crclValues.forEach(value => valueArray.push(value));

        // Retrieve dosage values based on calculated Creatine Clearance value
        for (let index2 = 0; index2 <= valueArray.length; index2++) {
          dosageStorageValue = Number(valueArray[index2]);
          
          if (this.state.patientCrCl > dosageStorageValue) {
            tempArray[index1].branch.forEach(obj => branchArray.push(obj));
            
            for (let index3 = 0; index3 < branchArray.length; index3++) {
              branchArrayName = branchArray[index3].branchName;
              branchArrayValue = branchArray[index3].dosageValues[index2];

              this.state.prescriptionBranches.push(branchArrayName);
              this.state.prescriptionDosage.push(branchArrayValue); 

              // Safety net for prescriptions with a single branch, will return the first dosage value
              this.setState({selectedDosage: this.state.prescriptionDosage[0]});                    
            }
            break;
          } // end retrieveing dosage values

          // If calculated Creatine Clearance value is below the last value on the table, then return the lowest dosage values
          // This is the safety net as a value will always be returned
          if (index2 === valueArray.length) {
            tempArray[index1].branch.forEach(objLast => branchArray.push(objLast));
            
            for (let index3 = 0; index3 < branchArray.length; index3++) {
              branchArrayName = branchArray[index3].branchName;
              branchArrayValue = branchArray[index3].dosageValues[index2];

              this.state.prescriptionBranches.push(branchArrayName);
              this.state.prescriptionDosage.push(branchArrayValue); 
              
              // Safety net for prescriptions with a single branch, will return the first dosage value
              this.setState({selectedDosage: this.state.prescriptionDosage[0]});                       
            }
            break;
          } 
        } // end lowest retrieved dosage values
      }
    }
  } // end componentWillMount

  /***********************************************************************************/

  // Output render of the selected prescription and dosage value
  render () {
    return (
      <ScrollView contentContainerStyle={{justifyContent: "center"}} style={styles.container}>
        <Image style={styles.Image} source={{uri: '../assets/appIcon.png'}}/>        
        <Text style={styles.headers}>Patient CrCl</Text>
        <Text style={styles.results}>{this.state.patientCrCl}</Text>
        <Text style={styles.headers}>Selected prescription</Text>
        <Text style={styles.results}>{this.state.patientprescription}</Text>
        <Text style={styles.headers}>Is HD?</Text>
        <Text style={styles.results}>{this.state.returnedIsHD}</Text>
        <Text style={styles.headers}>Branches</Text>
        <Picker selectedValue = {this.state.selectedBranch} onValueChange = {(selectedPickerValue, pickerIndex) => this.updateSelectedBranch(pickerIndex)} style={styles.picker} itemStyle={{height: 100}}>
          {this.state.prescriptionBranches.map(branch => {return <Picker.Item label={branch} value={branch}/>})}
        </Picker>
        <Text style={styles.headers}>Dosage Value</Text>
        <Text style={styles.results}>{this.state.selectedDosage}</Text>
        <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('Home')}} underlayColor='#ddd'>
          <Text style={{textAlign: 'center'}}>Return</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('Details')}} underlayColor='#ddd'>
          <Text style={{textAlign: 'center'}}>Previous</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  } // end render
} // end prescriptionInfo class

export default prescriptionInfo;