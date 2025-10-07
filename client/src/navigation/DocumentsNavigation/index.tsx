import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddDocuments from '../../screens/Documents/AddDocuments';

const Stack = createNativeStackNavigator();

export default function DocumentsLayout() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AddDocuments" component={AddDocuments} />
        </Stack.Navigator>
    );
}