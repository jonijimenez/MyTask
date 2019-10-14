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

    // let data = {
    //   'Hello': false,
    //   'Work' : {
    //     'List Documents': false,
    //     'Type Data': true
    //   },
    //   'Shower': false,
    //   'Exercise' : {
    //     'Stretching': false,
    //     'Push Ups': true
    //   },
    //   Eat: true,
    //   Hello: true
    // }

    let data = [
      {
        label: 'Hello',
        value: false
      },
      {
        label: 'Work',
        value: [{
            label: 'List Documents',
            value: false
          },
          {
            label: 'Type Data',
            value: true
          },
        ]
      },
      {
        label: 'Shower',
        value: false
      },
      {
        label: 'Exercise',
        value: [{
            label: 'Stretching',
            value: false
          },
          {
            label: 'Push Ups',
            value: true
          }
        ],
      },
      {
        label: 'Eat',
        value: true
      }
    ]

    this.state = {
      data
    }

    // this.renderItem = this.renderItem.bind(this);
  }

  // renderItem(value) {
  //   if (value === true) {
  //     return
  //   }
  // }


  render() {
    let data = this.state.data.map(function(item, index) {
      // only two levels of category
      if (typeof item.value === 'boolean') {
        return item.value === true ? (
          <View style={styles.itemContainer} key={index}>
            <FontAwesome5 name={'check-square'} solid style={styles.checkBox}/>
            <Text style={styles.strikeThrough}>{item.label}</Text>
          </View>
        ) : (
          <View style={styles.itemContainer} key={index}>
            <FontAwesome5 name={'square'} style={styles.checkBox}/>
            <Text>{item.label}</Text>
          </View>
        )
      } else if (typeof item.value === 'object') {
        let data2 = item.value.map(function(item2, index2) {
          return item2.value1 === true ? (
            <View style={{...styles.itemContainer, ...styles.categoryContainer}} key={index2}>
              <FontAwesome5 name={'check-square'} solid style={styles.checkBox}/>
              <Text style={styles.strikeThrough}>{item2.label}</Text>
            </View>
          ) : (
            <View style={{...styles.itemContainer, ...styles.categoryContainer}} key={index2}>
              <FontAwesome5 name={'square'} style={styles.checkBox}/>
              <Text>{item2.label}</Text>
            </View>
          )
        });

        return (
          <React.Fragment key={index}>
            <View style={styles.itemCategoryContainer}>
              <Text style={styles.itemCategory}>{item.label}</Text>
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
      marginRight: 15
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