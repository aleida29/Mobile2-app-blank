import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

const MenuButton = () => {
  const navigation = useNavigation();

  const handleEditUser = () => {
    // Lógica para navegar para a tela de edição do usuário
    navigation.navigate('EditUser');
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <Menu>
      <MenuTrigger>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={handleEditUser} text="Editar Usuário" />
        <MenuOption onSelect={handleLogout} text="Sair" />
      </MenuOptions>
    </Menu>
  );
};

export default MenuButton;
