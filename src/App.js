import * as React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UserService from './services/UserService';
import DeviceService from './services/DeviceService';

import LoginPage from './pages/onboarding/LoginPage';
import SignUpPage from './pages/onboarding/SignUpPage';
import DeviceRecoveryPage from './pages/onboarding/DeviceRecoveryPage';
import DeviceRegistrationPage from './pages/onboarding/DeviceRegistrationPage';
import ProvideMasterPasswordPage from './pages/onboarding/ProvideMasterPasswordPage';
import HomePage from './pages/HomePage';

const Stack = createStackNavigator();

export default function App() {
  const SIGN_UP = 'SignUp';
  const LOGIN = 'Login';
  const RECOVER_DEVICE = 'RecoverDevice';
  const REGISTER_DEVICE = 'RegisterDevice';
  const PROVIDE_MASTER_PASSWORD = 'ProvideMasterPassword';
  const HOME = 'Home';

  const [appIsReady, setAppIsReady] = React.useState(false);
  const [appInitialRouteName, setInitialRouteName] = React.useState(LOGIN);

  React.useEffect(() => {
    checkUserLoggedInStatus();
  }, []);

  const checkUserLoggedInStatus = async () => {
    const userIsLoggedIn = await UserService.isLoggedIn();
    const deviceIsRegistered = await DeviceService.isDeviceRegistered();

    if (userIsLoggedIn && deviceIsRegistered) {
      setInitialRouteName(PROVIDE_MASTER_PASSWORD);
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
          <Stack.Screen name={PROVIDE_MASTER_PASSWORD} component={ProvideMasterPasswordPage} />
          <Stack.Screen name={HOME} component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>}
    </SafeAreaView>
  );
}
