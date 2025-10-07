import { Dimensions, Image, Text, View } from 'react-native'
import React from 'react'

interface CategoriesProps {
    title: string
    icon: any
}

const {width, height} = Dimensions.get('window')
const isTablet = width > 768

const Categories = ({ title, icon }: CategoriesProps) => {
    return (
        <View className="flex-row items-center gap-4 py-2 lg:py-2 lg:px-5 px-3 self-start rounded-xl border border-slate-200 shadow-md bg-white shadow-slate-300 mr-5">
            <View className="bg-gray-100 p-2 lg:p-5 rounded-full border border-gray-300">
                <Image style={{ width: isTablet ? 28 : 22, height: isTablet ? 28 : 22 }} source={icon} />
            </View>
            <Text className="text-base font-semibold text-gray-800">{title}</Text>
        </View>
    )
}

export default Categories
