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
import Header from '../../components/Header';
import Icons from '../../utils/constants/Icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import AddReports from './AddReports';
import DoctorPrescriptions from './DoctorPrescriptions';
import { useDocumentUploader } from '../../hooks/useDocumentUploader';

type Tab = 'reports' | 'prescription';

export default function AddDocuments() {
    const [tabWidth, setTabWidth] = useState(0);

    const slideAnim = useRef(new Animated.Value(0)).current;
    const [activeTab, setActiveTab] = useState<Tab>('reports');

    /* bottom-sheet ref -------------------------------------------------- */
    const bottomSheetRef = useRef<BottomSheet>(null);

    /* which uploader is active? ----------------------------------------- */
    const reportUploader = useDocumentUploader('REPORT');
    const prescriptionUploader = useDocumentUploader('PRESCRIPTION');

    const currentUploader = activeTab === 'reports' ? reportUploader : prescriptionUploader;


    const closeSheet = () => bottomSheetRef.current?.close();

    const onFile = (asset: { uri: string; name: string; type: string }) => {
        currentUploader.add(asset);
        closeSheet();
    };

    useEffect(() => {
        if (tabWidth <= 0) return;

        Animated.spring(slideAnim, {
            toValue: activeTab === 'reports' ? 0 : 1,
            useNativeDriver: false,
        }).start();
    }, [activeTab, tabWidth]);


    const openCamera = () => {
        launchCamera({ mediaType: 'photo' }, (r) => {
            if (!r.didCancel && r.assets?.[0]) onFile(r.assets[0]);
        });
    };

    const openGallery = () => {
        launchImageLibrary({ mediaType: 'photo' }, (r) => {
            if (!r.didCancel && r.assets?.[0]) onFile(r.assets[0]);
        });
    };

    const openBottomSheet = () => {
        bottomSheetRef.current?.expand();
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Header title="Add Documents" />

            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    className="px-5 pt-6"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >
                    {/* Tabs */}
                    <View className="mt-8 self-center w-full px-2">
                        <View
                            className="relative flex-row bg-gray-100 rounded-full p-1"
                            onLayout={(e) => {
                                const full = e.nativeEvent.layout.width;
                                if (full > 0) setTabWidth(full / 2);
                            }}
                        >
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
                                    className="absolute top-1 bottom-1 bg-white rounded-full shadow-md"
                                />
                            )}

                            <TouchableOpacity
                                className="flex-1 items-center py-2 z-10"
                                onPress={() => setActiveTab('reports')}
                            >
                                <Text
                                    className={`font-semibold text-sm ${activeTab === 'reports' ? 'text-secondary' : 'text-gray-500'
                                        }`}
                                >
                                    My Reports
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="flex-1 items-center py-2 z-10"
                                onPress={() => setActiveTab('prescription')}
                            >
                                <Text
                                    className={`font-semibold text-sm ${activeTab === 'prescription'
                                            ? 'text-secondary'
                                            : 'text-gray-500'
                                        }`}
                                >
                                    Doctor Prescription
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Tab Content */}
                    <View className="flex-1 mt-6">
                        {activeTab === 'reports' ? (
                            <AddReports onBrowse={openBottomSheet} />
                        ) : (
                            <DoctorPrescriptions onBrowse={openBottomSheet} />
                        )}
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={['25%']}
                index={-1}
                enablePanDownToClose
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                        pressBehavior="close"   // ← Close on outside click
                    />
                )}
            >
                <BottomSheetView style={{ padding: 20 }}>
                    <TouchableOpacity
                        className="flex-row items-center py-4"
                        onPress={openCamera}
                    >
                        <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-4">
                            <Image className="w-6 h-6" source={Icons.camera} />
                        </View>
                        <Text className="text-base">Take Photo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-row items-center py-4"
                        onPress={openGallery}
                    >
                        <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-4">
                            <Image className="w-6 h-6" source={Icons.gallery} />
                        </View>
                        <Text className="text-base">Choose from Gallery</Text>
                    </TouchableOpacity>
                </BottomSheetView>
            </BottomSheet>
        </SafeAreaView>
    );
}
