import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({ // Just the stylesheet. Feel free to edit this to your desire. Functionality is more important at this point.
    container: {
      flex: 1,
      backgroundColor: 'skyblue',
      textAlign: "center",
    },

    picker: {
      margin: 15,
      height: 100,
      backgroundColor: '#fff',
      borderRadius: 10
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
      borderRadius: 10
    },
  
    results: {
      fontSize: 16,
      padding: 5
    },
  
    perscript: {
      fontSize: 14,
      padding: 5
    },

    button: {
      backgroundColor: '#fff',
      color: "blue",
      padding: 20,
      width: '30%',
      marginLeft: '35%',
      marginTop: 20,
      borderRadius: 10
    },
    Image: {
      height: 100,
      width: 100,
    }
  });

export default styles;