import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Icons from "../utils/constants/Icons";
import { useNavigation } from "@react-navigation/native";
import Images from "../utils/constants/Images";

const { width } = Dimensions.get("window");
const isTablet = width > 768;

interface DoctorCardProps {
    name: string;
    speciality: string;
    fee: number;
    city: string;
    image?: string;
    onPress?: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
    name,
    speciality,
    fee,
    city,
    image,
    onPress,
}) => {
    const navigation: any = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress || (() => navigation.navigate("DrProfileRoutes"))}
        >
            <View className="flex-row items-center bg-white border border-slate-200 shadow-md rounded-2xl px-4 py-3 mb-4 shadow-slate-200">
                <Image
                    className="rounded-full border border-gray-200"
                    style={{ width: isTablet ? 80 : 60, height: isTablet ? 80 : 60 }}
                    source={image ? { uri: image } : Images.d3}
                />

                {/* Doctor Details */}
                <View className="flex-1 ml-4">
                    <Text className="text-lg font-extrabold text-gray-900 lg:text-xl">
                        {name || "Unknown Doctor"}
                    </Text>
                    <Text className="text-sm font-medium text-gray-600 lg:text-lg">
                        {speciality || "General Practitioner"}
                    </Text>

                    {/* Rating & Location Section */}
                    <View className="flex-row justify-between items-end">
                        <Text className="text-sm font-medium text-green-700 lg:text-lg mt-1">
                            Fee: ${fee || "N/A"} per session
                        </Text>

                        <View className="flex-row items-center gap-1">
                            <Image
                                className="w-5 lg:w-8 h-5 lg:h-8 opacity-80"
                                source={Icons.location}
                            />
                            <Text className="text-sm font-semibold text-gray-700 lg:text-lg">
                                {city || "Unknown"}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default DoctorCard;
