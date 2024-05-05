import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Context } from '../Context/context';
import BuyerDashboard from '../Screens/BuyerDashboard';
import Cart from '../Screens/Cart';
import Profile from '../Screens/profile';
import Addproduct from '../Screens/farmer/Addproduct';
import Farmerdash from '../Screens/farmer/Farmerdash';
import Agronomistdash from '../Screens/Agronome/Agronomistdash';
import Search from '../Screens/Search';
import Chat from '../Screens/farmer/Chat';
import AddBlog from '../Screens/Agronome/AddBlog';
import AgroChat from '../Screens/Agronome/chat';

const Tab = createBottomTabNavigator();

export default function BottomNav() {
    const { isLog, logged, darkmode } = useContext(Context);

    const tabBarStyle = darkmode ? { backgroundColor: '#333333' } : { backgroundColor: '#FFFFFF' };
    const tabBarActiveTintColor = darkmode ? '#4BA26A' : '#4BA26A';
    const tabBarInactiveTintColor = darkmode ? '#AFB2B1' : '#AFB2B1';

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle,
                tabBarLabelStyle: { fontSize: 12 }
            }}
        >
            {
                isLog ? (
                    <>
                        {logged === "farmer" ? (
                            <>
                                <Tab.Screen name="Home" component={Farmerdash} options={{
                                    headerShown: false,
                                    tabBarActiveTintColor,
                                    tabBarInactiveTintColor,
                                    tabBarIcon: ({ focused }) => <Ionicons name="home-outline" color={focused ? tabBarActiveTintColor : tabBarInactiveTintColor} size={20} />
                                }} />
                                <Tab.Screen name="Chat" component={Chat} options={{
                                    headerShown: false,
                                    tabBarActiveTintColor,
                                    tabBarInactiveTintColor,
                                    tabBarIcon: ({ focused }) => <Ionicons name="chatbox-outline" color={focused ? tabBarActiveTintColor : tabBarInactiveTintColor} size={20} />
                                }} />
                                <Tab.Screen name="Add" component={Addproduct} options={{
                                    headerShown: false,
                                    tabBarActiveTintColor,
                                    tabBarInactiveTintColor,
                                    tabBarIcon: ({ focused }) => <MaterialIcons name="add-to-photos" color={focused ? tabBarActiveTintColor : tabBarInactiveTintColor} size={20} />
                                }} />
                                <Tab.Screen name="Profile" component={Profile} options={{
                                    headerShown: false,
                                    tabBarActiveTintColor,
                                    tabBarInactiveTintColor,
                                    tabBarIcon: ({ focused }) => <MaterialIcons name="person-outline" color={focused ? tabBarActiveTintColor : tabBarInactiveTintColor} size={20} />
                                }} />
                            </>
                        ) : null}

                        {logged === "plant pathologist" ? (
                            <>
                                <Tab.Screen name="Home" component={Agronomistdash} options={{
                                    headerShown: false,
                                    tabBarActiveTintColor,
                                    tabBarInactiveTintColor,
                                    tabBarIcon: ({ focused }) => <Ionicons name="home-outline" color={focused ? tabBarActiveTintColor : tabBarInactiveTintColor} size={20} />
                                }} />
                                <Tab.Screen name="Chat" component={AgroChat} options={{
                                    headerShown: false,
                                    tabBarActiveTintColor,
                                    tabBarInactiveTintColor,
                                    tabBarIcon: ({ focused }) => <Ionicons name="chatbox-outline" color={focused ? tabBarActiveTintColor : tabBarInactiveTintColor} size={20} />
                                }} />
                                <Tab.Screen name="Add" component={AddBlog} options={{
                                    headerShown: false,
                                    tabBarActiveTintColor,
                                    tabBarInactiveTintColor,
                                    tabBarIcon: ({ focused }) => <MaterialIcons name="add-to-photos" color={focused ? tabBarActiveTintColor : tabBarInactiveTintColor} size={20} />
                                }} />
                                <Tab.Screen name="Profile" component={Profile} options={{
                                    headerShown: false,
                                    tabBarActiveTintColor,
                                    tabBarInactiveTintColor,
                                    tabBarIcon: ({ focused }) => <MaterialIcons name="person-outline" color={focused ? tabBarActiveTintColor : tabBarInactiveTintColor} size={20} />
                                }} />
                            </>
                        ) : null}

                        {logged === "buyer" ? (
                            <>
                                <Tab.Screen name="Home" component={BuyerDashboard} options={{
                                    headerShown: false,
                                    tabBarActiveTintColor,
                                    tabBarInactiveTintColor,
                                    tabBarIcon: ({ focused }) => <Ionicons name="home-outline" color={focused ? tabBarActiveTintColor : tabBarInactiveTintColor} size={23} />
                                }} />
                                <Tab.Screen name="Search" component={Search} options={{
                                    headerShown: false,
                                    tabBarActiveTintColor,
                                    tabBarInactiveTintColor,
                                    tabBarIcon: ({ focused }) => <Ionicons name="search" color={focused ? tabBarActiveTintColor : tabBarInactiveTintColor} size={23} />
                                }} />
                                <Tab.Screen name="Cart" component={Cart} options={{
                                    headerShown: false,
                                    tabBarActiveTintColor,
                                    tabBarInactiveTintColor,
                                    tabBarIcon: ({ focused }) => <Ionicons name="cart-outline" color={focused ? tabBarActiveTintColor : tabBarInactiveTintColor} size={25} />
                                }} />
                                <Tab.Screen name="Profile" component={Profile} options={{
                                    headerShown: false,
                                    tabBarActiveTintColor,
                                    tabBarInactiveTintColor,
                                    tabBarIcon: ({ focused }) => <MaterialIcons name="person-outline" color={focused ? tabBarActiveTintColor : tabBarInactiveTintColor} size={25} />
                                }} />
                            </>
                        ) : null}
                    </>
                ) : (<></>)
            }
        </Tab.Navigator>
    )
}
