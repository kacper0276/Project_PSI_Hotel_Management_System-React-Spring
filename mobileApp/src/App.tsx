import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {Screens, StackParamList} from './const/Navigation';
import {Home} from './screens';
import {ConfigProvider} from './context/ConfigProvider';
import {NetworkInfoProvider} from './context/NetworkInfoProvider';

const Stack = createNativeStackNavigator<StackParamList>();

const blankPageStyle: NativeStackNavigationOptions = {
  headerShown: false,
};

const App = () => {
  return (
    <NetworkInfoProvider>
      <ConfigProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={Screens.HOME}>
            <Stack.Group>
              <Stack.Screen
                name={Screens.HOME}
                component={Home}
                options={{...blankPageStyle, title: 'Home'}}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </ConfigProvider>
    </NetworkInfoProvider>
  );
};

export default App;
