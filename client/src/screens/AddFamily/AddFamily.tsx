import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icons from '@/src/utils/libs/constants/Icons'
import { useNavigation } from '@react-navigation/native'
import CustomSimpleInput from '@/src/components/CustomSimpleInput'
import { RadioButton } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown'
import { AntDesign } from '@expo/vector-icons'
import CustomButton from '@/src/components/CustomButton'

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
        <CustomSimpleInput label={'Name'} placeholder={'Enter Full Name'} value={name} onChange={setName}/>
        <CustomSimpleInput label={'Your Relationship'} placeholder={'Enter Full Name'} onChange={setRelation} value={relation}/>
        <CustomSimpleInput label={'Age'} placeholder={'Enter Full Name'} onChange={setAge} value={age}/>
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
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        
      />
      <View className='my-4'>
      <CustomSimpleInput label={'Any prediagnosed Disease'} placeholder={'Dibetic, Hypertension, etc'} value={disease} onChange={setDisease}/>
      </View>
        </View>
      </View>
      <CustomButton label='Add Patient'/>
    </SafeAreaView>
  )
}

export default AddFamily

const styles = StyleSheet.create({
  dropdown: {
    height: 55,
    borderWidth:1,
    paddingHorizontal:15,
    borderRadius:12,
    borderColor: 'lightgray',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});