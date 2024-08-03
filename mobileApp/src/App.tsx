import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {Screens, StackParamList} from './const/Navigation';
import {Home} from './screens';

const Stack = createNativeStackNavigator<StackParamList>();

const blankPageStyle: NativeStackNavigationOptions = {
  headerShown: false,
};

const App = () => {
  return (
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
  );
};

export default App;
