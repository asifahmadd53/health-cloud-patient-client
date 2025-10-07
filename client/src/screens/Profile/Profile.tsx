// Profile.tsx
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icons from '../../utils/libs/constants/Icons';
import Images from '../../utils/libs/constants/Images';
import Header from '../../components/Header';

const Profile = () => {
  const navigation: any = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Profile" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          className="px-6 pt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="items-center my-5">
            <View className="relative">
              <Image
                className="w-28 h-28 rounded-full border-4 border-gray-200"
                resizeMode="contain"
                source={Images.manAvatar}
              />
              <View className="absolute bottom-1 right-1 w-7 h-7 bg-green-500 rounded-full items-center justify-center border-2 border-white">
                <Image className="w-4 h-4" source={Icons.tick} />
              </View>
            </View>
            <Text className="text-xl font-bold text-gray-900 mt-3">Muhammad Asif</Text>
            <Text className="text-sm text-gray-500">Colony name, Sahiwal</Text>
          </View>

          <View className="bg-white rounded-2xl shadow-md shadow-gray-400/30 px-4 py-2 mt-4">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('home', {
                  screen: 'ProfileRoutes',
                  params: { screen: 'EditProfile' },
                })
              }
              activeOpacity={0.8}
              className="flex-row border border-gray-100 items-center justify-between px-3 py-4 rounded-xl active:bg-gray-50 active:scale-97"
            >
              <View className="flex-row items-center gap-3">
                <Image className="w-6 h-6" tintColor={"black"} source={Icons.edit_text} />
                <Text className="text-base font-medium text-gray-800">Edit Profile</Text>
              </View>
              <Image className="w-6 h-6" source={Icons.next} />
            </TouchableOpacity>

            {/* Add Document */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('home', {
                  screen: 'ProfileRoutes',
                  params: { screen: 'AddDocuments' },
                })
              }
              activeOpacity={0.8}
              className="flex-row items-center border border-gray-100 justify-between px-3 py-4 rounded-xl active:bg-gray-50 active:scale-97"
            >
              <View className="flex-row items-center gap-3">
                <Image className="w-6 h-6" tintColor={"black"} source={Icons.add_file} />
                <Text className="text-base font-medium text-gray-800">Add Document</Text>
              </View>
              <Image className="w-6 h-6" source={Icons.next} />
            </TouchableOpacity>

            {/* Settings */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center border border-gray-100 justify-between px-3 py-4 rounded-xl active:bg-gray-50 active:scale-97"
            >
              <View className="flex-row items-center gap-3">
                <Image className="w-6 h-6" tintColor={"black"} source={Icons.setings} />
                <Text className="text-base font-medium text-gray-800">Settings</Text>
              </View>
              <Image className="w-6 h-6" source={Icons.next} />
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center border border-gray-100 justify-between px-3 py-4 rounded-xl active:bg-red-50 active:scale-97"
            >
              <View className="flex-row items-center gap-3">
                <Image className="w-6 h-6" source={Icons.logout} />
                <Text className="text-base font-medium text-red-600">Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Profile;