import { Image, Text, TouchableOpacity, View, FlatList, Dimensions, StyleSheet, ScrollView } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from '../../utils/libs/constants/Icons';
import Categories from '../../components/Categories';
import CustomInput from '../../components/CustomInput';
import ReactNativeModal from 'react-native-modal';
import { Dropdown } from 'react-native-element-dropdown';
import { CheckBox, Switch } from '@rneui/themed';
import CustomButton from '../../components/CustomButton';
import DoctorCard from '../../components/DoctorCard';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Header from '../../components/Header';


const { height } = Dimensions.get('window');

const Specialist = () => {
    const navigation = useNavigation();
    const DATA = [3, 2, 3, 2, 23, 2, 5, 2];
    const [search, setSearch] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedSpeciality, setSelectedSpeciality] = useState(null);
    const [sortFeeHighToLow, setSortFeeHighToLow] = useState(false);
    const [sortFeeLowToHigh, setSortFeeLowToHigh] = useState(false);
    const [sortAZ, setSortAZ] = useState(false);
    const [sortZA, setSortZA] = useState(false);
    const [isPopular, setIsPopular] = useState(false);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const { width, height } = Dimensions.get('window')
    const isTablet = width > 768

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const data = [
        { label: 'Sahiwal', value: '1' },
        { label: 'Lahore', value: '2' },
        { label: 'Islamabad', value: '3' },
        { label: 'Okada', value: '4' },
    ];
    const Speciality = [
        { label: 'Cardiologist', value: '1' },
        { label: 'Dermatologist', value: '2' },
        { label: 'Neurologist', value: '3' },
        { label: 'Orthopedic Surgeon', value: '4' },
        { label: 'Pediatrician', value: '5' },
        { label: 'Psychiatrist', value: '6' },
        { label: 'Dentist', value: '7' },
        { label: 'Gynecologist', value: '8' },
        { label: 'Oncologist', value: '9' },
        { label: 'Urologist', value: '10' },
        { label: 'Ophthalmologist', value: '11' },
        { label: 'ENT Specialist', value: '12' },
        { label: 'Nephrologist', value: '13' },
        { label: 'Pulmonologist', value: '14' },
        { label: 'Gastroenterologist', value: '15' }
    ];








    return (
        <SafeAreaView className="flex-1 bg-white">
          
          <Header title='Specialist'/>

           <View className='px-4 flex-1'>
                <View className='mt-7 lg:mt-10 flex-row gap-3 lg:px-8 items-center'>
                    <View className='flex-1'>
                        <CustomInput
                            icon={Icons.search}
                            placeholder="Find a doctor"
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>

                    {/* Filter Button */}
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => bottomSheetRef.current?.expand()}
                            className='bg-primary p-3 rounded-md '
                        >
                            <Image
                                className='w-7 h-7 lg:w-10 lg:h-10'
                                source={Icons.filter}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-none py-2 lg:px-8'>

                    <Categories title='All' icon={Icons.doctor} />
                    <Categories title='Cardiologist' icon={Icons.heart} />
                    <Categories title='Neurology' icon={Icons.brain} />
                    <Categories title='Eye Specialist' icon={Icons.eye} />
                    <Categories title='Dentist' icon={Icons.tooth} />
                </ScrollView>

               
                <FlatList
                    showsVerticalScrollIndicator={false}
                    className="flex-1 mt-5 px-2 lg:px-8"
                    data={DATA}
                    contentContainerStyle={{paddingBottom:10}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <DoctorCard />}
                />
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={['50%']}
                    index={-1}
                    enablePanDownToClose
                    onChange={handleSheetChanges}
                    backgroundStyle={{backgroundColor:'white'}}
                >
                    <BottomSheetView className='px-5' style={{ flex: 1, padding: 16 }}>
                        <Text className="text-xl font-bold text-center mb-6 lg:text-2xl lg:my-5">Select Filters</Text>
                        <Text className="text-base font-semibold mb-2 lg:text-xl">City</Text>
                        <Dropdown
                            style={{ backgroundColor: '#F0F0F0', borderRadius: 8, padding: isTablet ? 15 : 10, paddingVertical: isTablet ? 22 : 12 }}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select City"
                            searchPlaceholder="Search..."
                            value={selectedCity}
                            onChange={item => setSelectedCity(item.value)}
                        />

                        {/* Speciality Dropdown */}
                        <Text className="text-base font-semibold mt-4 mb-2 lg:text-xl">Speciality</Text>
                        <Dropdown
                            style={{ backgroundColor: '#F0F0F0', borderRadius: 8, padding: isTablet ? 15 : 10, paddingVertical: isTablet ? 22 : 12 }}
                            data={Speciality}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Speciality"
                            searchPlaceholder="Search..."
                            value={selectedSpeciality}
                            onChange={item => setSelectedSpeciality(item.value)}
                        />

                        {/* Popularity Switch */}
                        <View className="flex-row justify-between items-center mt-4">
                            <Text className="text-base font-semibold text-gray-800 lg:text-xl">Most Popular</Text>
                            <Switch
                                className='scale-125'
                                value={isPopular}
                                onValueChange={setIsPopular}
                                trackColor={{ false: "#D1D5DB", true: "#2895cb" }} // Gray when off, blue when on
                                thumbColor={isPopular ? "#2C415C" : "#A0A0A0"} // White when on, light gray when off
                            />
                        </View>



                        <Text className="text-base font-semibold mt-4 mb-2 lg:text-xl">Sort by Fee</Text>
                        <View className="flex-row justify-between">
                            <CheckBox


                                title="High to Low"
                                checked={sortFeeHighToLow}
                                onPress={() => {
                                    setSortFeeHighToLow(!sortFeeHighToLow);
                                    setSortFeeLowToHigh(false);
                                }}
                                textStyle={{ fontSize: isTablet ? 22 : 15, fontWeight: 'bold', color: '#333' }}
                                titleProps={{ numberOfLines: 1 }} // Explicitly setting props for the title
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            />
                            <CheckBox

                                title="Low to High"
                                checked={sortFeeLowToHigh}
                                onPress={() => {
                                    setSortFeeLowToHigh(!sortFeeLowToHigh);
                                    setSortFeeHighToLow(false);
                                }}
                                textStyle={{ fontSize: isTablet ? 22 : 15, fontWeight: 'bold', color: '#333' }}
                                titleProps={{ numberOfLines: 1 }} // Explicitly setting props for the title
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            />
                        </View>

                        {/* Name Sorting */}
                        <Text className="text-base font-semibold mt-4 mb-2">Sort by Name</Text>
                        <View className="flex-row justify-between">
                            <CheckBox


                                title="A to Z"
                                checked={sortAZ}
                                onPress={() => {
                                    setSortAZ(!sortAZ);
                                    setSortZA(false);
                                }}
                                textStyle={{ fontSize: isTablet ? 22 : 15, fontWeight: 'bold', color: '#333' }}
                                titleProps={{ numberOfLines: 1 }} // Explicitly setting props for the title
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            />
                            <CheckBox


                                title="Z to A"
                                checked={sortZA}
                                onPress={() => {
                                    setSortZA(!sortZA);
                                    setSortAZ(false);
                                }}
                                textStyle={{ fontSize: isTablet ? 22 : 15, fontWeight: 'bold', color: '#333' }}
                                titleProps={{ numberOfLines: 1 }} // Explicitly setting props for the title
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            />
                        </View>

                       
                        <View className='my-4'>
                            <CustomButton label='Apply Filters' />
                        </View>

                    </BottomSheetView>
                </BottomSheet>
           </View>







        </SafeAreaView>
    );
};

export default Specialist;

const styles = StyleSheet.create({
    dropdown: {
        height: 55,
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 12,
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