import { View, Text, Image } from "react-native"
import Icons from "../utils/constants/Icons"
import CustomSecondaryButton from "./CustomSecondaryButton"

export default function UploadBox({ title, onBrowse }: { title: string; onBrowse: () => void }) {
    return (
        <View className="mt-10 bg-white border border-dashed border-gray-300 rounded-lg py-6 mx-2 shadow-md">
            <Text className="text-center text-2xl mb-3">{title}</Text>

            <View className="items-center gap-3">
                <Image className="w-20 h-20" source={Icons.cloud_computing} />

                <CustomSecondaryButton className="bg-secondary" label="Browse File" onPress={onBrowse} />

                <Text className="text-xs text-slate-500">Supported: JPEG, PNG, PDF</Text>
            </View>
        </View>
    )
}
