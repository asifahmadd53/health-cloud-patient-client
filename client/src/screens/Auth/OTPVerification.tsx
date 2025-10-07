import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ScrollView, TextInput, Animated } from "react-native"
import { useRef, useState, useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRoute } from "@react-navigation/native"
import CustomButton from "../../components/CustomButton"
import Header from "../../components/Header"

const OTP = () => {
  const route = useRoute<any>()
  const email = route.params?.email || "your email"

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ]

  const [otp, setOtp] = useState(["", "", "", ""])
  const [activeIndex, setActiveIndex] = useState(0)

  const scales = otp.map(() => useRef(new Animated.Value(1)).current)

  const animateInput = (index: number) => {
    Animated.sequence([
      Animated.timing(scales[index], {
        toValue: 1.1,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scales[index], {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start()
  }

  // Handle OTP input change
  const handleOtpChange = (text: string, index: number) => {
    if (/^[0-9]?$/.test(text)) {
      const newOtp = [...otp]
      newOtp[index] = text
      setOtp(newOtp)

      if (text) {
        animateInput(index)
        if (index < inputRefs.length - 1) {
          inputRefs[index + 1].current?.focus()
        }
      }
    }
  }

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="OTP Verification" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          className="px-5 pt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="mb-8 mt-6">
            <Text className="text-2xl font-bold text-gray-800">Verification Code</Text>
            <Text className="text-base pt-2 text-gray-600">
              We've sent a 4-digit code to {email}. Enter the code below to verify.
            </Text>
          </View>

          {/* OTP Input Fields */}
          <View className="flex-row justify-between items-center mb-8">
            {otp.map((digit, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.otpBox,
                  {
                    transform: [{ scale: scales[index] }],
                    borderColor: activeIndex === index ? "#0891b2" : "#e5e5e5",
                  },
                ]}
              >
                <TextInput
                  ref={inputRefs[index]}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  autoFocus={index === 0}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(-1)}
                  selectionColor="#0891b2"
                  textAlign="center"
                  textContentType="oneTimeCode"
                  autoComplete="one-time-code"
                />
              </Animated.View>
            ))}
          </View>
          <CustomButton
            link='drawer'
            label="Verify & Continue"
            // disabled={otp.join("").length !== 4}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default OTP

const styles = StyleSheet.create({
  otpBox: {
    width: 65,
    height: 65,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginHorizontal: 4,
  },
  otpInput: {
    fontSize: 24,
    fontWeight: "600",
    width: "100%",
    textAlign: "center",
    color: "#111",
  },
})
