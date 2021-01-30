import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { clearUserToken, isLoggedIn } from './services/OnboardingService';
import { isDeviceRegistered } from './services/DeviceRegistrationService';

import VaultRecordList from './pages/VaultRecordList';
import VaultRecordDetails from './pages/VaultRecordDetails';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const Stack = createStackNavigator();

export default function App() {
  const SIGN_UP = 'SignUp';
  const LOGIN = 'Login';
  const REGISTER_DEVICE = 'RegisterDevice';
  const HOME = 'Home';
  const DETAILS = 'Details';

  const [appIsReady, setAppIsReady] = React.useState(false);
  const [appInitialRouteName, setInitialRouteName] = React.useState(LOGIN);

  React.useEffect(() => {
    checkUserLoggedInStatus();
  }, []);

  const checkUserLoggedInStatus = async () => {
    //await clearUserToken();
    const userIsLoggedIn = await isLoggedIn();
    const deviceIsRegistered = await isDeviceRegistered();

    if (userIsLoggedIn && deviceIsRegistered) {
      setInitialRouteName(HOME);
    } else if (userIsLoggedIn) {
      setInitialRouteName(HOME);
    } else {
      setInitialRouteName(LOGIN);
    }

    setAppIsReady(true);
  }

  return (
    <>
      {appIsReady && <NavigationContainer>
        <Stack.Navigator initialRouteName={appInitialRouteName}>
          <Stack.Screen name={SIGN_UP} component={SignUpPage} />
          <Stack.Screen name={LOGIN} component={LoginPage} />
          <Stack.Screen name={HOME} component={VaultRecordList} />
          <Stack.Screen name={DETAILS} component={VaultRecordDetails} />
        </Stack.Navigator>
      </NavigationContainer>}
    </>
  );
}
