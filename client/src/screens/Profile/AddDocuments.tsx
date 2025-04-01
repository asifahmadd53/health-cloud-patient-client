import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Icons from '../../utils/libs/constants/Icons'
import { LinearProgress } from '@rneui/themed';
import CustomSecondaryButton from '../../components/CustomSecondaryButton'
import CustomButton from '../../components/CustomButton'
const AddDocuments = () => {
    const navigation = useNavigation()
    const [progress, setProgress] = React.useState(1);

    React.useEffect(() => {
        let subs = true;
        if (progress < 2  && progress !== 0) {
            setTimeout(() => {
                if (subs) {
                    setProgress(progress + 0.1);
                }
            }, 100);
        }
        return () => {
            subs = false;
        };
    }, [progress]);


    return (
        <SafeAreaView className='px-5 bg-white flex-1 lg:px-10'>
            {/* Header */}
            <View className="flex-row items-center justify-between mt-6 relative">
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.goBack()}
                    className="w-12 h-12 items-center justify-center bg-gray-200 rounded-full shadow-sm"
                >
                    <Image className="w-6 h-6" source={Icons.leftIcon} />
                </TouchableOpacity>

                {/* Centered Title */}
                <View className="absolute left-0 right-0 items-center">
                    <Text className="text-xl font-semibold text-gray-800 tracking-wide">
                        Add Documents
                    </Text>
                </View>
            </View>

            <View className='mt-16 bg-white shadow-gray-500 border border-dashed rounded-md shadow-md py-4 mx-2'>
                <Text className='text-center text-2xl'>Upload</Text>
                <View className='items-center gap-3'>
                    <Image className='w-20 h-20 mt-5' source={Icons.cloud_computing} />
                    {/* <Text className='text-lg font-bold underline'>Upload Files</Text> */}
                    <CustomSecondaryButton label='Browse File' />
                    <Text className='text-base text-slate-500'>Supported Format JPEG, PNG and PDF</Text>
                </View>
            </View>

            <View className='flex-row justify-between px-2 mt-5'>
                <Text className='text-base'>Your Documents</Text>
                <Text className='text-secondary underline'>See All</Text>
            </View>

            <View className='bg-white mt-10 px-3 py-6 shadow-gray-500 shadow-md'>
                <Text className='font-semibold'>Report Infection.pdf</Text>
                <View className="flex-row items-center gap-4 mt-3">
        {/* Progress Bar Container */}
        <View className="flex-1">
            <LinearProgress
                style={{ height: 8, borderRadius: 4 }}
                value={progress}
                variant="determinate"
                color="#2895cb"
                trackColor="#d1e9f3"
                animation={{ duration: 300 }}
            />
        </View>

        {/* Cancel Icon */}
        <TouchableOpacity onPress={() => setProgress(0)}>
            <Image className="w-7 h-7" source={Icons.cross} />
        </TouchableOpacity>
    </View>
            </View>




        </SafeAreaView>
    )
}

export default AddDocuments
