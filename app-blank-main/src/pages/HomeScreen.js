import React, {useEffect, useState} from 'react';
import {Alert, Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import TodoService from "../services/todoService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({navigation}) => {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [user, setUser] = useState({});


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        const user = JSON.parse(userString);
        setUser(user);
      } catch (error) {
        console.log('Erro ao obter dados do usuário:', error);
      }
    };

    fetchUser();
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await TodoService
        .getTodos();
      setTodos(response);
    } catch (error) {
      console.log('Erro ao buscar os TODOs:', error);
    }
  };

  const deleteTodo = async (todo_id) => {
    try {
      await TodoService.deleteTodo(todo_id);
      fetchTodos();
    } catch (error) {
      console.log('Erro ao excluir o TODO:', error);
    }
  };

  const addTodo = async () => {
    try {
      if (editTodoId) {
        await TodoService.updateTodo(editTodoId, { title: todoTitle });
      } else {
        await TodoService.createTodo({ title: todoTitle });
      }
      fetchTodos();
      setModalVisible(false);
      setTodoTitle('');
      setEditTodoId(null);
    } catch (error) {
      console.log('Erro ao adicionar/editar o TODO:', error);
    }
  };

  const renderItem = ({ item }) => {
    const confirmDelete = () => {
      Alert.alert(
        'Confirmação',
        'Tem certeza de que deseja excluir este item?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Excluir', style: 'destructive', onPress: () => deleteTodo(item._id) },
        ]
      );
    };

    return (
      <TouchableOpacity
        style={styles.todoItemContainer}
        onPress={() => {
          setEditTodoId(item._id);
          setTodoTitle(item.title);
          setModalVisible(true);
        }}
      >
        <Text style={styles.todoItemText}>{item.title}</Text>

        {user.type === "admin" &&
          <Button title="Excluir" onPress={confirmDelete} />
        }
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Button
        title="Novo TODO"
        onPress={() => {
          setEditTodoId(null);
          setTodoTitle('');
          setModalVisible(true);
        }}
      />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.title.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={todoTitle}
              onChangeText={(text) => setTodoTitle(text)}
            />

          <View style={styles.modalContentButtons}>
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            <Button onPress={addTodo} title={editTodoId ? 'Editar' : 'Adicionar'} disabled={!editTodoId && todoTitle === ''} />
          </View>
        </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    // marginVertical: 1,
  },
  todoItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  todoItemText: {
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalContentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },

  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  todoText: {
    fontSize: 16,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default HomeScreen;