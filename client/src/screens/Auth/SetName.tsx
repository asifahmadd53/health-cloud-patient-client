import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  ActivityIndicator,        // ← new
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../../utils/constants/Images';
import CustomButton from '../../components/CustomButton';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import { profileSchema } from '../../validators/profileValidator';
import { createPatientProfile } from '../../services/patientServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FormData = z.infer<typeof profileSchema>;

const SetName: React.FC = () => {
  const navigation = useNavigation<any>();
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { name: '' },
  });

  const onSubmit = async ({ name }: FormData) => {
    setSubmitting(true);
    try {
      await createPatientProfile({ name });
      navigation.navigate('drawer');
    } catch (err: any) {
      Alert.alert(
        'Error',
        err?.response?.data?.message || 'Failed to create profile'
      );
    } finally {
      setSubmitting(false);
    }
  };






  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          className="px-5 pt-6"
        >
          {/* Header */}
          <View className="mt-12">
            <View className="flex-row items-center gap-2">
              <Image
                source={Images.logo}
                className="w-16 h-16"
                resizeMode="contain"
              />
            </View>
            <Text className="text-2xl font-bold mt-6">Set Up Your Profile</Text>
            <Text className="text-sm text-gray-500 mt-3">
              Please enter your full name to continue. You can update it later in your profile settings.
            </Text>

          </View>

          <View className="pt-5 w-full gap-2">
            <Controller
              control={control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Enter your name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="John Doe"
                />
              )}
            />
            {errors.name && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </Text>
            )}

          </View>

          {/* CTA */}
          <View className="my-8">

            <CustomButton
              onPress={handleSubmit(onSubmit)}
              loading={submitting}
              label="Continue"
            // onPress={handleSubmit(onSubmit)}
            />

          </View>

          {/* Footer */}
          <View className="items-center px-4">
            <Text className="text-xs text-gray-500 text-center">
              ⚕️ Your number is only used for{' '}
              <Text className="font-semibold">secure verification</Text> and{' '}
              <Text className="font-semibold">appointment updates</Text>.
            </Text>
            <Text className="text-xs text-gray-500 text-center mt-3">
              By continuing, you agree to our{' '}
              <Text className="text-secondary font-semibold">
                Terms & Conditions
              </Text>
            </Text>
            <Text className="text-xs text-gray-500 text-center mt-3">
              Need help?{' '}
              <Text className="text-secondary font-semibold">
                Contact Support
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SetName;