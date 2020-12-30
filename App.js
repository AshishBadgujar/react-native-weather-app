import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import Home from './screens/Home';
import Search from './screens/Search';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator()
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "white",
            inactiveTintColor: "#333",
            activeBackgroundColor: "#333"
          }}
        >
          <Tab.Screen name="home" component={Home}
            initialParams={{ city: "london" }}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home-city" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="search"
            component={Search}
            options={{
              tabBarLabel: 'search',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="city" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
