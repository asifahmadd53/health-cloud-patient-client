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
import PhoneInput from '@linhnguyen96114/react-native-phone-input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSchema } from '../../validators/authValidators';
import { z } from 'zod';
import { patientAuth } from '../../services/authServices';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FormData = z.infer<typeof authSchema>;

const PatientAuth: React.FC = () => {
  const navigation = useNavigation<any>();
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { phone: '' },
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const clean = data.phone.replace(/^0+/, '');
      const patientNumber = `+92${clean}`;

      const res = await patientAuth({ patientNumber });

      if (res?.token) {
        await AsyncStorage.setItem('authToken', res.token);
        await AsyncStorage.setItem('patientPhone', patientNumber); 
      } else {
        console.warn('No token received from backend');
      }

      navigation.replace('OTPVerification', { phone: patientNumber });

    } catch (e: any) {
      console.error('Patient auth error:', e);

      const message =
        e?.response?.data?.message ||
        e?.message ||
        'Something went wrong. Please try again.';

      Alert.alert('Error', String(message));
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
            <Text className="text-2xl font-bold mt-6">Sign Up or Log In</Text>
            <Text className="text-sm text-gray-500 mt-3">
              Enter your phone number to continue. No verification code needed for now.
            </Text>
          </View>

          {/* Phone Input */}
          <View className="pt-5 w-full gap-2">
            <Text className="text-base font-semibold tracking-wider">Phone #</Text>
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <View
                  className={`border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                  <PhoneInput
                    defaultCode="PK"
                    defaultValue={value}
                    onChangeFormattedText={(text) =>
                      onChange(text.replace(/\D/g, '').slice(-10))
                    }
                    disableArrowIcon
                    withShadow={false}
                    autoFocus
                    containerStyle={{
                      width: '100%',
                      borderRadius: 8,
                      backgroundColor: 'transparent',
                      height: 46,
                    }}
                    flagButtonStyle={{
                      width: 60,
                      justifyContent: 'center',
                      marginRight: -2,
                    }}
                    codeTextStyle={{
                      marginLeft: -8,
                      marginRight: 6,
                      paddingRight: 0,
                    }}
                    textContainerStyle={{
                      paddingVertical: 0,
                      paddingHorizontal: 0,
                      backgroundColor: 'transparent',
                    }}
                  />
                </View>
              )}
            />
            {errors.phone && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </Text>
            )}
          </View>

          {/* CTA */}
          <View className="my-8">

            <CustomButton
              loading={submitting}
              label="Continue"
              onPress={handleSubmit(onSubmit)}
              // onPress={() => navigation.navigate('SetName')}
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

export default PatientAuth;