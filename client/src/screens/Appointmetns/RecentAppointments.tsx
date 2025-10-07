import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import AppointmentCard from '../../components/AppointmentCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecentAppointments = () => {
    const RECENT_DATA = [6, 7, 8, 9, 10];

    return (
        <SafeAreaView className="flex-1 bg-white">
            
                <ScrollView
                    className="px-5 pt-6"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >
                    {RECENT_DATA.map((item) => (
                        <View key={item}>
                            <AppointmentCard />
                        </View>
                    ))}
                </ScrollView>
        </SafeAreaView>
    );
};

export default RecentAppointments;
