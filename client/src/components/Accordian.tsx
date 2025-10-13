import { useState } from "react"
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native"

if (Platform.OS === "android" && !global?.nativeFabricUIManager && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

type Item = { question: string; answer: string }

export default function Accordion({ items }: { items: Item[] }) {
    const [open, setOpen] = useState<number | null>(0)

    const toggle = (i: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setOpen(open === i ? null : i)
    }

    return (
        <View className="w-full">
            {items.map((it, i) => {
                const expanded = open === i
                return (
                    <View key={i} className="mb-3 rounded-xl border border-gray-200 bg-white overflow-hidden">
                        <TouchableOpacity activeOpacity={0.9} onPress={() => toggle(i)} className="px-4 py-3 bg-gray-50">
                            <Text className="text-gray-900 font-semibold">{it.question}</Text>
                        </TouchableOpacity>
                        {expanded ? (
                            <View className="px-4 py-3">
                                <Text className="text-gray-700">{it.answer}</Text>
                            </View>
                        ) : null}
                    </View>
                )
            })}
        </View>
    )
}