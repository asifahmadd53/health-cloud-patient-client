import { Image, Text, TouchableOpacity, View, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProgressBar } from 'react-native-paper';
import CustomHeader from '../../components/CustomHeader';
import Icons from '../../utils/libs/constants/Icons';

const Documents = () => {
    const [documents, setDocuments] = useState(false)
    const [reports, setReports] = useState(false)
    const DATA = [1, 3, 3, 42, 5, 2454, 5, 34, 5, 34, 534, 5]


    return (
        <SafeAreaView className='flex-1 bg-white px-4'>
            <View className="flex-row items-center justify-between py-4">
                <CustomHeader />
                <Text className="text-xl font-bold tracking-wide text-gray-900 flex-1 text-center">
                    Documents
                </Text>
            </View>

            <TouchableOpacity activeOpacity={0.7} className='border border-gray-300 border-dashed rounded-lg mx-auto mt-6 items-center justify-center w-full h-36 px-4 py-6'>
                <Image className='w-16 h-16' source={Icons.cloud_computing} />
                <Text className='text-sm text-center mt-2 font-medium'>
                    Tap to upload your Reports and Documents.
                </Text>
                <Text className='text-xs text-center text-gray-500 mt-1'>
                    Supported formats: JPG, PNG, PDF
                </Text>
            </TouchableOpacity>



            <View className="flex-row gap-3 mt-8">
                <Pressable
                    onPress={() => {
                        setDocuments(true);
                        setReports(false);
                    }}
                    className={`px-4 py-2 rounded-2xl ${documents ? 'bg-secondary' : 'bg-gray-200'}`}
                >
                    <Text className={`${documents ? 'text-white' : 'text-gray-700'} font-medium`}>
                        Documents
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => {
                        setReports(true);
                        setDocuments(false);
                    }}
                    className={`px-4 py-2 rounded-2xl ${reports ? 'bg-secondary' : 'bg-gray-200'}`}
                >
                    <Text className={`${reports ? 'text-white' : 'text-gray-700'} font-medium`}>
                        Reports
                    </Text>
                </Pressable>
            </View>

            <FlatList
            showsVerticalScrollIndicator={false}
                data={DATA}
                renderItem={() => <View className="border border-slate-300 rounded-xl p-4 flex-row items-center gap-2 mt-5 shadow-lg bg-white">
                    <Image className="h-16 w-16" source={Icons.list}/>
                    <View className="flex-1">
                        <Text className="text-base font-semibold">Image Name:</Text>
                        <View className="flex-row items-center gap-2">
                            <ProgressBar style={{ borderRadius: 50 }} progress={0.6} color={'green'} className="h-2 flex-1" />
                            {/* <Ionicons name="checkmark-circle-outline" size={20} color="green" />
                            <Ionicons name="trash-outline" size={20} color="red" /> */}
                        </View>
                    </View>
                </View>}
            />



        </SafeAreaView>
    )
}

export default Documents;
