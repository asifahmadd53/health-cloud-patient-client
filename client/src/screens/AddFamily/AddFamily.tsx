import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useNavigation } from '@react-navigation/native'
import { RadioButton } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown'
import Icons from '../../utils/libs/constants/Icons';
import CustomSimpleInput from '../../components/CustomSimpleInput';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';


const AddFamily = () => {
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [relation, setRelation] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | null>(null)
  const [value, setValue] = useState(null);
  const [disease, setDisease] = useState(null);

  const data = [
    { label: 'Sahiwal', value: '1' },
    { label: 'Lahore', value: '2' },
    { label: 'Islamabad', value: '3' },
    { label: 'Okada', value: '4' },
    
  ];

  return (
    <SafeAreaView className='px-5 flex-1 bg-white'>
      <View className="flex-row items-center justify-between mt-6 py-3 mb-3">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
          className="w-12 h-12 items-center justify-center bg-[#ECECEC] rounded-full"
        >
          <Image className="w-6 h-6" source={Icons.leftIcon} />
        </TouchableOpacity>
        <Text className="text-xl font-bold tracking-wide text-center absolute left-0 right-0">
          Patient Biodata
        </Text>
      </View>

      <View className='mt-5'>
        <CustomInput label={'Name'} placeholder={'Enter Full Name'} value={name} onChangeText={setName}/>
        <CustomInput label={'Your Relationship'} placeholder={'Enter Full Name'} onChangeText={setRelation} value={relation}/>
        <CustomInput label={'Age'} placeholder={'Enter Full Name'} onChangeText={setAge} value={age}/>
        <View className=''>
            <Text className='font-semibold'>Gender</Text>
            <View className='flex-row gap-8'>
              <View className='flex-row-reverse items-center mt-2'>
                <Text  onPress={() => setGender('male')}>Male</Text>
                <RadioButton
                  color='#2895cb'
                  value="first"
                  status={gender === 'male' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('male')}
                  />
                  </View>
                  <View className='flex-row-reverse items-center'>
                  <Text  onPress={() => setGender('female')}>Female</Text>
                <RadioButton
                 color='#2895cb'
                  value="second"
                  status={gender === 'female' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('female')}
                />
                  </View>
            </View>
            <Text className='font-semibold text-base my-3'>Gender</Text>
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
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
            renderItem={item => (
              <View style={styles.dropdownItemContainer}>
                <Text
                  style={styles.dropdownItemText}
                  numberOfLines={2}>
                  {item.value}
                </Text>
              </View>
            )}
        
      />
      <View className='my-4'>
      <CustomInput label={'Any prediagnosed Disease'} placeholder={'Dibetic, Hypertension, etc'} value={disease} onChangeText={setDisease}/>
      </View>
        </View>
      </View>
      <CustomButton label='Add Patient'/>
    </SafeAreaView>
  )
}

export default AddFamily

const styles = StyleSheet.create({
  consistentDropdown: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  consistentPlaceholder: {
    fontSize: 16,
    color: '#9ca3af',
  },
  consistentSelectedText: {
    fontSize: 16,
    color: 'black',
  },
  consistentInputSearch: {
    height: 48,
    fontSize: 16,
    borderRadius: 7,
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
  // Legacy styles (keeping for compatibility)
  dropdown: {
    height: 56,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#9ca3af',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#1f2937',
  },
  inputSearchStyle: {
    height: 48,
    fontSize: 16,
    borderRadius: 8,
  },
  inputWrapper: {
    width: '100%',
  },
  splitInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  splitInputRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    height: 56,
    borderLeftWidth: 1,
    borderLeftColor: '#e5e7eb',
  },
  dropdownText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  dropdownList: {
    maxHeight: 200,
    borderRadius: 12,
    position: 'absolute',
    right: 0,
    top: '100%',
    width: '50%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 50,
    marginTop: 4,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
});