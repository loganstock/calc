import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Picker, Button, ScrollView} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

class calcInputs extends Component { // This class probably should be split into an input class and an calculation class. Eh, oh well
  state = { // I may be using states wrong but I need to save the values of the original input and the calcuated values to be outputed into Details. Any help here is appreciated
    patientGender: 'male',
    patientAge: '',
    patientHeight: '', 
    patientWeight: '',
    patientSCr: '',
  };

  updatePatientGender = (patientGender) => {this.setState({ patientGender: patientGender })}

  calculateCrCl = () => { // This calculates the CrCl value. Attached is an excel spreadsheet with the formula that me and Branden got to work as well as an pdf with all the prescriptions. The pdf is the first set of perscriptions and more are planned according to Branden
    kg = Number(this.state.patientWeight) / 2.2 // kilograms
    cm = Number(this.state.patientHeight) * 2.54 // centimeters
    bmi = kg / ((cm / 100) ^ 2) // body mass index
    abw = bmi + (0.4 * (cm - bmi)) // abjusted body weight
  
  
    if (this.state.patientGender = 'male') {
      ibw = 50 + (2.3 * (Number(this.state.patientHeight) - 50)) // ideal body weight
      
      if (kg < ibw) {
          crCl = (((140 - Number(this.state.patientAge)) * kg) / (72 * Number(this.state.patientSCr)))
      }
      else {
          crCl = (((140 - Number(this.state.patientAge)) * ibw) / (72 * Number(this.state.patientSCr)))
      }
      if (kg > (ibw * 1.3)) {
          crCl = ((140 - Number(this.state.patientAge)) * abw) / (72 * Number(this.state.patientSCr))
      }
    }
  
    if (this.state.patientGender = 'female') { // similar to the male calculations for crcl execpt the vales is 85% of the males. See spreadsheet for more information.
      ibw = 45.5 + (2.3 * (Number(this.state.patientHeight) - 50)) // ideal body weight
      
      if (kg < ibw) {
          crCl = (((140 - Number(this.state.patientAge)) * kg) / (72 * Number(this.state.patientSCr)) * 0.85)
      }
      else {
          crCl = ((((140 - Number(this.state.patientAge)) * ibw) / (72 * Number(this.state.patientSCr))) * 0.85)
      }
      if (kg > (ibw * 1.3)) {
          crCl = (((140 - Number(this.state.patientAge)) * abw) / (72 * Number(this.state.patientSCr)) * 0.85)
      }
    }

    // Output based on the CrCl calculation. This is going to be hefty
    // Currently have working on how to get the text to the current part of the Details class
    // Not sure what to do with the HD column on each prescription. I assume it means "High Dosage". I am not sure

    // Cefepime
    if (crCl > 60) { // greater than 60ml/min CrCl for Cefepime
      // return "2gm q8h" to 'PSA, bacteremia' row
      // return "2gm q12h" to 'SSTI' row
      // return "1gm q12" to 'UTI' row
    }
    if (crCl >= 30 && crCl <= 60) { // between 60ml/min and 30ml/min CrCl for Cefepime
      // return "2gm q12h" to 'PSA, bacteremia' row
      // return "2gm q24h" to 'SSTI' row
      // return "1gm q24h" to 'UTI' row
    }
    if (crCl >= 11 && crCl <= 29) { // between 29ml/min and 11ml/min CrCl for Cefepime
      // return "2gm q24h" to 'PSA, bacteremia' row
      // return "1gm q24h" to 'SSTI' row
      // return "500mg q24h" to 'UTI' row
    }
    if (crCl < 11) { // less than 11ml/min CrCl for Cefepime
      // return "1gm q24h" to 'PSA, bacteremia' row
      // return "500mg q24h" to 'SSTI' row
      // return "250mg q24h" to 'UTI' row
    }
    // end Cefepime

    /****************************************************************************************************/
    
    // Cefoxitin
    if (crCl > 50) { // greater than 50ml/min CrCl for Cefoxitin
      // return "2gm q6-8h" to 'Mod-Severe Infection' row
      // return "1gm q6-8h" to 'Uncomplicated Infection' row
    }
    if (crCl >= 30 && crCl <= 50) { // between 50ml/min and 30ml/min CrCl for Cefoxitin
      // return "2gm q8-12h" to 'Mod-Severe Infection' row
      // return "1gm q8-12h" to 'Uncomplicated Infection' row
    }
    if (crCl >= 10 && crCl <= 29) { // between 29ml/min and 10ml/min CrCl for Cefoxitin
      // return "2gm q12-24h" to 'Mod-Severe Infection' row
      // return "1gm q12-24h" to 'Uncomplicated Infection' row
    }
    if (crCl >= 5 && crCl <= 9) { // between 9ml/min and 5ml/min CrCl for Cefoxitin
      // return "1gm q12-24h" to 'Mod-Severe Infection' row
      // return "500mg q12-24h" to 'Uncomplicated Infection' row
    }
    if (crCl < 5) { // less than 5ml/min CrCl for Cefoxitin
      // return "1gm q24-48h" to 'Mod-Severe Infection' row
      // return "500mg q24-48h" to 'Uncomplicated Infection' row
    }
    // end Cefoxitin

    /****************************************************************************************************/

    // Cefpodoxime (PO)
    if (crCl > 30) { // greater than 30ml/min CrCl for  Cefpodoxime (PO)
      // return "400mg q12h" to 'SSTI' row
      // return "200mg q12h" to 'CAP/Sinusitis' row
      // return "100gm q12h" to 'UTI/Pharyngitis' row
    }
    if (crCl < 30) { // less than 30ml/min CrCl for  Cefpodoxime (PO)
      // return "400mg q24h" to 'SSTI' row
      // return "200mg q24h" to 'CAP/Sinusitis' row
      // return "100mg q24h" to 'UTI/Pharyngitis' row
    }
    // end Cefpodoxime (PO)
    
    /****************************************************************************************************/

    // Ceftaroline
    if (crCl > 50) { // greater than 50ml/min CrCl for Ceftaroline
      // return "600mg q12h" to 'blank' row
    }
    if (crCl >= 30 && crCl <= 50) { // between 50ml/min and 30ml/min CrCl for Ceftaroline
      // return "400mg q12h" to 'blank' row
    }
    if (crCl >= 15 && crCl < 30) { // between 30ml/min and 15ml/min CrCl for Ceftaroline
      // return "300mg q12h" to 'blank' row
    }
    if (crCl < 15) { // less athan 5ml/min CrCl for Ceftaroline
      // return "200mg q12h" to 'blank' row
    }
    // end Ceftaroline

    /****************************************************************************************************/

    // Ceftazidime
    if (crCl > 50) { // greater than 50ml/min CrCl for Ceftazidime
      // return "2gm q8h" to 'Severe Infections, PSA' row
      // return "1gm q8h" to 'Mild-mod infections' row
    }
    if (crCl >= 30 && crCl <= 50) { // between 50ml/min and 30ml/min CrCl for Ceftazidime
      // return "2gm q12h" to 'Severe Infections, PSA' row
      // return "1gm q12h" to 'Mild-mod infections' row
    }
    if (crCl >= 10 && crCl <= 29) { // between 29ml/min and 10ml/min CrCl for Ceftazidime
      // return "2gm q24h" to 'Severe Infections, PSA' row
      // return "1gm q24h" to 'Mild-mod infections' row
    }
    if (crCl >= 5 && crCl <= 9) { // between 9ml/min and 5ml/min CrCl for Ceftazidime
      // return "1gm q24h" to 'Severe Infections, PSAn' row
      // return "500mg q12h" to 'Mild-mod infections' row
    }
    if (crCl < 5) { // less than 5ml/min CrCl for Ceftazidime
      // return "1gm q48h" to 'Severe Infections, PSA' row
      // return "500mg q48h" to 'Mild-mod infections' row
    }
    // end Ceftazidime

    /****************************************************************************************************/

    // Cefuroxime (PO)
    if (crCl > 30) { // greater than 30ml/min CrCl for Cefuroxime (PO)
      // return "500mg q12h" to 'Bronchitis/SSTI' row
      // return "250mg q12h" to 'UTI/Sinusitis' row
    }
    if (crCl >= 10 && crCl <= 30) { // between 30ml/min and 10ml/min CrCl for Cefuroxime (PO)
      // return "500mg q24h" to 'Bronchitis/SSTI' row
      // return "250mg q24h" to 'UTI/Sinusitis' row
    }
    if (crCl < 10) { // less than 10ml/min CrCl for Cefuroxime (PO)
      // return "500mg q48h" to 'Bronchitis/SSTI' row
      // return "250mg q48h" to 'UTI/Sinusitis' row
    }
    // end Cefuroxime (PO)

    /****************************************************************************************************/

    // Cefuroxime (IV/IM)
    if (crCl > 20) { // greater than 20ml/min CrCl for Cefuroxime (IV/IM)
      // return "1.5g q6-8h" to 'Septicemia, menigitis, intra-abdominal, bone & joint' row
      // return "750mg q8h" to 'SSTI, UTI' row
    }
    if (crCl >= 20 && crCl <= 10) { // between 20ml/min and 10ml/min CrCl for Cefuroxime (IV/IM)
      // return "1.5gm q12h" to 'Septicemia, menigitis, intra-abdominal, bone & join' row
      // return "750mg q8h" to 'SSTI, UTI' row
    }
    if (crCl < 10) { // less than 10ml/min CrCl for Cefuroxime (IV/IM)
      // return "1.5gm q24h" to 'Septicemia, menigitis, intra-abdominal, bone & join' row
      // return "750mg q24h" to 'SSTI, UTI' row
    }
    // end Cefuroxime (IV/IM)

    /****************************************************************************************************/

    // Cephalexin (PO)
    if (crCl > 50) { // greater than 50ml/min CrCl for Cephalexin (PO)
      // return "500mg q6h" to 'SSTI, Group A Strep' row
      // return "250mg q6h" to 'Pharyngitis, UTI' row
    }
    if (crCl >= 10 && crCl <= 50) { // between 50ml/min and 10ml/min CrCl for Cephalexin (PO)
      // return "500mg q8-12h" to 'SSTI, Group A Strep' row
      // return "250mg q8-12h" to 'SSTI, UTI' row
    }
    if (crCl < 10) { // less than 10ml/min CrCl for Cephalexin (PO)
      // return "500mg q12-24h" to 'SSTI, Group A Strep' row
      // return "250mg q12-24h" to 'SSTI, UTI' row
    }
    // end Cephalexin (PO)

    // End Page 1
    
    /****************************************************************************************************/
  }

