import React, { Component } from 'react';
import {
  CheckBox,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
// import {
//   Header,
// } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Icon from 'react-native-vector-icons/Ionicons';

class App extends Component {
  render() {
    return (
      <View style={styles.view}>

        {/* HEADER */}
        <View style={styles.headerContainer}>
            <View style={styles.headerSubContainer}>
              <Text style={styles.headerTitle}>My Tasks</Text>
              <FontAwesome5 name={'ellipsis-v'} style={styles.headerIcon}/>
            </View>
        </View>

        {/* LIST */}
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.itemContainer}>
              <FontAwesome5 name={'square'} style={styles.checkBox}/>
              <Text>Hello World</Text>
          </View>
          <View style={styles.itemContainer}>
              <FontAwesome5 name={'check-square'} solid style={styles.checkBox}/>
              <Text>Hello World</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    view: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      color: '#fff',
      fontSize: 20
    },
    headerIcon: {
      fontSize: 20,
      color: '#fff'
    },
    headerContainer: {
      flexDirection: 'row',
      backgroundColor: '#ff6347',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15
    },
    headerSubContainer : {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    checkBox: {
      fontSize: 20,
      color: '#ff6347'
    },
    scrollView: {
      backgroundColor: 'blue',
    },
    itemContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: 10,
      borderColor: '#fbceb1',
      borderWidth: 1,
    }

});

export default App;