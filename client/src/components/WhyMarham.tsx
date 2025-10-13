import { View, Text } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const points = [
    "Verified and experienced doctors",
    "Book appointments in minutes",
    "Real patient reviews & ratings",
    "24/7 support for your health",
]

export default function WhyMarham() {
    return (
        <View className="w-full bg-white p-4">
            <Text className="text-lg font-bold text-slate-900">Why Health Cloud?</Text>
            <View className="mt-3">
                {points.map((p, i) => (
                    <View key={i} className="flex-row items-start mb-2">
                        <MaterialCommunityIcons name="check-circle" size={18} color="#10B981" style={{ marginTop: 2 }} />
                        <Text className="ml-2 text-slate-700 text-sm">{p}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}
