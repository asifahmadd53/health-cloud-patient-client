import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    Platform,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Header from '../../components/Header';
import { profileSchema } from '../../validators/profileValidator';
import { createPatientProfile, getPatientProfile, updatePatientProfile } from '../../services/patientServices';
import Images from '../../utils/constants/Images';
import Icons from '../../utils/constants/Icons';
import BottomSheet, {
    BottomSheetView,
    BottomSheetFlatList,
} from '@gorhom/bottom-sheet';

type Gender = 'Male' | 'Female' | '';
type Marital = 'Single' | 'Married' | '';

type FormValues = z.infer<typeof profileSchema> & {
    gender?: Gender;
    marital?: Marital;
    dob?: Date;
    location?: string;
    email?: string;
    age?: number;
    disease?: string[];
};

const fakeLocation = '';

const EditProfile = () => {
    const navigation = useNavigation<any>();
    const [showCal, setShowCal] = useState(false);
    const [loading, setLoading] = useState(false);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [sheetTitle, setSheetTitle] = useState('');
    const [sheetData, setSheetData] = useState<string[]>([]);
    const [sheetField, setSheetField] = useState('');

    const closeSheet = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            setSheetTitle('');
            setSheetData([]);
            setSheetField('');
        }
    }, []);

    const cities = [
        'Karachi',
        'Lahore',
        'Islamabad',
        'Rawalpindi',
        'Faisalabad',
        'Multan',
        'Peshawar',
        'Quetta',
        'Hyderabad',
    ];

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: 'Muhammad Asif',
            gender: '',
            marital: '',
            dob: undefined,
            location: fakeLocation,
        },
    });

    const gender = watch('gender') as Gender;
    const marital = watch('marital') as Marital;
    const dob = watch('dob');
    const location = watch('location');

    const formatDate = (d: Date | undefined) =>
        d ? d.toLocaleDateString() : 'Select date';

    const openCitySelector = () => {
        setSheetTitle('Select City');
        setSheetData(cities);
        setSheetField('location');
        bottomSheetRef.current?.snapToIndex(0);
    };

    const renderSingleItem = ({ item }: { item: string }) => (
        <TouchableOpacity
        activeOpacity={.90}
            className="py-3"
            onPress={() => {
                setValue('location', item);
                closeSheet();
            }}
        >
            <Text className="text-base text-gray-700">{item}</Text>
        </TouchableOpacity>
    );

    useEffect(() => {
        (async () => {
            try {
                const profile = await getPatientProfile();
                if (profile) {
                    setValue('name', profile.name);
                    setValue('gender', profile.gender);
                    setValue('marital', profile.maritalStatus);
                    setValue('dob', profile.dob ? new Date(profile.dob) : undefined);
                    setValue('location', profile.location);
                }
            } catch (err) {
                console.log('Failed to load profile', err);
            }
        })();
    }, []);

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        try {
            await updatePatientProfile({
                name: data.name,
                gender: data.gender,
                maritalStatus: data.marital,
                location: data.location,
                dob: data.dob,
            });
            navigation.navigate('drawer');
        } catch (err: any) {
            Alert.alert('Error', err?.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };



    return (
        <SafeAreaView className="flex-1 bg-white">
            <Header title="OTP Verification" />
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
                    {/* Avatar */}
                    <View className="items-center my-6">
                        <View className="relative">
                            <Image
                                className="w-24 h-24 rounded-full bg-primary"
                                resizeMode="contain"
                                source={Images.manAvatar}
                            />
                            <TouchableOpacity
                                activeOpacity={0.85}
                                className="absolute -bottom-1 -right-1 w-8 h-8 bg-secondary rounded-full items-center justify-center border-2 border-white"
                            >
                                <Image
                                    className="w-4 h-4 tint-white"
                                    source={Icons.edit_text}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Full Name */}
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CustomInput
                                label="Full Name"
                                placeholder="Enter your full name"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                    {errors.name && (
                        <Text className="text-red-500 text-xs mt-1">
                            {errors.name.message}
                        </Text>
                    )}

                    {/* Gender */}
                    <Text className="text-sm font-medium text-gray-700 my-3">
                        Gender
                    </Text>
                    <View className="flex-row gap-3">
                        {(['Male', 'Female'] as Gender[]).map((g) => (
                            <TouchableOpacity
                                key={g}
                                onPress={() => setValue('gender', g)}
                                activeOpacity={0.85}
                                className={`flex-1 py-3.5 rounded-xl items-center ${gender === g ? 'bg-blue-500' : 'bg-gray-100'
                                    }`}
                            >
                                <Text
                                    className={`font-medium ${gender === g ? 'text-white' : 'text-gray-700'
                                        }`}
                                >
                                    {g}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Marital Status */}
                    <Text className="text-sm font-medium text-gray-700 my-3">
                        Marital Status (optional)
                    </Text>
                    <View className="flex-row gap-3">
                        {(['Single', 'Married'] as Marital[]).map((m) => (
                            <TouchableOpacity
                                key={m}
                                onPress={() => setValue('marital', m)}
                                activeOpacity={0.85}
                                className={`flex-1 py-3.5 rounded-xl items-center ${marital === m ? 'bg-blue-500' : 'bg-gray-100'
                                    }`}
                            >
                                <Text
                                    className={`font-medium ${marital === m ? 'text-white' : 'text-gray-700'
                                        }`}
                                >
                                    {m}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Date of Birth */}
                    <Text className="text-sm font-medium text-gray-700 mt-5 mb-2">
                        Date of Birth (optional)
                    </Text>
                    <TouchableOpacity
                        style={{ backgroundColor: 'white' }}
                        activeOpacity={0.85}
                        onPress={() => setShowCal(true)}
                        className="border border-gray-300 rounded-lg px-4 py-4 bg-white justify-center"
                    >
                        <Text className="text-gray-700">{formatDate(dob)}</Text>
                    </TouchableOpacity>

                    {showCal && (
                        <DateTimePicker
                            style={{ backgroundColor: 'white' }}
                            value={dob || new Date()}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            maximumDate={new Date()}
                            onChange={(_, selected) => {
                                setShowCal(false);
                                selected && setValue('dob', selected);
                            }}
                        />
                    )}

                    {/* Select City */}
                    <Text className="text-sm font-medium text-gray-700 mt-5 mb-2">
                        Select City
                    </Text>
                    <TouchableOpacity
                        style={{ backgroundColor: 'white' }}
                        activeOpacity={0.85}
                        onPress={openCitySelector}
                        className="border border-gray-300 rounded-lg px-4 py-4 bg-white justify-center"
                    >
                        <Text className="text-gray-700">
                            {location || 'Tap to select your city'}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

                <View className="mb-4 items-center justify-center">
                    <CustomButton
                        label="Update Profile"
                        loading={loading}
                        onPress={handleSubmit(onSubmit)}
                        disabled={loading}
                    />
                </View>

                {/* Bottom Sheet for City Selection */}
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={['95%']}
                    enablePanDownToClose
                    onClose={closeSheet}
                    onChange={handleSheetChanges}
                    backgroundStyle={{ backgroundColor: 'white' }}
                >
                    <BottomSheetView className="px-5 flex-1">
                        <Text className="text-xl font-bold text-center mb-4">
                            {sheetTitle}
                        </Text>
                        <BottomSheetFlatList
                            data={sheetData}
                            keyExtractor={(item:any) => item}
                            renderItem={renderSingleItem}
                            ItemSeparatorComponent={() => (
                                <View className="h-px bg-slate-200" />
                            )}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    </BottomSheetView>
                </BottomSheet>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EditProfile;
