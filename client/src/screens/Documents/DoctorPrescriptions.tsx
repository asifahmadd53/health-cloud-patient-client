import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import Icons from '../../utils/constants/Icons';
import UploadBox from '../../components/UploadBox';
import { useDocumentUploader } from '../../hooks/useDocumentUploader';

export default function DoctorPrescriptions({ onBrowse }: { onBrowse: () => void }) {
  const { docs, remove } = useDocumentUploader('PRESCRIPTION');
  const [seeAll, setSeeAll] = useState(false);

  const list = seeAll ? docs : docs.slice(0, 3);

  return (
    <View>
      <UploadBox title="Upload Prescription" onBrowse={onBrowse} />

      <View className="flex-row justify-between px-2 mt-6">
        <Text className="text-base">Your Prescriptions</Text>
        {docs.length > 3 && (
          <TouchableOpacity onPress={() => setSeeAll(v => !v)}>
            <Text className="text-secondary underline">{seeAll ? 'See less' : 'See All'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {list.map(item => (
        <View key={item.id} className="bg-white p-3 rounded-lg shadow mb-3 mx-2 flex-row justify-between items-center">
          <Text className="font-medium flex-1">{item.name}</Text>
          <TouchableOpacity onPress={() => remove(item.id)}>
            <Image source={Icons.cross} className="w-5 h-5" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}