import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import AsyncStorage from "@react-native-async-storage/async-storage";

const MenuScreen = ({navigation, handleLogout}) => {
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
  }, []);

  const handleMenuLogout = async () => {
    try {
      // Limpar o token de autenticação no AsyncStorage
      await AsyncStorage.removeItem('userToken');
      // Redirecionar para a tela de login
      navigation.navigate('Login');
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
    }
    handleLogout()
  };

  return (
    <DrawerContentScrollView>
      <View style={{padding: 16}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 16}}>Menu</Text>
        {/*<DrawerItemList {...props} />*/}
      </View>
      {user &&
      <View style={{ borderTopWidth: 1, borderTopColor: 'lightgray', padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
          Olá {user.firstName} {user.lastName}
        </Text>
      </View>
      }
      <View style={{borderTopWidth: 1, borderTopColor: 'lightgray', padding: 16}}>
        <DrawerItem
          label="Logout"
          onPress={handleMenuLogout}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default MenuScreen;
