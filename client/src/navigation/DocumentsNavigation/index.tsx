import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddDocuments from '../../screens/Documents/AddDocuments';
import AllReports from '../../screens/Documents/AllReports';
import AllPrescriptions from '../../screens/Documents/AllPrescriptions';

const Stack = createNativeStackNavigator();

export default function DocumentsLayout() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AddDocuments" component={AddDocuments} />
            <Stack.Screen name="AllReports" component={AllReports} />
            <Stack.Screen name="AllPrescriptions" component={AllPrescriptions} />
        </Stack.Navigator>
    );
}