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
            className={`flex-row items-center gap-4 py-2 lg:py-2 lg:px-5 px-3 self-start rounded-xl border border-slate-200 shadow-md bg-white shadow-slate-300 mr-2 ${active
                    ? 'bg-secondary/80 border-secondary'
                    : 'bg-white border-slate-200 shadow-slate-300'
                }`}
        >
            <View
                className={`p-2 lg:p-5 rounded-full border ${active ? 'bg-white/20 border-white/40' : 'bg-gray-100 border-gray-300'
                    }`}
            >
                <Image
                    style={{ width: isTablet ? 24 : 18, height: isTablet ? 24 : 18 }}
                    source={icon}
                />
            </View>
            <Text
                className={`text-base font-semibold ${active ? 'text-white' : 'text-gray-800'
                    }`}
            >
                {title}
            </Text>
        </View>
    );
};

export default Categories;




    // < View className = "flex-row items-center gap-4 py-2 lg:py-2 lg:px-5 px-3 self-start rounded-xl border border-slate-200 shadow-md bg-white shadow-slate-300 mr-5" >