import React, { Component } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-community/async-storage';

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
      data: [],
      textInputModal: false,
      addTask: '',
      catIndex: -1,
      editInputModal: false,
      editTask: '',
      editIndex: -1,
      editSubIndex: -1,
      dropDown: false,
      listModal: false,
      addList: '',
      move: false,
      today: false
    }
  }

  async componentDidMount() {
    try {
      let value = await AsyncStorage.getItem('MyTask');
      value = JSON.parse(value);

      if (value !== null) {
        // We have data!!
        this.setState({
          data: value
        })
      }
    } catch (error) {
      // Error saving data
      console.log('Error retrieving data');
    }
  }

  handlePress = async (index) => {
    let data = this.state.data;
    data[index].value = data[index].value ? false : true;

    this.setState({data});

    try {
      await AsyncStorage.setItem('MyTask', JSON.stringify(this.state.data));
    } catch (error) {
      // Error saving data
      console.log('Error saving data will unmount');
    }
  }

  handleSubPress = async (index, index2) => {
    let data = this.state.data;
    data[index].value[index2].value = data[index].value[index2].value ? false : true;

    this.setState({data});

    try {
      await AsyncStorage.setItem('MyTask', JSON.stringify(this.state.data));
    } catch (error) {
      // Error saving data
      console.log('Error saving data will unmount');
    }
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

  handleSave = async () => {
    let data = this.state.data;
    let elem = {
      label: this.state.addTask,
      value: false,
      today: this.state.today
    }

    if (this.state.catIndex >= 0) {
      data[this.state.catIndex].value.push(elem);
    } else {
      data.push(elem);
    }

    this.setState({
      data,
      textInputModal: false,
      catIndex: -1,
      today: false,
      dropDown: false
    })

    try {
      await AsyncStorage.setItem('MyTask', JSON.stringify(this.state.data));
    } catch (error) {
      // Error saving data
      console.log('Error saving data will unmount');
    }

    // this.scrollView.scrollToEnd();
  }

  handleCancel = () => {
    this.setState({
      textInputModal: false,
      catIndex: -1,
      addTask: 0,
      dropDown: false
    })
  }

  handleCategoryPress = (index) => {
    this.setState({
      textInputModal: true,
      catIndex: index
    })
  }

  handleEditModal = (index, subIndex = -1) => {
    let editTask = this.state.data[index].label;
    let today = this.state.data[index].today || false;

    if (subIndex >= 0) {
      editTask = this.state.data[index].value[subIndex].label;
      today = this.state.data[index].value[subIndex].today;
    }

    this.setState({
      editInputModal: this.state.editInputModal ? false : true,
      editTask: editTask,
      editIndex: index,
      editSubIndex: subIndex,
      today
    })
  }

  handleEditCancel = () => {
    this.setState({
      editInputModal: false,
    })
  }

  handleEditChange = (text) => {
    this.setState({
      editTask: text
    })
  }

  handleEditSave = async () => {
    let data = this.state.data;

    if (this.state.editSubIndex >= 0) {
      data[this.state.editIndex].value[this.state.editSubIndex].label = this.state.editTask;
      data[this.state.editIndex].value[this.state.editSubIndex].today = this.state.today;
    } else {
      data[this.state.editIndex].label = this.state.editTask;
      data[this.state.editIndex].today = this.state.today;
    }

    this.setState({
      data,
      editTask: '',
      editIndex: -1,
      editSubIndex: -1,
      editInputModal: false,
      today: false
    })

    try {
      await AsyncStorage.setItem('MyTask', JSON.stringify(this.state.data));
    } catch (error) {
      // Error saving data
      console.log('Error saving data will unmount');
    }

  }

  handleDelete = (index, subIndex = -1) => {
    let label = this.state.data[index].label;
    if (subIndex >= 0) {
      label = this.state.data[index].value[subIndex].label;
    }

    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete task/list?\n\n${label}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: async () => {
          let data = this.state.data;

          if (subIndex >= 0) {
            data[index].value.splice(subIndex, 1);
          } else {
            data.splice(index, 1);
          }

          this.setState({data})

          try {
            await AsyncStorage.setItem('MyTask', JSON.stringify(this.state.data));
          } catch (error) {
            // Error saving data
            console.log('Error saving data will unmount');
          }

        }},
      ],
      {cancelable: false},
    );

  }

  handleDropDown = () => {
    this.setState({
      dropDown: this.state.dropDown ? false : true
    })
  }

  handleListModal = () => {
    this.setState({
      listModal: this.state.listModal ? false : true
    })
  }

  handleListCancel = () => {
    this.setState({
      listModal: false,
      addList: '',
      dropDown: false
    })
  }

  handleListSave = async () => {
    let data = this.state.data;
    data.push({
      label: this.state.addList,
      value: []
    })

    this.setState({
      data,
      addList: '',
      listModal: false,
      dropDown: false
    })

    try {
      await AsyncStorage.setItem('MyTask', JSON.stringify(this.state.data));
    } catch (error) {
      // Error saving data
      console.log('Error saving data will unmount');
    }

  }

  handleListChange = (text) => {
    this.setState({
      addList: text
    })
  }

  handleDeleteCompleted = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete all completed tasks?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: async () => {
          let data = this.state.data;
          let deletedItem = data.length;

          data = data.filter((item) => {
            if (typeof item.value === 'object') {
              deletedItem += item.value.length;
              item.value = item.value.filter((item2) => {
                return item2.value === false;
              });

              deletedItem -= item.value.length;
              return item.value;
            } else {
              return item.value === false;
            }
          });

          deletedItem -= data.length;

          this.setState({
            data,
            dropDown: false
          });

          ToastAndroid.show(`${deletedItem} item/s deleted`, ToastAndroid.SHORT);

          try {
            await AsyncStorage.setItem('MyTask', JSON.stringify(this.state.data));
          } catch (error) {
            // Error saving data
            console.log('Error saving data will unmount');
          }

        }},
      ],
      {cancelable: false},
    );
  }

  handleMoveTasks = () => {
    this.setState({
      move: this.state.move ? false : true,
      dropDown: false
    })
  }

  handleCompleteMove = async () => {
    this.setState({
      move: false,
      dropDown: false
    })

    try {
      await AsyncStorage.setItem('MyTask', JSON.stringify(this.state.data));
    } catch (error) {
      // Error saving data
      console.log('Error saving data will unmount');
    }

  }

  handleGoUp = (index, subIndex = -1) => {
    let data = this.state.data;

    if (subIndex >= 0) {
      let data2 = data[index].value;

      let item = data2.splice(subIndex, 1);
      if (subIndex === 0) {
        // put at bottom
        data2.splice(data2.length, 0, item[0]);
      } else {
        data2.splice(subIndex - 1, 0, item[0]);
      }

      data[index].value = data2

    } else {

      let item = data.splice(index, 1);
      if (index === 0) {
        // put at bottom
        data.splice(data.length, 0, item[0]);
      } else {
        data.splice(index - 1, 0, item[0]);
      }
    }

    this.setState({data});
  }

  handleGoDown = (index, subIndex = -1) => {
    let data = this.state.data;

    if (subIndex >= 0) {
      let data2 = data[index].value;

      let item = data2.splice(subIndex, 1);
      if (subIndex === data2.length) {
        data2.splice(0, 0, item[0]);
      } else {
        data2.splice(subIndex + 1, 0, item[0]);
      }

      data[index].value = data2;
    } else {

      // case at the start/end
      let item = data.splice(index, 1);
      if (index === data.length) {
        data.splice(0, 0, item[0]);
      } else {
        data.splice(index + 1, 0, item[0]);
      }
    }

    this.setState({data});
  }

  handleToday = () => {
    this.setState({
      today: this.state.today ? false : true
    });
  }

  render() {
    let stateData = this.state.data;

    let data = stateData.map(function(item, index) {
      // only two levels of category
      if (typeof item.value === 'boolean') {
        return (
          <View style={styles.itemContainer} key={index}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={this.handlePress.bind(this, index)}>
                { item.value === true ?
                  <FontAwesome5 name={'check-square'} solid style={styles.checkBox}/> :
                  <FontAwesome5 name={'square'} style={styles.checkBox}/>
                }
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.handleEditModal.bind(this, index)}
                onLongPress={this.handleDelete.bind(this, index)}
                style={{width: '70%', flexDirection: 'row', justifyContent: 'flex-start'}}
              >
                  <Text>{item.label}</Text>
                  {item.today &&
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>Today</Text>
                    </View>
                  }
              </TouchableOpacity>
            </View>

            {this.state.move &&
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={{marginRight: 15}} onPress={this.handleGoUp.bind(this, index)}>
                    <FontAwesome5 name={'arrow-up'} solid style={{fontSize: 22}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleGoDown.bind(this, index)}>
                    <FontAwesome5 name={'arrow-down'} solid style={{fontSize: 22}}/>
                </TouchableOpacity>
              </View>
            }
          </View>
        )
      } else if (typeof item.value === 'object') {
        let data2 = item.value.map(function(item2, index2) {
          return (
            <View style={styles.categoryContainer} key={index2}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={this.handleSubPress.bind(this, index, index2)}>
                    { item2.value === true ?
                      <FontAwesome5 name={'check-square'} solid style={styles.checkBox}/> :
                      <FontAwesome5 name={'square'} style={styles.checkBox}/>
                    }
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.handleEditModal.bind(this, index, index2)}
                    onLongPress={this.handleDelete.bind(this, index, index2)}
                    style={{width: '70%', flexDirection: 'row', justifyContent: 'flex-start'}}
                  >
                  <Text>{item2.label}</Text>
                    {item2.today &&
                      <View style={styles.tag}>
                        <Text style={styles.tagText}>Today</Text>
                      </View>
                    }
                  </TouchableOpacity>
                </View>

                {this.state.move &&
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{marginRight: 15}} onPress={this.handleGoUp.bind(this, index, index2)}>
                        <FontAwesome5 name={'arrow-up'} solid style={{fontSize: 22}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleGoDown.bind(this, index, index2)}>
                        <FontAwesome5 name={'arrow-down'} solid style={{fontSize: 22}}/>
                    </TouchableOpacity>
                  </View>
                }
              </View>
          )
        }, this);

        return (
          <React.Fragment key={index}>
            <View style={styles.itemCategoryContainer}>
              <TouchableOpacity
                    onPress={this.handleEditModal.bind(this, index)}
                    onLongPress={this.handleDelete.bind(this, index)}
                    style={{width: '70%'}}
                  >
                <Text style={styles.itemCategory}>{item.label}</Text>
              </TouchableOpacity>

                {this.state.move ? (

                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{marginRight: 15}} onPress={this.handleGoUp.bind(this, index)}>
                        <FontAwesome5 name={'arrow-up'} solid style={{fontSize: 22}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleGoDown.bind(this, index)}>
                        <FontAwesome5 name={'arrow-down'} solid style={{fontSize: 22}}/>
                    </TouchableOpacity>
                  </View> ): (

                  <TouchableOpacity onPress={this.handleCategoryPress.bind(this, index)}>
                    <Text style={styles.categoryAdd}>Add
                      <FontAwesome5 name={'plus'} />
                    </Text>
                  </TouchableOpacity>
                )}

              </View>
            {data2}
          </React.Fragment>
        );
      }

    }, this);

    return (
      <View style={styles.view}>

        {/* HEADER */}
        <TouchableOpacity onPress={this.handleDropDown.bind(this)}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>My Tasks</Text>
              <FontAwesome5 name={'ellipsis-v'} style={styles.headerIcon}/>
          </View>
        </TouchableOpacity>

        {/* LIST */}
        <ScrollView
          contentContainerStyle={{zIndex: 1}}
           ref={scrollView => { this.scrollView = scrollView }}
        >
          {data}
        </ScrollView>

        {/* ADD BUTTON */}
        {/* <TouchableOpacity onPress={this.handleModal.bind(this)} style={styles.addButton}>
          <FontAwesome5 name={'plus'} style={styles.plusButton}/>
        </TouchableOpacity>*/}

        { this.state.dropDown &&
          <View style={styles.dropDown}>
            <TouchableOpacity onPress={this.handleListModal}>
              <Text style={styles.dropDownItem}>Add New List</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleModal.bind(this)}>
              <Text style={{...styles.dropDownItem, marginTop: 10}}>Add New Task</Text>
            </TouchableOpacity>

            {this.state.move ? (
              <TouchableOpacity onPress={this.handleCompleteMove}>
                <Text style={{...styles.dropDownItem, marginTop: 10}}>
                  Done Moving
                </Text>
              </TouchableOpacity>
              ) : (
              <TouchableOpacity onPress={this.handleMoveTasks}>
                <Text style={{...styles.dropDownItem, marginTop: 10}}>
                  Move Tasks
                </Text>
              </TouchableOpacity>
              )}

              <TouchableOpacity onPress={this.handleDeleteCompleted}>
                <Text style={{...styles.dropDownItem, marginTop: 10}}>Delete Completed Tasks</Text>
              </TouchableOpacity>
          </View>
        }

        {/* ADD MODAL */}
        { this.state.textInputModal &&
          <View style={styles.modalContainer}>
            <View style={styles.inputContainer}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.addTaskHeader}>
                  {this.state.catIndex !== -1 ? `[${stateData[this.state.catIndex].label}]` : ''} Add Task +
                </Text>
                <TouchableOpacity onPress={this.handleToday.bind(this)} style={{flexDirection: 'row'}}>
                  { this.state.today === true ?
                    <FontAwesome5 name={'check-square'} style={styles.todayCheckBox}/> :
                    <FontAwesome5 name={'square'} style={styles.todayCheckBox}/>
                  }
                  <Text>
                    Today
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.textInput}
                autoFocus={true}
                multiline={true}
                onChangeText={this.handleTextChange}
              />
              <View style={styles.modalActions}>
                <TouchableOpacity
                  onPress={this.handleCancel}
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

        {/* EDIT MODAL */}
        { this.state.editInputModal &&
          <View style={styles.modalContainer}>
            <View style={styles.inputContainer}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.addTaskHeader}>
                  Edit Task
                </Text>
                <TouchableOpacity onPress={this.handleToday.bind(this)} style={{flexDirection: 'row'}}>
                  { this.state.today === true ?
                    <FontAwesome5 name={'check-square'} style={styles.todayCheckBox}/> :
                    <FontAwesome5 name={'square'} style={styles.todayCheckBox}/>
                  }
                  <Text>
                    Today
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.textInput}
                autoFocus={true}
                multiline={true}
                onChangeText={this.handleEditChange}
                value={this.state.editTask}
              />
              <View style={styles.modalActions}>
                <TouchableOpacity
                  onPress={this.handleEditCancel}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={this.handleEditSave}
                >
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }

        {/* ADD LIST */}
        { this.state.listModal &&
          <View style={styles.modalContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.addTaskHeader}>
                Add List +
              </Text>
              <TextInput
                style={styles.textInput}
                autoFocus={true}
                multiline={true}
                onChangeText={this.handleListChange}
              />
              <View style={styles.modalActions}>
                <TouchableOpacity
                  onPress={this.handleListCancel}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={this.handleListSave}
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
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopColor: '#fbceb1',  // apricot
    borderTopWidth: 1,
  },
  categoryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 20,
    borderTopColor: '#fbceb1',  // apricot
    borderTopWidth: 1,
  },
  itemCategoryContainer: {
    backgroundColor: '#fbceb1',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderBottomColor: '#ff8c69',  // salmon
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  },
  dropDown: {
    position: 'absolute',
    top: 55,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    borderColor: '#fbceb1',
    borderWidth: 1
  },
  dropDownItem: {
    borderBottomColor: '#fbceb1',
    borderBottomWidth: 1,
  },
  todayCheckBox: {
    fontSize: 20,
    color: '#ff6347',
    marginRight: 5
  },
  tag: {  // '#ff8c69' '#fbceb1' '#ff6347'
    backgroundColor: '#ff6347',
    borderWidth: 1,
    borderColor: '#ff6347',
    marginLeft: 7,
    borderRadius: 5,
    paddingHorizontal: 5,
    justifyContent: 'center'
  },
  tagText: {
    color: '#fff'
  }
});

export default App;