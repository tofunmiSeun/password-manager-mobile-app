import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import VaultRecordList from './pages/VaultRecordList';
import VaultRecordDetails from './pages/VaultRecordDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={VaultRecordList} />
        <Stack.Screen name="Details" component={VaultRecordDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
