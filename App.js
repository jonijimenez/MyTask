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
    let items = Array(100).fill(0).map((item, index) => {
        return (
          <View style={styles.itemContainer} key={index}>
              <FontAwesome5 name={'square'} style={styles.checkBox}/>
              <Text>Hello World</Text>
          </View> )
    });

    return (
      <View style={styles.view}>

        {/* HEADER */}
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>My Tasks</Text>
            <FontAwesome5 name={'ellipsis-v'} style={styles.headerIcon}/>
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
          {/*items*/}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    view: {
      flex: 1
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
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15
    },
    checkBox: {
      fontSize: 20,
      color: '#ff6347',
      marginRight: 10
    },
    scrollView: {
    },
    itemContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderTopColor: '#fbceb1',
      borderTopWidth: 1,
    }

});

export default App;