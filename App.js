import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View, Modal } from 'react-native';

export default function App() {
  const [textItem, setTextItem] = useState('');
  const [itemList, setItemList] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalNewValueVisible, setmodalNewValueVisible] = useState(false);
  const [newItemValue, setNewItemValue] = useState('');

  const onChangeTextHandler = (text) =>  {
    //console.log(text)
    setTextItem(text);
  }

  const addItemToList = () => {
    if(textItem != ''){
      setItemList(prevItemList => [...prevItemList,{id: Math.random().toString() , value:textItem}]);
    }
    setTextItem('');
    //console.log(itemList)
  }

  const changeNewItemValue = (text) => {
    setNewItemValue(text);
  }

  const renderListItem = ({item}) => {
    return (
      <View style={styles.itemList}>
        <Text>{item.value}</Text>
        <View>
          <Button title='editar' onPress={() => clickOnActionUpdate(item.id)}/>
          <Button title='x' onPress={() => clickOnActionDelete(item.id)}/>
        </View>
      </View>
    )
  }

  const deleteItemHandler = () => {
    setItemList(itemList.filter((item)=>item.id!==itemSelected.id))
    setModalVisible(!modalVisible)
  }

  const clickOnActionDelete = (id) => {
    setModalVisible(!modalVisible)
    setItemSelected(itemList.find(item=>item.id===id))
  }

  const clickOnActionUpdate = (id) => {
    setItemSelected(itemList.find(item=>item.id===id))
    setNewItemValue(itemSelected.value)
    setmodalNewValueVisible(!modalNewValueVisible)
  }

  const updateValueHandler = () => {
    if(newItemValue != ''){
      objIndex = itemList.findIndex((obj => obj.id == itemSelected.id));
      auxList = itemList;
      auxList[objIndex].value = newItemValue;
  
      setItemList(auxList)

      setNewItemValue('');
      setmodalNewValueVisible(!modalNewValueVisible)
    }
  }
  
  return (
    <>
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.textInput} 
          placeholder="Ingresar Tarea"
          onChangeText={onChangeTextHandler}
          value={textItem}
          />
        <Button 
          title='Agregar' 
          color="#841584"
          onPress={addItemToList}/>
      </View>
      {/* <View>
        {itemList.map(el => <View key={el.id}><Text>{el.value}</Text></View>)}
      </View> */}
      <FlatList
        data={itemList}
        renderItem={renderListItem}
        keyExtractor={item=>item.id}>
      </FlatList>
    </View>
    <Modal animationType='slide' visible={modalVisible}>
      <View style={styles.modalMessageContainer}>
        <Text>Se eliminará: </Text>
        <Text>{itemSelected.value}</Text>
      </View>
      <View style={styles.modalButtonContainer}>
          <Button 
          title='Cancelar' 
          color="#ccc"
          onPress={()=>setModalVisible(!modalVisible)}/>
          <Button 
          title='Si, eliminar'
          onPress={deleteItemHandler}/>
      </View>
    </Modal>
    <Modal animationType='slide' visible={modalNewValueVisible}>
      <View style={styles.modalMessageContainer}>
        <Text>Nuevo valor: </Text>
        <TextInput 
          style={styles.textInput} 
          placeholder="Ingresar Tarea"
          onChangeText={changeNewItemValue}
          />
      </View>
      <View style={styles.modalButtonContainer}>
          <Button 
          title='Cancelar' 
          color="#ccc"
          onPress={()=>setmodalNewValueVisible(!modalNewValueVisible)}/>
          <Button 
          title='Actualizar'
          onPress={updateValueHandler}/>
      </View>
    </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:30
  },
  inputContainer:{
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  textInput:{
    width:200,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  itemList:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    pading:10,
    margin:10,
    backgroundColor:'#a2d2ff',
    borderRadius:10
  },
  modalMessageContainer:{
    marginVertical: 50,
    alignItems: 'center'
  },
  modalButtonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20
  }
});
