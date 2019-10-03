import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Picker, Button, ScrollView} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import calcInputs from './calcInput.js';
import styles from './styles.js';

class Details extends calcInputs { // This is the output of the calculation from calcInputs. This needs to be cleaned up. Any better way for this part is appreciated
    state = { // I may be using states wrong but I need to save the values of the original input and the calcuated values to be outputed into Details. Any help here is appreciated
      patientHeight: this.props.navigation.state.params.resultsHeight,
      patientWeight: this.props.navigation.state.params.resultsWeight,
      patientAge: this.props.navigation.state.params.resultsAge,
      patientGender: this.props.navigation.state.params.resultsGender,
      patientSCr: this.props.navigation.state.params.resultsSCr,
      patientBMI: '',
      patientABW: '',
      patientIBW: '',
      patientCrCl: '',
    };

    componentDidMount() { // This calculates the CrCl value. Attached is an excel spreadsheet with the formula that me and Branden got to work as well as an pdf with all the prescriptions. The pdf is the first set of perscriptions and more are planned according to Branden
      const kgw = (Number(this.state.patientWeight) / 2.2).toPrecision(5); // kilograms
      const cm = Number(this.state.patientHeight) * 2.54; // centimeters
      const bmi = kgw / ((cm / 100) ^ 2); // body mass index
      let abw = 0; //adjusted body weight
      let ibw = 0; // ideal body weight
      let crCl = 0;

      ibw = Number((50 + (2.3 * (this.state.patientHeight - 60)))).toPrecision(5);
      abw = Number(ibw) + (0.4 * (kgw - Number(ibw)));

      if (kgw > (ibw * 1.3)) {
        crCl = (140 - Number(this.state.patientAge)) * abw;
      }
      else if (kgw < ibw) {
        crCl = (140 - Number(this.state.patientAge)) * kgw;
      }
      else {
        crCl = (140 - Number(this.state.patientAge)) * ibw;
      }

      crCl = crCl / (72 * Number(this.state.patientSCr));
    
      if (this.state.patientGender === 'female') { // similar to the male calculations for crcl execpt the vales is 85% of the males. See spreadsheet for more information.
        crCl = crCl * 0.85;
      }

      this.setState({ patientABW: Number(abw).toPrecision(4) });
      this.setState({ patientIBW: Number(ibw).toPrecision(4) });
      this.setState({ patientBMI: Number(bmi).toPrecision(4) });
      this.setState({ patientCrCl: Number(crCl).toPrecision(4) });
    }

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
          <Text style={styles.results}>{this.state.patientBMI}</Text>
          <Text style={styles.headers}>Adjusted Body Weight: </Text>
          <Text style={styles.results}>{this.state.patientABW}</Text>
          <Text style={styles.headers}>IBW: </Text>
          <Text style={styles.results}>{this.state.patientIBW}</Text>
          <Text style={styles.headers}>CrCl: </Text>
          <Text style={styles.results}>{this.state.patientCrCl}</Text>
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

  export default Details;