import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../utils/constants/Icons';
import Categories from '../../components/Categories';
import CustomInput from '../../components/CustomInput';
import {Dropdown} from 'react-native-element-dropdown';
import {CheckBox, Switch} from '@rneui/themed';
import CustomButton from '../../components/CustomButton';
import DoctorCard from '../../components/DoctorCard';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Header from '../../components/Header';
import {getAllDoctors} from '../../services/doctorsServices';

const {height} = Dimensions.get('window');

const Specialists = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [sortFeeHighToLow, setSortFeeHighToLow] = useState(false);
  const [sortFeeLowToHigh, setSortFeeLowToHigh] = useState(false);
  const [sortAZ, setSortAZ] = useState(false);
  const [sortZA, setSortZA] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const {width, height} = Dimensions.get('window');
  const isTablet = width > 768;

  const data = [
    {label: 'Sahiwal', value: '1'},
    {label: 'Lahore', value: '2'},
    {label: 'Islamabad', value: '3'},
    {label: 'Okada', value: '4'},
  ];
  const Speciality = [
    {label: 'Cardiologist', value: '1'},
    {label: 'Dermatologist', value: '2'},
    {label: 'Neurologist', value: '3'},
    {label: 'Orthopedic Surgeon', value: '4'},
    {label: 'Pediatrician', value: '5'},
    {label: 'Psychiatrist', value: '6'},
    {label: 'Dentist', value: '7'},
    {label: 'Gynecologist', value: '8'},
    {label: 'Oncologist', value: '9'},
    {label: 'Urologist', value: '10'},
    {label: 'Ophthalmologist', value: '11'},
    {label: 'ENT Specialist', value: '12'},
    {label: 'Nephrologist', value: '13'},
    {label: 'Pulmonologist', value: '14'},
    {label: 'Gastroenterologist', value: '15'},
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getAllDoctors();
        setDoctors(res?.data?.doctors || []);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

    const filteredDoctors = doctors.filter(doc => {
        const doctorName = doc?.doctor?.name?.toLowerCase() || '';
        const speciality = doc?.specialty?.join(', ')?.toLowerCase() || '';
        const city = doc?.city?.toLowerCase() || '';

        const matchesName = doctorName.includes(search.toLowerCase());
        const matchesCity = selectedCity
            ? city === selectedCity.toLowerCase()
            : true;
        const matchesSpeciality = selectedSpeciality
            ? speciality.includes(selectedSpeciality.toLowerCase())
            : true;
        const matchesCategory =
            selectedCategory === 'All'
                ? true
                : speciality.includes(selectedCategory.toLowerCase());

        return matchesName && matchesCity && matchesSpeciality && matchesCategory;
    });

    
  if (sortAZ)
    filteredDoctors.sort((a, b) => (a?.doctor?.name || "").localeCompare(b?.doctor?.name || ""));
  if (sortZA)
    filteredDoctors.sort((a, b) => b.doctor.name.localeCompare(a.doctor.name));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Specialists" />

      <View className="px-4 flex-1">
        <View className="mt-7 lg:mt-10 flex-row items-center gap-2 lg:px-8">
          <View className="flex-1">
            <CustomInput
              icon="search"
              placeholder="Find a doctor"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => bottomSheetRef.current?.expand()}
            className="bg-secondary/80 rounded-md p-3 aspect-square items-center justify-center">
            <Image className="w-7 h-7 lg:w-10 lg:h-10" source={Icons.filter} />
          </TouchableOpacity>
        </View>

        

              <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="flex-none py-2 lg:px-8 mt-4"
              >
                  {[
                      { title: 'All', icon: Icons.doctor },
                      { title: 'Cardiologist', icon: Icons.heart },
                      { title: 'Neurology', icon: Icons.brain },
                      { title: 'Eye Specialist', icon: Icons.eye },
                      { title: 'Dentist', icon: Icons.tooth },
                  ].map(category => (
                      <TouchableOpacity
                          key={category.title}
                          activeOpacity={0.8}
                          onPress={() => setSelectedCategory(category.title)}
                      >
                          <Categories
                              title={category.title}
                              icon={category.icon}
                              active={selectedCategory === category.title}
                          />
                      </TouchableOpacity>
                  ))}
              </ScrollView>

        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#2C415C" />
            <Text className="mt-2 text-gray-500">Loading doctors...</Text>
          </View>
        ) : filteredDoctors.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            className="flex-1 mt-5 px-2"
            data={filteredDoctors}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <DoctorCard
                name={item.doctor?.name}
                speciality={item.specialty?.join(', ') || 'General Practice'}
                city={item.city || 'Unknown'}
                consultationFee={item?.consultationFee}   // ← live value
                image={item.image}
                onPress={() => {
                  const doctorProfileId = item?._id;
                  if (doctorProfileId) {
                    navigation.navigate('DrProfileRoutes', {
                      screen: 'DrProfile',
                      params: { id: doctorProfileId },
                    });
                  } else {
                    console.warn('doctorProfile _id missing', item);
                  }
                }}
              />

            )}
            contentContainerStyle={{paddingBottom: 20}}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500">No doctors found</Text>
          </View>
        )}

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['50%']}
          index={-1}
          enablePanDownToClose
          onChange={handleSheetChanges}
          backgroundStyle={{backgroundColor: 'white'}}>
          <BottomSheetView className="px-5" style={{flex: 1, padding: 16}}>
            <Text className="text-xl font-bold text-center mb-6 lg:text-2xl lg:my-5">
              Select Filters
            </Text>
            <Text className="text-base font-semibold mb-2 lg:text-xl">
              City
            </Text>

            <Dropdown
              containerStyle={{borderRadius: 8}}
              style={styles.consistentDropdown}
              placeholderStyle={styles.consistentPlaceholder}
              selectedTextStyle={styles.consistentSelectedText}
              inputSearchStyle={styles.consistentInputSearch}
              iconStyle={styles.consistentIcon}
              itemTextStyle={styles.consistentItemText}
              data={data}
              search={false}
              maxHeight={300}
              labelField="label"
              valueField="label"
              placeholder="Select City"
              searchPlaceholder="Search..."
              value={selectedCity}
              onChange={item => setSelectedCity(item.value)}
              renderItem={item => (
                <View style={styles.dropdownItemContainer}>
                  <Text style={styles.dropdownItemText} numberOfLines={2}>
                    {item.label}
                  </Text>
                </View>
              )}
            />

            {/* Speciality Dropdown */}
            <Text className="text-base font-semibold mt-4 mb-2 lg:text-xl">
              Speciality
            </Text>

            <Dropdown
              containerStyle={{borderRadius: 8}}
              style={styles.consistentDropdown}
              placeholderStyle={styles.consistentPlaceholder}
              selectedTextStyle={styles.consistentSelectedText}
              inputSearchStyle={styles.consistentInputSearch}
              iconStyle={styles.consistentIcon}
              itemTextStyle={styles.consistentItemText}
              data={Speciality}
              search={false}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Speciality"
              searchPlaceholder="Search..."
              value={selectedSpeciality}
              onChange={item => setSelectedSpeciality(item.value)}
              renderItem={item => (
                <View style={styles.dropdownItemContainer}>
                  <Text style={styles.dropdownItemText} numberOfLines={2}>
                    {item.label}
                  </Text>
                </View>
              )}
            />

            {/* Popularity Switch */}
            <View className="flex-row justify-between items-center mt-4">
              <Text className="text-base font-semibold text-gray-800 lg:text-xl">
                Most Popular
              </Text>
              <Switch
                className="scale-125"
                value={isPopular}
                onValueChange={setIsPopular}
                trackColor={{false: '#D1D5DB', true: '#2895cb'}} // Gray when off, blue when on
                thumbColor={isPopular ? '#2C415C' : '#A0A0A0'} // White when on, light gray when off
              />
            </View>

            <Text className="text-base font-semibold mt-4 mb-2 lg:text-xl">
              Sort by Fee
            </Text>
            <View className="flex-row justify-between">
              <CheckBox
                title="High to Low"
                checked={sortFeeHighToLow}
                onPress={() => {
                  setSortFeeHighToLow(!sortFeeHighToLow);
                  setSortFeeLowToHigh(false);
                }}
                textStyle={{
                  fontSize: isTablet ? 22 : 15,
                  fontWeight: 'bold',
                  color: '#333',
                }}
                titleProps={{numberOfLines: 1}} // Explicitly setting props for the title
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }}
              />
              <CheckBox
                title="Low to High"
                checked={sortFeeLowToHigh}
                onPress={() => {
                  setSortFeeLowToHigh(!sortFeeLowToHigh);
                  setSortFeeHighToLow(false);
                }}
                textStyle={{
                  fontSize: isTablet ? 22 : 15,
                  fontWeight: 'bold',
                  color: '#333',
                }}
                titleProps={{numberOfLines: 1}}
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }}
              />
            </View>

            <Text className="text-base font-semibold mt-4 mb-2">
              Sort by Name
            </Text>
            <View className="flex-row justify-between">
              <CheckBox
                title="A to Z"
                checked={sortAZ}
                onPress={() => {
                  setSortAZ(!sortAZ);
                  setSortZA(false);
                }}
                textStyle={{
                  fontSize: isTablet ? 22 : 15,
                  fontWeight: 'bold',
                  color: '#333',
                }}
                titleProps={{numberOfLines: 1}}
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }}
              />
              <CheckBox
                title="Z to A"
                checked={sortZA}
                onPress={() => {
                  setSortZA(!sortZA);
                  setSortAZ(false);
                }}
                textStyle={{
                  fontSize: isTablet ? 22 : 15,
                  fontWeight: 'bold',
                  color: '#333',
                }}
                titleProps={{numberOfLines: 1}}
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }}
              />
            </View>

            <View className="my-4">
              <CustomButton
                label="Apply Filters"
                onPress={() => bottomSheetRef.current?.close()}
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

export default Specialists;

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
