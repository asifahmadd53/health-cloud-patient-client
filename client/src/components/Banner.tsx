import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity } from 'react-native';

export default function Banner() {
    const navigation = useNavigation<any>();

    return (
        <View style={{
            borderColor: 'rgba(40, 149, 203, 0.2)',
            backgroundColor: 'rgba(40, 149, 203, 0.1)',
        }} className="w-full rounded-2xl border border-indigo-200 px-4 py-4" >
            <View className="flex-row items-center justify-between">
                <View className="flex-1 pr-3">
                    <Text className="text-xs font-bold text-secondary">New</Text>
                    <Text className="mt-1 text-base font-extrabold text-primary">
                        Book trusted doctors on Health Cloud
                    </Text>
                    <Text className="mt-1 text-sm text-slate-700">
                        20k+ verified doctors, secure appointments, and real patient reviews.
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        navigation.navigate('home', {
                            screen: 'FaqRoute',
                        })
                    }
                    className="px-3 py-2 rounded-xl bg-secondary"
                >
                    <Text className="text-white font-semibold">FAQs</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}