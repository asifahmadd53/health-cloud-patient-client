import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import Icons from '../../utils/libs/constants/Icons';
import CustomSecondaryButton from '../../components/CustomSecondaryButton';

interface Item {
  id: string;
  name: string;
  progress: number;
}

export default function DoctorPrescriptions() {
  const [items, setItems] = React.useState<Item[]>([
    { id: '1', name: 'Prescription-12-May.pdf', progress: 0 },
  ]);

  useEffect(() => {
    items.forEach((it) => {
      if (it.progress < 1) {
        const t = setTimeout(() => {
          setItems((prev) =>
            prev.map((x) =>
              x.id === it.id ? { ...x, progress: Math.min(x.progress + 0.1, 1) } : x
            )
          );
        }, 300);
        return () => clearTimeout(t);
      }
    });
  }, [items]);

  const remove = (id: string) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, progress: 0 } : x)));

  return (
    <View>
      {/* upload box */}
      <View className="mt-10 bg-white border border-dashed border-gray-300 rounded-lg py-6 mx-2 shadow-md">
        <Text className="text-center text-2xl mb-3">Upload</Text>
        <View className="items-center gap-3">
          <Image className="w-20 h-20" source={Icons.cloud_computing} />
          <CustomSecondaryButton className='bg-secondary' label="Browse File" />
          <Text className="text-xs text-slate-500">Supported: JPEG, PNG, PDF</Text>
        </View>
      </View>

      <View className="flex-row justify-between px-2 mt-6">
        <Text className="text-base">Your Prescriptions</Text>
        <TouchableOpacity>
          <Text className="text-secondary underline">See All</Text>
        </TouchableOpacity>
      </View>
    
      {items.map((it) => (
        <View key={it.id} className="bg-white mt-4 px-3 py-4 rounded-lg shadow-md mx-2">
          <Text className="font-semibold">{it.name}</Text>
          <View className="flex-row items-center gap-4 mt-3">
            <View className="flex-1">
              <Progress.Bar color="#2895cb" progress={0.3} width={200} />
            </View>
            <TouchableOpacity onPress={() => remove(it.id)}>
              <Image className="w-7 h-7" source={Icons.cross} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}