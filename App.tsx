/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import Home from './screen/Home';
import Calendar from './screen/Calendar';
import Library from './screen/Library';
import MyPage from './screen/MyPage';
import Icon from 'react-native-vector-icons/Ionicons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

const Nav = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Nav.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '600',
            marginBottom: 7,
          },

          tabBarIconStyle: {
            marginTop: 5,
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: '#777777',
          tabBarStyle: {
            borderTopColor: '#dbdbdb',
            borderTopWidth: 0.5,
          },
          headerLeftContainerStyle: {
            paddingLeft: 30,
          },
          headerRightContainerStyle: {
            paddingRight: 30,
          },
          header: () => null,
        }}>
        <Nav.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                color={focused ? 'black' : '#777777'}
                size={20}
              />
            ),
          }}
        />
        <Nav.Screen
          name="Calendar"
          component={Calendar}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'calendar' : 'calendar-outline'}
                color={focused ? 'black' : '#777777'}
                size={20}
              />
            ),
          }}
        />
        <Nav.Screen
          name="Library"
          component={Library}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'barbell' : 'barbell-outline'}
                color={focused ? 'black' : '#777777'}
                size={20}
              />
            ),
          }}
        />
        <Nav.Screen
          name="MyPage"
          component={MyPage}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'person' : 'person-outline'}
                color={focused ? 'black' : '#777777'}
                size={20}
              />
            ),
          }}
        />
      </Nav.Navigator>
    </NavigationContainer>
  );
};

export default App;
