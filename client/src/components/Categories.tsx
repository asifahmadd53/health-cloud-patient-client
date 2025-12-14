import { Dimensions, Image, Text, View } from 'react-native';
import React from 'react';

interface CategoriesProps {
    title: string;
    icon: any;
    active?: boolean;
}

const { width } = Dimensions.get('window');
const isTablet = width > 768;

const Categories = ({ title, icon, active = false }: CategoriesProps) => {
    return (
        <View
            style={{
                backgroundColor: active ? 'rgba(40, 149, 203, 0.8)' : '#F5F7FA', // soft light gray
                borderColor: active ? 'rgba(40, 149, 203, 0.5)' : '#E2E8F0', // slate-200
            }}
            className={`flex-row items-center gap-4 py-2 lg:py-2 lg:px-5 px-3 self-start rounded-xl border shadow-md shadow-slate-300 mr-3
                ${active ? 'scale-100' : 'scale-100'}
                `}
        >
            <View
                className={`p-2 lg:p-5  rounded-full border ${active ? 'bg-gray-100 border-gray-300' : 'bg-gray-100 border-gray-300 '
                    }`}
            >
                <Image
                    style={{ width: isTablet ? 24 : 18, height: isTablet ? 24 : 18 }}
                    source={icon}
                />
            </View>
            <Text
                className={`text-base border-none bg-none bg-tr pr-3 font-semibold ${active ? 'text-white' : 'text-black'
                    }`}
            >
                {title}
            </Text>
        </View>
    );
};

export default Categories;

