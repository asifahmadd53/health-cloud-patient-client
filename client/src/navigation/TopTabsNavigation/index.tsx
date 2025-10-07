import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import UpcomingAppointments from '../../screens/Appointmetns/UpComingAppointments';
import RecentAppointments from '../../screens/Appointmetns/RecentAppointments';
import Header from '../../components/Header';

const Tab = createMaterialTopTabNavigator();

const TopTabsLayout = () => {
    return (
        <>
        <Header title='Appointments'/>
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 16, fontWeight: '600' },
                tabBarIndicatorStyle: { backgroundColor: '#2895cb' },
                tabBarStyle: { backgroundColor: '#fff' },
            }}> 
            <Tab.Screen name="Upcoming" component={UpcomingAppointments} />
            <Tab.Screen name="Recent" component={RecentAppointments} />
        </Tab.Navigator>
        </>
    );
};

export default TopTabsLayout;
