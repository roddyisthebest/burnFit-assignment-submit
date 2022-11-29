import React from 'react';
import Home from './screen/Home';
import Calendar from './screen/Calendar';
import Library from './screen/Library';
import MyPage from './screen/MyPage';
import Icon from 'react-native-vector-icons/Ionicons';
import store from './store';
import {Provider} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const Nav = createBottomTabNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
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
              //   headerTitle: () => (

              //   ),
              //   headerLeft: () => (

              //   ),
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
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
