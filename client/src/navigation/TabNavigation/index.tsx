import React from 'react';
import {  Image, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notifications from '../../screens/Tabs/Notifications';
import MyFamily from '../../screens/Tabs/MyFamily';
import Icons from '../../utils/libs/constants/Icons';
import DashBoard from '../../screens/Tabs/Dashboard';

const Tab = createBottomTabNavigator();

const TabLayout = () => {


  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Custom Header
      <View className="absolute top-3 left-3 right-0 z-30 p-4">
        <CustomHeader />
      </View> */}

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            padding:10,
            height: 58,
            paddingBottom: 4,
            paddingTop: 5,
            backgroundColor: '#f8f9fa',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIconStyle: {
            width: 24,
            height: 24,
          },
          tabBarActiveTintColor:'#2895cb'
        }}
      >
        <Tab.Screen
          name="Clinc"
          component={DashBoard}
          options={{
            tabBarIcon: () => <Image className="w-6 h-6" source={Icons.home} />,
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Appointments"
          component={Notifications}
          options={{
            tabBarIcon: () => <Image className="w-6 h-6" source={Icons.home} />,
            tabBarLabel: 'Appointments',
          }}
        />
        <Tab.Screen
          name="MyFamily"
          component={MyFamily}
          options={{
            tabBarIcon: () => <Image className="w-8 h-8" source={Icons.user} />,
            tabBarLabel: 'My Family',
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabLayout;
