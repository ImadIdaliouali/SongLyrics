import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, DetailsScreen, ArtistScreen } from './src/screens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="details" component={DetailsScreen} />
        <Stack.Screen name="artist" component={ArtistScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
