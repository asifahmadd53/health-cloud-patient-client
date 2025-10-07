import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    Platform,
    ScrollView,
} from 'react-native';
import Icons from '../../utils/libs/constants/Icons';
import Images from '../../utils/libs/constants/Images';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomInput from '../../components/CustomInput';
import Header from '../../components/Header';

type Gender = 'Male' | 'Female' | '';
type Marital = 'Single' | 'Married' | '';

const EditProfile = () => {
    const navigation = useNavigation();

    /* ---------- form state ---------- */
    const [fullName, setFullName] = useState('Muhammad Asif');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState<Gender>('');
    const [marital, setMarital] = useState<Marital>('');
    const [dob, setDob] = useState<Date | undefined>(undefined);
    const [showCal, setShowCal] = useState(false);

    /* ---------- helpers ---------- */
    const formatDate = (d: Date | undefined) =>
        d ? d.toLocaleDateString() : 'Select date';

    /* ---------- UI ---------- */
    return (
        <SafeAreaView className="flex-1 bg-white">
            <Header title='Edit Profile'/>
            <ScrollView
                className="px-5 lg:px-10"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
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

                <CustomInput
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChangeText={setFullName}
                />
                <Text className="text-sm font-medium text-gray-700  mb-2">Gender</Text>
                <View className="flex-row gap-3">
                    {([
                        { label: 'Male', value: 'Male' as Gender, activeColor: 'bg-blue-500' },
                        { label: 'Female', value: 'Female' as Gender, activeColor: 'bg-pink-500' },
                    ]).map(({ label, value, activeColor }) => (
                        <TouchableOpacity
                            key={value}
                            onPress={() => setGender(value)}
                            activeOpacity={0.85}
                            className={`flex-1 py-3.5 rounded-xl items-center ${gender === value ? activeColor : 'bg-gray-100'
                                }`}
                        >
                            <Text className={`font-medium ${gender === value ? 'text-white' : 'text-gray-700'}`}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                
                <Text className="text-sm font-medium text-gray-700 mt-5 mb-2">
                    Marital Status (optional)
                </Text>
                <View className="flex-row gap-3">
                    {(['Single', 'Married'] as Marital[]).map((m) => (
                        <TouchableOpacity
                            key={m}
                            onPress={() => setMarital(m)}
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

                {/* -------------- Date of Birth -------------- */}
                <Text className="text-sm font-medium text-gray-700 mt-5 mb-2">
                    Date of Birth (optional)
                </Text>
                <TouchableOpacity
                style={{backgroundColor:"white"}}
                    activeOpacity={0.85}
                    onPress={() => setShowCal(true)}
                    className="border border-gray-300 rounded-lg px-4 py-4 bg-white justify-center"
                >
                    <Text className="text-gray-700">{formatDate(dob)}</Text>
                </TouchableOpacity>

                {showCal && (
                    <DateTimePicker
                        value={dob || new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        maximumDate={new Date()}
                        onChange={(_e, selected) => {
                            setShowCal(false);
                            selected && setDob(selected);
                        }}
                    />
                )}

                
            </ScrollView>
            <View className="mb-4 items-center justify-center">
                <CustomButton label="Update Profile" />
            </View>
        </SafeAreaView>
    );
};

export default EditProfile;