  render() { // This is the input section of the app. I need to fix the ScrollView to actually scroll on this class and Details class. 
    return (
     <ScrollView style={styles.container}>
        <Text style={styles.headers}>Gender</Text>
        <Picker selectedValue = {this.state.patientGender} onValueChange = {this.updatePatientGender}> 
          <Picker.Item label="Male" value="male"/>
          <Picker.Item label="Female" value="female"/>
        </Picker> 
        <Text style={styles.headers}>Age: </Text>
        <TextInput style={styles.headers} placeholder="Age in Years (yr)" keyboardType="number-pad" maxLength={2} onChangeText={(patientAge) => this.setState({patientAge})} value={this.state.patientAge} />
        <Text style={styles.headers}>Height: </Text>
        <TextInput style={styles.headers} placeholder="Height in Inches (in)" keyboardType="number-pad" maxLength={2} onChangeText={(patientHeight) => this.setState({patientHeight})} value={this.state.patientHeight}/>
        <Text style={styles.headers}>Weight: </Text>
        <TextInput style={styles.headers} placeholder="Weight in Pounds (lbs)" keyboardType="number-pad" maxLength={3} onChangeText={(patientWeight) => this.setState({patientWeight})} value={this.state.patientWeight}/>
        <Text style={styles.headers}>SCr: </Text>
        <TextInput style={styles.headers} placeholder="Serum Creatinine levels in mg/dl " keyboardType="number-pad" maxLength={3} onChangeText={(patientSCr) => this.setState({patientSCr})} value={this.state.patientSCr}/>
        <Text></Text>
        <Button color='#BBBBBB' title="Calculate" onPress={() => { this.calculateCrCl; this.props.navigation.navigate('Details', {
              resultsGender: this.state.patientGender,
              resultsAge: this.state.patientAge,
              resultsHeight: this.state.patientHeight,
              resultsWeight: this.state.patientWeight,
              resultsSCr: this.state.patientSCr,
            });}}></Button>
     </ScrollView>
    );
  }
}

