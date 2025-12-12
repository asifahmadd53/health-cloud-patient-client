import { View, Text, TouchableOpacity } from "react-native"
import { LinearProgress } from "@rneui/themed"

interface DocumentCardProps {
    name: string
    progress?: number
    isUploading: boolean
    onRemove: () => void
}

export default function DocumentCard({ name, progress = 0, isUploading, onRemove }: DocumentCardProps) {
    const showProgress = progress < 1

    return (
        <View className="bg-white p-4 rounded-lg shadow-md mb-3 mx-2">
            <View className="flex-row items-center justify-between mb-2">
                <Text className="font-semibold text-base flex-1" numberOfLines={1}>
                    {name}
                </Text>
                <TouchableOpacity onPress={onRemove} className="ml-2">
                    {/* Add an X icon or similar here if you want */}
                </TouchableOpacity>
            </View>

            {showProgress && (
                <View className="mt-2">
                    <View className="flex-row items-center justify-between mb-1">
                        <Text className="text-xs text-gray-600">{isUploading ? "Uploading..." : "Complete"}</Text>
                        <Text className="text-xs text-gray-600">{Math.round(progress * 100)}%</Text>
                    </View>
                    <LinearProgress
                        value={progress} 
                        style={{ height: 6, borderRadius: 3 }}
                        color="#2895cb"
                        trackColor="#e0e0e0"
                        variant={isUploading && progress === 0 ? "indeterminate" : "determinate"} // fix indeterminate
                    />
                </View>
            )}

            {!showProgress && (
                <View className="flex-row items-center mt-1">
                    {/* Optional checkmark icon */}
                    <Text className="text-xs text-green-600">Upload Complete</Text>
                </View>
            )}
        </View>
    )
}
