import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';

import React, { useState } from 'react';
// import type { ICarouselInstance } from 'react-native-reanimated-carousel';

import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';
import Images from '../../utils/libs/constants/Images';
import Icons from '../../utils/libs/constants/Icons';
import CustomInput from '../../components/CustomInput';
import Categories from '../../components/Categories';
import DoctorCard from '../../components/DoctorCard';

const { width } = Dimensions.get('window');

const isTablet = width > 768


const DashBoard = () => {
  const [search, setSearch] = useState('');
  const ref = React.useRef<ICarouselInstance>(null);
  const navigation: any = useNavigation()
  const defaultDataWith6Colors = [
    '#B0604D',
    '#899F9C',
    '#B3C680',
    '#5C6265',
    '#F5D399',
    '#F1F1F1',
  ];

 
  return (
    <SafeAreaView className="flex-1 bg-white px-5 lg:px-12">
      {/* Header */}
      <View className="flex-row items-center justify-between w-full mt-7">
        <CustomHeader />
        <Text className="text-center flex-1 font-bold text-2xl lg:text-3xl">Hello Asif</Text>
        <TouchableOpacity activeOpacity={.91} onPress={() => navigation.navigate('ProfileLayout')}>
          <Avatar.Image size={isTablet ? 45 : 30} source={Images.manAvatar} />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View className="mt-10">
        <CustomInput placeholder="Search A doctor" icon={Icons.search} value={search} onChange={setSearch} />
      </View>


      <View className="flex-row justify-between items-center mt-5">
        <Text className="text-lg font-bold lg:text-xl">Upcoming Appointments</Text>
        <Text onPress={() => navigation.navigate('AppointmentsLayout')} className="text-secondary underline text-base lg:text-lg">SEE ALL</Text>
      </View>

      {/* Carousel */}
      <View className="mx-0" id="carousel-component" style={{ marginTop: 12 ,alignItems:'center', alignContent:'center'}}>
        {/* <Carousel
          ref={ref}
          autoPlayInterval={1000}  // Only defined once
          data={defaultDataWith6Colors}
          height={isTablet ? 200 : 140}
          loop={false}
          pagingEnabled={true}
          snapEnabled={true}
          width={width * .90} 
          mode='vertical-stack'
          modeConfig={{
            snapDirection: "left",
            stackInterval: 18,
          }}
          customConfig={() => ({ type: 'positive', viewCount: 5 })}
          renderItem={() => (
            <SheduleCard
              name='Muhammad Ali'
              image={Images.dashboard}
              speciality='Surgeon'
              time='Monday 10, May 2020'
            />
          )}
        /> */}


      </View>

      <View className="flex-row justify-between items-center mt-5">
        <Text className="text-lg font-bold lg:text-xl">Find a doctor</Text>
        <Text onPress={() => navigation.navigate('SpecialistLayout')} className="text-secondary underline text-base lg:text-lg">SEE ALL</Text>
      </View>


      <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-none mt-3 py-2'>
        <Categories title='Cardiologist' icon={Icons.heart} />
        <Categories title='Neurology' icon={Icons.brain} />
        <Categories title='Eye Specialist' icon={Icons.eye} />
        <Categories title='Dentist' icon={Icons.tooth} />
      </ScrollView>

      <View className="flex-row justify-between items-center mt-4">
        <Text className="text-lg font-bold lg:text-xl">Recent Doctors</Text>
        <Text onPress={() => navigation.navigate('RecentDrLayout')} className="text-secondary underline text-base lg:text-lg">SEE ALL</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className='px-2 mt-5'>
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
      </ScrollView>



    </SafeAreaView>
  );
};

export default DashBoard;