/****************************************************************************************************/

class Details extends calcInputs { // This is the output of the calculation from calcInputs. This needs to be cleaned up. Any better way for this part is appreciated

  render () { // The first part is for testing to see original inputs and see the calculated values. This is for testing and can be removed for a clean build. Also need to fix ScrollView to actually scroll
    
    const recievedParams = this.props.navigation.state.params;
    
    return ( // The second part is the crcl values of each perscription. Currently the goal is to take the values calculated from calcInputs and return them in the second part. I am having problems here.
      <ScrollView style={styles.container}> 
        <Text style={styles.headers}>Gender: </Text>
        <Text style={styles.results}>{recievedParams.resultsGender}</Text>
        <Text style={styles.headers}>Age: </Text>
        <Text style={styles.results}>{recievedParams.resultsAge}</Text>
        <Text style={styles.headers}>Height: </Text>
        <Text style={styles.results}>{recievedParams.resultsHeight}</Text>
        <Text style={styles.headers}>Weight: </Text>
        <Text style={styles.results}>{recievedParams.resultsWeight}</Text>
        <Text style={styles.headers}>SCr: </Text>
        <Text style={styles.results}>{recievedParams.resultsSCr}</Text>
        <Text style={styles.headers}>Body Mass Index: </Text>
        <Text style={styles.results}></Text>
        <Text style={styles.headers}>Adjusted Body Weight: </Text>
        <Text style={styles.results}></Text>
        <Text style={styles.headers}>IBW: </Text>
        <Text style={styles.results}>}</Text>
        <Text style={styles.headers}>CrCl: </Text>
        <Text style={styles.results}></Text>
        <Text></Text> 
        <Text style={styles.headers}>Perscrpition Information</Text>
        <Text style={styles.results}>Cefepime:</Text>
        <Text style={styles.perscript}>PSA, bacteremia, febrile neutropenia:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>SSTI, inta-abdominal:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>UTI:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Cefoxin:</Text>
        <Text style={styles.perscript}>Mod-Severe Infection:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>Uncomplicated Infection:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Cefpodoxime (PO):</Text>
        <Text style={styles.perscript}>SSTI:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>CAP/Sinusitis:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>UTI/Pharyngitis:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Ceftaroline:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Ceftazidme:</Text>
        <Text style={styles.perscript}>Severe infections, PSA:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>Mild-mod infections:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Cefurozime (PO):</Text>
        <Text style={styles.perscript}>Bronchitis/SSTI:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>UTI/Sinusitis:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Cefuroxime (IV/IM):</Text>
        <Text style={styles.perscript}>Septicemia, mengingitis, intra-abdominal, bone and joint:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>SSTI, UTI:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Cephalexin (PO):</Text>
        <Text style={styles.perscript}>SSTI, Group A Strep:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>Pharyngitis, UTI:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Ciprofloxacin (PO):</Text>
        <Text style={styles.perscript}>Mod/Severe Infection:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>Uncomplicated UTI:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Ciprofloxacin (IV):</Text>
        <Text style={styles.perscript}>HCAP/Febrile neutropenia:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>Mild/Mod Infection:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Clarithromycin (PO):</Text>
        <Text style={styles.perscript}>COPD exacerbation (H flu), CAP:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>CAP, SSTI, COPD (M. cat and S. pneumo):</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Enoxaparin:</Text>
        <Text style={styles.perscript}>Prophylaxis:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>Treatment:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Ertapenem:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Famotidine:</Text>
        <Text style={styles.perscript}>SUP, GERD:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Fluconazole:</Text>
        <Text style={styles.perscript}>Candidemia:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>UTI:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>Esophageal candidiasis:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>Thrush:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Fondaparinux:</Text>
        <Text style={styles.perscript}>Prophylaxis:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>Treamment:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Levofloxaxcin:</Text>
        <Text style={styles.perscript}>HAP, CAP, Intra-abdominal:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>UTI:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Meropenem:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Nitrofuratoin:</Text>
        <Text style={styles.perscript}>UTI:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Oseltamivir:</Text>
        <Text style={styles.perscript}>Treatment dosage:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Piperacillin / Taxobactam:</Text>
        <Text style={styles.perscript}>HCAP/PSA:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>blank:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>SMX/TMP (PO) Bactrim:</Text>
        <Text style={styles.perscript}>UTI, GI, SSTI:</Text>
        <Text style={styles.perscript}></Text>
        <Text style={styles.perscript}>PCP prophylaxis:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>SMX/TMP (IV) Bactrim:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
        <Text style={styles.results}>Telavancin:</Text>
        <Text style={styles.perscript}></Text>
        <Text></Text>
      </ScrollView>
    );
  }
}

/****************************************************************************************************/

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

const styles = StyleSheet.create({ // Just the stylesheet. Feel free to edit this to your desire. Functionality is more important at this point.
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 15
  },

  headers: {
    fontSize: 20,
    padding: 5
  },

  inputs: {
    padding: 5
  },

  results: {
    fontSize: 16,
    padding: 5
  },

  perscript: {
    fontSize: 14,
    padding: 5
  }
});