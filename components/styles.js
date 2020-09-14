import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'skyblue',
      textAlign: "center",
      flexDirection: "column",
    },

    picker: {
      margin: 15,
      height: 100,
      backgroundColor: '#fff',
      borderRadius: 10,
    },
    
    pickerOptions: {
      height: '5px',
    },

    inputs: {
      padding: 20,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
    },
  
    results: {
      fontSize: 16,
      margin: 10,
    },
  
    prescript: {
      fontSize: 14,
      padding: 5,
    },

    button: {
      backgroundColor: '#fff',
      color: "blue",
      padding: 20,
      width: '30%',
      marginLeft: '35%',
      marginTop: 20,
      marginBottom: 10,
      borderRadius: 10,
    },
    Image: {
      height: 100,
      width: 100,
    },

    headers: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 10,
    },
  }); // end styles

export default styles;