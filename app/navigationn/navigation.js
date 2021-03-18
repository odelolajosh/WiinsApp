import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHomeLg, faMusic, faCommentsAlt, faTv, faCompass } from '@fortawesome/pro-light-svg-icons'
import { StatusBar } from 'react-native'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import {
    MAIN_FEED,
    MAIN_DISCOVER,
    MAIN_TUBE,
    MAIN_MUSIC,
    MAIN_MESSENGER
} from './constant'

import FeedNavigation from './feed-navigation'
import DiscoverNavigation from './discover-navigation'

const MyTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: 'white',
        background: '#eef2f4',
        card: '#191919',
        text: 'white',
        border: '#191919',
        notification: 'white',
    }
}

const BottomTab = createBottomTabNavigator()

const MainTabNavigation = () => (
    <BottomTab.Navigator
        initialRouteName="Home"
        tabBarOptions={
            {
                showLabel: false,
                activeTintColor: 'black',
                inactiveTintColor: '#ced4d9',
                style: {
                    borderTopLeftRadius: 35,
                    borderTopRightRadius: 35,
                    overflow: 'hidden',
                    backgroundColor: '#ffffff',
                    position: 'absolute',
                    border: 0
                }
            }
        }
    >
        <BottomTab.Screen
            name={MAIN_FEED}
            component={FeedNavigation}
            options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faHomeLg} color={color} size={25} /> }}
        />

        <BottomTab.Screen
            name={MAIN_DISCOVER}
            component={DiscoverNavigation}
            options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faCompass} color={color} size={25} /> }}
        />

        <BottomTab.Screen
            name={MAIN_TUBE}
            component={DiscoverNavigation}
            options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faTv} color={color} size={25} /> }}
        />

        <BottomTab.Screen
            name={MAIN_MUSIC}
            component={DiscoverNavigation}
            options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faMusic} color={color} size={25} /> }}
        />

        <BottomTab.Screen
            name={MAIN_MESSENGER}
            component={DiscoverNavigation}
            options={{ tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faCommentsAlt} color={color} size={25} /> }}
        />

    </BottomTab.Navigator>
)

const MainNavigationContainer = () => (
    <NavigationContainer theme={MyTheme}>
        <StatusBar
            animated={true}
            backgroundColor="white"
            barStyle={'default'}
            showHideTransition={'fade'}
            hidden={false}
        />
        <MainTabNavigation />
    </NavigationContainer>
)

export default MainNavigationContainer