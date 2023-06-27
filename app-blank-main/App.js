import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from "./src/pages/HomeScreen";
import ProfileScreen from "./src/pages/ProfileScreen";
import LoginScreen from "./src/pages/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuScreen from "./src/components/MenuScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(userToken !== null && typeof userToken === 'string');
    };

    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    // Limpar o token de autenticação no AsyncStorage
    await AsyncStorage.removeItem('userToken');

    // Atualizar o estado de autenticação
    setIsAuthenticated(false);
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={isAuthenticated ? "Home" : "Login"}
        drawerContent={(props) => <MenuScreen {...props} handleLogout={handleLogout}/>}
      >
        <Drawer.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Drawer.Screen name="Home" component={HomeScreen} options={{title: 'Bem vindo'}}/>
        <Drawer.Screen name="Profile" component={ProfileScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
