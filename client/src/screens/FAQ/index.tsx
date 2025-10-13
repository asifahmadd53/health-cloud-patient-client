import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Accordion from "../../components/Accordian"
import Header from "../../components/Header"

const items = [
    {
        question: "What is Marham?",
        answer:
            "Marham connects patients with verified doctors for online and in-person appointments, backed by real patient reviews.",
    },
    {
        question: "How do I book an appointment?",
        answer:
            "Search a doctor, pick a time, and confirm your booking in minutes. You can view all upcoming appointments on your dashboard.",
    },
    {
        question: "Are the doctors verified?",
        answer:
            "Yes, we verify experience and credentials. You can also read ratings and reviews to make informed decisions.",
    },
    {
        question: "Do you support online consultations?",
        answer: "Yes. Many specialists offer video consultations. Check the doctor profile for availability and fees.",
    },
]

export default function FAQScreen() {
    const navigation: any = useNavigation()
    return (
        <SafeAreaView className="flex-1 bg-white">
            <Header title="FAQs"/>
            <ScrollView className="flex-1 px-5 py-4">
                <Text className="text-xl font-extrabold text-slate-900">Frequently Asked Questions</Text>
                <Text className="mt-1 text-slate-700">
                    Everything you need to know about booking, doctors, and consultations.
                </Text>

                <View className="mt-4">
                    <Accordion items={items} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
