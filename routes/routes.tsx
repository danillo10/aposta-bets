import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import App from '../App';
import Dashboard from '../pages/dashboard/dashboard';

// Criando um tipo para a lista de nossas rotas
type RootStackParamList = {
  Dashboard: undefined;
  App: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Dashboard'>
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="App" 
          component={App} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
