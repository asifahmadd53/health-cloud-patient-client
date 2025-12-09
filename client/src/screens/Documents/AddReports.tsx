import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import Icons from '../../utils/constants/Icons';
import UploadBox from '../../components/UploadBox';
import { useDocumentUploader } from '../../hooks/useDocumentUploader';

export default function AddReports({ onBrowse }: { onBrowse: () => void }) {
    const { docs, remove, status } = useDocumentUploader('REPORT');
    const [seeAll, setSeeAll] = useState(false);

    const list = seeAll ? docs : docs.slice(0, 3);

    return (
        <View>
            <UploadBox title="Upload Report" onBrowse={onBrowse} />

            <View className=" justify-between px-2 mt-6 ">
                <Text className="text-base">Your Documents</Text>
                {docs.length > 3 && (
                    <TouchableOpacity onPress={() => setSeeAll(v => !v)}>
                        <Text className="text-secondary underline">{seeAll ? 'See less' : 'See All'}</Text>
                    </TouchableOpacity>
                )}
            </View>

            {list.map(item => (
                <View key={item.id} className="bg-white p-3 rounded-lg shadow mb-3 mx-2">
                    <Text className="font-medium mb-2">{item.name}</Text>
                    <Text className="text-xs text-gray-500">{Math.round((item.progress ?? 0) * 100)} %</Text>
                    <View className="flex-row items-center justify-between">
                        <Progress.Bar
                            progress={item.progress ?? 0}
                            width={null}
                            flex={1}
                            color="#2895cb"
                            indeterminate={status === 'uploading' && (item.progress ?? 0) === 0}
                        />
                        <TouchableOpacity onPress={() => remove(item.id)} className="ml-4">
                            <Image source={Icons.cross} className="w-5 h-5" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );
}