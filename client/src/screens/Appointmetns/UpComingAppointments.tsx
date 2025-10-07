import React from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    View,
    Platform
} from 'react-native';

import AppointmentCard from '../../components/AppointmentCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';

const UpcomingAppointments = () => {
    const UPCOMING_DATA = [1, 2, 3, 4, 5];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView
                    className="px-5 pt-6"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >
                    {UPCOMING_DATA.map((item) => (
                        <View key={item}>
                            <AppointmentCard />
                        </View>
                    ))}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default UpcomingAppointments;
