import React, { Component } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class App extends Component {
  constructor(props) {
    super(props);

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
        label: 'Sleep',
        value: true
      },
      {
        label: 'Browse Internet',
        value: false
      },
      {
        label: 'Shower',
        value: false
      },
      {
        label: 'Eat',
        value: [{
            label: 'Rice',
            value: false
          },
          {
            label: 'Soup',
            value: true
          },
          {
            label: 'Chicken',
            value: true
          },
          {
            label: 'Vegetable',
            value: true
          },
          {
            label: 'Beef',
            value: true
          }
        ],
      }
    ]

    this.state = {
      data,
      textInputModal: true,
      addTask: ''
    }
  }

  handlePress = (index) => {
    let data = this.state.data;
    data[index].value = data[index].value ? false : true;

    this.setState({data});
  }

  handleSubPress = (index, index2) => {
    let data = this.state.data;
    data[index].value[index2].value = data[index].value[index2].value ? false : true;

    this.setState({data});
  }

  handleModal = () => {
    this.setState({
      textInputModal: this.state.textInputModal ? false : true
    })
  }

  handleTextChange = (text) => {
    this.setState({
      addTask: text
    })
  }

  handleSave = () => {
    let data = this.state.data;
    data.push({
      label: this.state.addTask,
      value: false
    });

    this.setState({
      data,
      textInputModal: false
    })
  }

  render() {
    let data = this.state.data.map(function(item, index) {
      // only two levels of category
      if (typeof item.value === 'boolean') {
        return item.value === true ? (
          <View style={styles.itemContainer} key={index}>
            <TouchableOpacity onPress={this.handlePress.bind(this, index)}>
              <FontAwesome5 name={'check-square'} solid style={styles.checkBox}/>
            </TouchableOpacity>
            <Text style={styles.strikeThrough}>{item.label}</Text>
          </View>
        ) : (
          <View style={styles.itemContainer} key={index}>
            <TouchableOpacity onPress={this.handlePress.bind(this, index)}>
              <FontAwesome5 name={'square'} style={styles.checkBox}/>
            </TouchableOpacity>
            <Text>{item.label}</Text>
          </View>
        )
      } else if (typeof item.value === 'object') {
        let data2 = item.value.map(function(item2, index2) {
          return item2.value === true ? (
            <View style={{...styles.itemContainer, ...styles.categoryContainer}} key={index2}>
              <TouchableOpacity onPress={this.handleSubPress.bind(this, index, index2)}>
                <FontAwesome5 name={'check-square'} solid style={styles.checkBox}/>
              </TouchableOpacity>
              <Text style={styles.strikeThrough}>{item2.label}</Text>
            </View>
          ) : (
            <View style={{...styles.itemContainer, ...styles.categoryContainer}} key={index2}>
              <TouchableOpacity onPress={this.handleSubPress.bind(this, index, index2)}>
                <FontAwesome5 name={'square'} style={styles.checkBox}/>
              </TouchableOpacity>
              <Text>{item2.label}</Text>
            </View>
          )
        }, this);

        return (
          <React.Fragment key={index}>
            <View style={styles.itemCategoryContainer}>
              <Text style={styles.itemCategory}>{item.label}</Text>
            </View>
            {data2}
          </React.Fragment>
        );
      }

    }, this);

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

        {/* ADD BUTTON */}
        <TouchableOpacity onPress={this.handleModal.bind(this)} style={styles.addButton}>
          <FontAwesome5 name={'plus'} style={styles.plusButton}/>
        </TouchableOpacity>

        { this.state.textInputModal &&
          <View style={styles.modalContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.addTaskHeader}>Add Task +</Text>
              <TextInput
                style={styles.textInput}
                autoFocus={true}
                multiline={true}
                onChangeText={this.handleTextChange}
              />
              <View style={styles.modalActions}>
                <TouchableOpacity
                  onPress={this.handleModal}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={this.handleSave}
                >
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
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
    backgroundColor: '#ff6347', // tomato
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
    borderTopColor: '#fbceb1',  // apricot
    borderTopWidth: 1,
  },
  categoryContainer: {
    paddingHorizontal: 30
  },
  itemCategoryContainer: {
    backgroundColor: '#fbceb1',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderBottomColor: '#ff8c69',  // salmon
    borderBottomWidth: 1,
  },
  itemCategory: {
    fontWeight: 'bold'
  },
  textInput: {
    borderColor: '#ff6347',
    borderWidth: 1,
    paddingHorizontal: 15,
    height: 40,
    paddingVertical: 0
  },
  addButton: {
    backgroundColor: '#ff6347',
    position: 'absolute',
    bottom: 15,
    right: 10,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 50,
    zIndex: 4
  },
  plusButton: {
    color: '#fff',
    fontSize: 20,
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  inputContainer: {
    backgroundColor: '#fafafa',
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: '80%',
    borderRadius: 5
  },
  addTaskHeader: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textInput: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingVertical: 0,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  cancelButton: {
    borderColor:'#ff6347',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2
  },
  cancelText: {
    color: '#ff6347'
  },
  saveButton: {
    backgroundColor:'#ff6347',
    borderWidth: 1,
    borderColor: '#ff6347',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 2
  },
  saveText: {
    color: '#fff'
  }
});

export default App;