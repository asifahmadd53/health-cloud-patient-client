import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Images from '../../utils/constants/Images';
import Icons from '../../utils/constants/Icons';
import FamilyCard from '../../components/FamilyCard';
import CustomSecondaryButton from '../../components/CustomSecondaryButton';
import Header from '../../components/Header';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import CustomInput from '../../components/CustomInput';
import { Dropdown } from 'react-native-element-dropdown';

type Gender = 'Male' | 'Female';

const MyFamily = () => {
  const navigation: any = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => { }, []);

  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [value, setValue] = useState<string | null>(null);
  const [disease, setDisease] = useState('');

  const familyMembers = [
    { id: 1, name: 'Mariyam', relation: 'Sister', avatar: Images.womanAvatar },
    { id: 2, name: 'Rumaisa', relation: 'Sister', avatar: Images.womanAvatar },
    { id: 3, name: 'Ahmed Raza', relation: 'Brother', avatar: Images.manAvatar },
  ];

  const data = [
    { value: 'None' },
    { value: 'Diabetes' },
    { value: 'Hypertension' },
    { value: 'Asthma' },
    { value: 'Other' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="My Family" />

      <View className="bg-white mx-5 mt-4 rounded-2xl p-5 items-center shadow-xs">
        <Image
          className="w-20 h-20 rounded-full bg-gray-200"
          resizeMode="cover"
          source={Images.manAvatar}
        />
        <Text className="text-base font-semibold text-gray-900 mt-3">Muhammad Asif (Me)</Text>
      </View>

      <FlatList
        className="px-5 mt-5"
        data={familyMembers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FamilyCard name={item.name} relation={item.relation} avatar={item.avatar} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-3" />}
      />

      <View className="w-full items-center absolute bottom-2">
        <CustomSecondaryButton
          onPress={() => bottomSheetRef.current?.expand()}
          className="bg-secondary text-center"
          label="Add Family Profile"
          icon={Icons.add_user}
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['90%']}
        index={-1}
        enablePanDownToClose
        onChange={handleSheetChanges}
      >
        <View className="flex-1">

          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
          >
            <CustomInput
              label="Name"
              placeholder="Enter Full Name"
              value={name}
              onChangeText={setName}
            />

            <CustomInput
              label="Your Relationship"
              placeholder="e.g. Mother"
              value={relation}
              onChangeText={setRelation}
            />

            <CustomInput
              label="Age"
              placeholder="Enter Age"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />

            <Text className="text-sm font-semibold text-gray-700 mb-2 mt-4">Gender</Text>
            <View className="flex-row gap-3">
              {(['Male', 'Female'] as Gender[]).map((g) => (
                <TouchableOpacity
                  key={g}
                  onPress={() => setGender(g)}
                  activeOpacity={0.85}
                  className={`flex-1 py-3.5 rounded-xl items-center ${gender === g ? (g === 'Male' ? 'bg-blue-500' : 'bg-pink-500') : 'bg-gray-100'
                    }`}
                >
                  <Text className={`font-medium ${gender === g ? 'text-white' : 'text-gray-700'}`}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-sm font-semibold text-gray-700 mb-2 mt-4">Any prediagnosed disease?</Text>
            <Dropdown
              containerStyle={{ borderRadius: 8 }}
              style={styles.consistentDropdown}
              placeholderStyle={styles.consistentPlaceholder}
              selectedTextStyle={styles.consistentSelectedText}
              inputSearchStyle={styles.consistentInputSearch}
              iconStyle={styles.consistentIcon}
              itemTextStyle={styles.consistentItemText}
              data={data}
              search={false}
              maxHeight={300}
              labelField="value"
              valueField="value"
              placeholder="Select"
              value={value}
              onChange={(item) => setValue(item.value)}
              renderItem={(item) => (
                <View style={styles.dropdownItemContainer}>
                  <Text style={styles.dropdownItemText} numberOfLines={2}>
                    {item.value}
                  </Text>
                </View>
              )}
            />
          </BottomSheetScrollView>

          <View className="px-6 items-center mb-4">
            <CustomSecondaryButton
              className="bg-secondary"
              label="Save & Exit"
              onPress={() => {
                bottomSheetRef.current?.close();
              }}
            />
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  consistentDropdown: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  consistentPlaceholder: {
    fontSize: 16,
    color: '#9ca3af',
  },
  consistentSelectedText: {
    fontSize: 16,
    color: '#1f2937',
  },
  consistentInputSearch: {
    height: 48,
    fontSize: 16,
    borderRadius: 8,
    color: 'black',
  },
  consistentIcon: {
    tintColor: '#9ca3af',
  },
  consistentItemText: {
    fontSize: 16,
    color: 'black',
  },
  dropdownItemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    minHeight: 48,
    justifyContent: 'center',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#1f2937',
    flexWrap: 'wrap',
    lineHeight: 20,
  },
});

export default MyFamily;