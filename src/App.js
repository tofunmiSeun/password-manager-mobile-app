import * as React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UserService from './services/UserService';
import DeviceService from './services/DeviceService';

import VaultPage from './pages/VaultPage';
import VaultRecordDetails from './pages/VaultRecordDetails';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DeviceRecoveryPage from './pages/DeviceRecoveryPage';
import DeviceRegistrationPage from './pages/DeviceRegistrationPage';

const Stack = createStackNavigator();

export default function App() {
  const SIGN_UP = 'SignUp';
  const LOGIN = 'Login';
  const RECOVER_DEVICE = 'RecoverDevice';
  const REGISTER_DEVICE = 'RegisterDevice';
  const HOME = 'Home';
  const DETAILS = 'Details';

  const [appIsReady, setAppIsReady] = React.useState(false);
  const [appInitialRouteName, setInitialRouteName] = React.useState(LOGIN);

  React.useEffect(() => {
    checkUserLoggedInStatus();
  }, []);

  const checkUserLoggedInStatus = async () => {
    const userIsLoggedIn = await UserService.isLoggedIn();
    const deviceIsRegistered = await DeviceService.isDeviceRegistered();

    if (userIsLoggedIn && deviceIsRegistered) {
      setInitialRouteName(HOME);
    } else if (userIsLoggedIn) {
      setInitialRouteName(RECOVER_DEVICE);
    } else {
      setInitialRouteName(LOGIN);
    }

    setAppIsReady(true);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {appIsReady && <NavigationContainer>
        <Stack.Navigator initialRouteName={appInitialRouteName} screenOptions={{ headerShown: false }}>
          <Stack.Screen name={SIGN_UP} component={SignUpPage} />
          <Stack.Screen name={LOGIN} component={LoginPage} />
          <Stack.Screen name={RECOVER_DEVICE} component={DeviceRecoveryPage} />
          <Stack.Screen name={REGISTER_DEVICE} component={DeviceRegistrationPage} />
          <Stack.Screen name={HOME} component={VaultPage} options={{ headerShown: true, title: 'Vaults' }} />
          <Stack.Screen name={DETAILS} component={VaultRecordDetails} />
        </Stack.Navigator>
      </NavigationContainer>}
    </SafeAreaView>
  );
}
