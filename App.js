import React, { Component } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class App extends Component {
  constructor(props) {
    super(props);

    let data = {
      'Hello': false,
      'Work' : {
        'List Documents': false,
        'Type Data': true
      },
      'Shower': false,
      'Exercise' : {
        'Stretching': false,
        'Push Ups': true
      },
      Eat: true
    }

    this.state = {
      data
    }
  }

  render() {

    let data = Object.entries(this.state.data).map(function([key, value], index) {
      // only two levels of category
      if (typeof value === 'boolean') {
        return value === true ? (
          <View style={styles.itemContainer} key={index}>
            <FontAwesome5 name={'check-square'} solid style={styles.checkBox}/>
            <Text style={styles.strikeThrough}>{key}</Text>
          </View>
        ) : (
          <View style={styles.itemContainer}>
            <FontAwesome5 name={'square'} style={styles.checkBox}/>
            <Text>{key}</Text>
          </View>
        )
      } else if (typeof value === 'object') {
        let data2 = Object.entries(value).map(function([key1, value1], index2) {
          return value1 === true ? (
            <View style={{...styles.itemContainer, ...styles.categoryContainer}} key={index2}>
              <FontAwesome5 name={'check-square'} solid style={styles.checkBox}/>
              <Text style={styles.strikeThrough}>{key1}</Text>
            </View>
          ) : (
            <View style={{...styles.itemContainer, ...styles.categoryContainer}} key={index2}>
              <FontAwesome5 name={'square'} style={styles.checkBox}/>
              <Text>{key1}</Text>
            </View>
          )
        });

        return (
          <React.Fragment key={key}>
            <View style={styles.itemCategoryContainer}>
              <Text style={styles.itemCategory}>{key}</Text>
            </View>
            {data2}
          </React.Fragment>
        );
      }
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
          {/* <View style={styles.itemContainer}>
              <FontAwesome5 name={'square'} style={styles.checkBox}/>
              <Text>Hello World</Text>
          </View>

          <View style={styles.itemContainer}>
              <FontAwesome5 name={'check-square'} solid style={styles.checkBox}/>
              <Text>Hello World</Text>
          </View>

          <View style={styles.itemCategoryContainer}>
            <Text style={styles.itemCategory}>Work</Text>
          </View>
          <View style={{...styles.itemContainer, ...styles.categoryContainer}}>
              <FontAwesome5 name={'check-square'} solid style={styles.checkBox}/>
              <Text>Hello World</Text>
          </View>
           <View style={{...styles.itemContainer, ...styles.categoryContainer}}>
              <FontAwesome5 name={'check-square'} solid style={styles.checkBox}/>
              <Text>Hello World</Text>
          </View>

           <View style={styles.itemContainer}>
              <FontAwesome5 name={'check-square'} solid style={styles.checkBox}/>
              <Text>Hello World</Text>
          </View>

          <View style={styles.itemCategoryContainer}>
            <Text style={styles.itemCategory}>School</Text>
          </View>
          <View style={{...styles.itemContainer, ...styles.categoryContainer}}>
              <FontAwesome5 name={'check-square'} solid style={styles.checkBox}/>
              <Text>Hello World</Text>
          </View>
           <View style={{...styles.itemContainer, ...styles.categoryContainer}}>
              <FontAwesome5 name={'check-square'} solid style={styles.checkBox}/>
              <Text>Hello World</Text>
          </View>*/}

          {data}

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
    strikeThrough: {
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
      color: 'gray'
    },
    itemContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderTopColor: '#fbceb1',
      borderTopWidth: 1,
    },
    categoryContainer: {
      paddingHorizontal: 30
    },
    itemCategoryContainer: {
      backgroundColor: '#fbceb1',
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderBottomColor: '#ff8c69',
      borderBottomWidth: 1,
    },
    itemCategory: {
      fontWeight: 'bold'
    }

});

export default App;