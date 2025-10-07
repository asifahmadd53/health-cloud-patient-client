import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Image,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icons from '../../utils/libs/constants/Icons';
import AddReports from './AddReports';
import DoctorPrescriptions from './DoctorPrescriptions';
import Header from '../../components/Header';

type Tab = 'reports' | 'prescription';

export default function AddDocuments() {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = React.useState<Tab>('reports');
    const [tabWidth, setTabWidth] = useState(0);

    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (tabWidth <= 0) return;     
        Animated.spring(slideAnim, {
            toValue: activeTab === 'reports' ? 0 : 1,
            useNativeDriver: false,
            friction: 8,
            tension: 70,
        }).start();
    }, [activeTab, tabWidth]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Header title="Add Documents" />
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
            >
                <ScrollView
                    className="px-5 pt-6"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >
            <View className="mt-8 self-center w-full px-2">
                <View
                    className="relative flex-row bg-gray-100 rounded-full p-1 overflow-hidden"
                    onLayout={(e) => {
                        const full = e.nativeEvent.layout.width;
                        if (full > 0) setTabWidth(full / 2);
                    }}
                >
                    {/* slider */}
                    {tabWidth > 0 && (
                        <Animated.View
                            style={{
                                transform: [
                                    {
                                        translateX: slideAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, tabWidth],
                                        }),
                                    },
                                ],
                                width: tabWidth,
                            }}
                            className="absolute px-2 top-1 bottom-1 bg-white rounded-full shadow-md"
                        />
                    )}

                    {/* tabs */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setActiveTab('reports')}
                        className="flex-1 py-2 items-center z-10"
                    >
                        <Text
                            className={`font-semibold text-sm ${activeTab === 'reports' ? 'text-secondary' : 'text-gray-500'
                                }`}
                        >
                            My Reports
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setActiveTab('prescription')}
                        className="flex-1 py-2 items-center z-10"
                    >
                        <Text
                            className={`font-semibold text-sm ${activeTab === 'prescription' ? 'text-secondary' : 'text-gray-500'
                                }`}
                        >
                            Doctor Prescription
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* ---------- content ---------- */}
            <View className="flex-1 mt-6">
                {activeTab === 'reports' ? <AddReports /> : <DoctorPrescriptions />}
            </View>
            
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}