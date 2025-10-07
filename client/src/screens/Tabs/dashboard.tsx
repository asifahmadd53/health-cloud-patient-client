import { View, Text, ScrollView, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';

import React, { useCallback, useRef, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';
import Images from '../../utils/libs/constants/Images';
import Icons from '../../utils/libs/constants/Icons';
import CustomInput from '../../components/CustomInput';
import Categories from '../../components/Categories';
import DoctorCard from '../../components/DoctorCard';
import SheduleCard from '../../components/SheduleCard';
import Carousel from 'react-native-reanimated-carousel';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import LocationIcon from "../../assets/icons/location-svgrepo-com.svg";

const { width } = Dimensions.get('window');

const isTablet = width > 768

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DashBoard = () => {
  const ref = React.useRef(null);
  const navigation: any = useNavigation()
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const defaultDataWith6Colors = [
    '#B0604D',
    '#899F9C',
    '#B3C680',
    '#5C6265',
    '#F5D399',
    '#F1F1F1',
  ];
  const progress = useSharedValue(0);
  const [percentage, setPercentage] = useState(75);

  useEffect(() => {
    progress.value = withTiming(percentage, { duration: 1000 });
  }, [percentage]);

  const animatedProps = useAnimatedProps(() => {
    const circumference = 2 * Math.PI * 50; // Assuming radius 50
    const strokeDashoffset = circumference - (circumference * progress.value) / 100;
    return {
      strokeDashoffset,
    };
  });

 
  return (
    <SafeAreaView className="flex-1 bg-white px-5 lg:px-12">
      <View className="flex-row items-center justify-between w-full mt-7">
        <CustomHeader />
        <Text className="text-center flex-1 font-bold text-lg lg:text-2xl">Hello Asif</Text>
        <TouchableOpacity className='shadow-sm' activeOpacity={0.91}   onPress={() => navigation.navigate('home', { screen: 'ProfileRoutes', params: { screen: 'UserProfile' } })}
        >
          <Avatar.Image size={isTablet ? 40 : 28} source={Images.manAvatar} />
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center justify-between px-1 py-4">
        <View className="items-center flex flex-row w-1/2">
          <View className="relative w-12 h-12">
            <Svg className="w-full h-full" viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="lightgray"
                strokeWidth="10"
                fill="transparent"
              />
              <AnimatedCircle
                cx="50"
                cy="50"
                r="45"
                stroke="#2C415C"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray="182.74"
                animatedProps={animatedProps}
                strokeLinecap="round"
                rotation="-90"
                origin="50, 50"
              />
            </Svg>
           
            <View className="absolute inset-1 items-center justify-center">
              <Text className="font-bold text-sm">M</Text>
            </View>
          </View>

          {/* Labels below the circle */}
         <View className='ml-3'>
            <Text className="font-semibold text-gray-800">Hello Asif</Text>
            <Text className="text-sm text-gray-500">20% completed</Text>
         </View>
        </View>

        {/* Right Section: Icon */}
        <View className="items-center gap-1 flex flex-row justify-center">
          <LocationIcon width={20} height={20} />
          <Text>Sahiwal</Text>
        </View>
      </View>
      <View className="mt-1 mb-2">
        <TouchableOpacity
        activeOpacity={.90}
          onPress={() => bottomSheetRef.current?.expand()}
          className="flex-row items-center px-4 py-3 bg-white rounded-xl border border-gray-300"
        >
          <MaterialCommunityIcons name="magnify" size={20} color="#6B7280" />
          <Text className="ml-2 text-gray-500">Search a doctor</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-lg font-semibold lg:text-xl">Upcoming Appointments</Text>
          <Text
            onPress={() => navigation.navigate('AppointmentsRoutes')}
            className="text-secondary underline text-sm lg:text-lg">SEE ALL</Text>
        </View>
        <View className="mx-auto" id="carousel-component" style={{ marginTop: 12, alignItems: 'center', alignContent: 'center' }}>
          <Carousel
            ref={ref}
            autoPlayInterval={2000}  // Only defined once
            data={defaultDataWith6Colors}
            height={isTablet ? 200 : 170}
            loop={false}
            pagingEnabled={true}
            snapEnabled={true}
            width={width * .90}
            mode={"vertical-stack"}
            modeConfig={{
              snapDirection: "left",
              stackInterval: 11,
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
          />
        </View>

        <View className="flex-row justify-between items-center mt-5">
          <Text className="text-lg font-semibold lg:text-xl">Find a doctor</Text>
          <Text
            onPress={() => navigation.navigate('home', { screen: 'SpecialistRoutes' })}
            className="text-secondary underline text-sm lg:text-lg">SEE ALL</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-none mt-3 py-2'>
          <Categories title='Cardiologist' icon={Icons.heart} />
          <Categories title='Neurology' icon={Icons.brain} />
          <Categories title='Eye Specialist' icon={Icons.eye} />
          <Categories title='Dentist' icon={Icons.tooth} />
        </ScrollView>

        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-lg font-semibold lg:text-xl">Recent Doctors</Text>
          <Text onPress={() => navigation.navigate('RecentDr')} className="text-secondary underline text-sm lg:text-lg">SEE ALL</Text>
        </View>

        <FlatList
          data={[2, 3, 5, 5, 45, 45]}
          horizontal
          showsHorizontalScrollIndicator={true}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          renderItem={({ item }) => (
            <DoctorCard value={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
          style={{ flexGrow: 0, height: 110 }}
        />

        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-lg font-semibold lg:text-xl">Doctors in Sahiwal</Text>
          <Text onPress={() => navigation.navigate('RecentDr')} className="text-secondary underline text-sm lg:text-lg">SEE ALL</Text>
        </View>

        <FlatList
          data={[2, 3, 5, 5, 45, 45]}
          horizontal
          showsHorizontalScrollIndicator={true}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          renderItem={({ item }) => (
            <DoctorCard value={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
          style={{ flexGrow: 0, height: 110 }}
        />

        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-lg font-semibold lg:text-xl">Clinics in Sahiwal</Text>
          <Text onPress={() => navigation.navigate('RecentDr')} className="text-secondary underline text-sm lg:text-lg">SEE ALL</Text>
        </View>

        <FlatList
          data={[2, 3, 5, 5, 45, 45]}
          horizontal
          showsHorizontalScrollIndicator={true}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          renderItem={({ item }) => (
            <DoctorCard value={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
          style={{ flexGrow: 0, height: 110 }}
        />

      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['98%']}
        index={-1}
        enablePanDownToClose
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={{ flex: 1, padding: 16 }}>
          {/* Search Input */}
          <CustomInput placeholder="Search by City" />

          {/* Section Label */}
          <Text className="text-gray-500 text-sm font-medium mt-4 mb-2">
            Popular Cities
          </Text>

          {/* City List */}
          <View className="space-y-3">
            {["Sahiwal", "Lahore", "Karachi", "Islamabad", "Faisalabad"].map(
              (city, index) => (
                <TouchableOpacity
                  key={index}
                  className="border border-gray-200 rounded-lg px-4 py-3 mb-3 bg-white shadow-sm"
                  activeOpacity={0.7}
                >
                  <Text className="text-gray-800 font-medium text-base">{city}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </BottomSheetView>
      </BottomSheet>



    </SafeAreaView>
  );
};

export default DashBoard;
