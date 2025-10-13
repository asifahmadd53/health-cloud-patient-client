"use client"

import { useState } from "react"
import { View, Image, TouchableOpacity, Text, Modal } from "react-native"
// Optional video support if you have react-native-video installed:
import Video from 'react-native-video'

type PhoneVideoProps = {
    posterUri?: string
    videoUri?: string // mp4/hls URL if using WebView/Video
}

export default function PhoneVideo({ posterUri, videoUri }: PhoneVideoProps) {
    const [open, setOpen] = useState(false)

    return (
        <View className="w-full items-center">
            <View className="rounded-3xl border border-gray-300 bg-white p-2" style={{ width: 90, height: 180 }}>
                <View className="rounded-2xl overflow-hidden bg-black flex-1">
                    <TouchableOpacity activeOpacity={0.9} onPress={() => setOpen(true)} className="flex-1">
                        <Image
                            className="w-full h-full"
                            resizeMode="cover"
                            source={{
                                uri:
                                    posterUri ||
                                    "https://images.unsplash.com/photo-1518887573-09d1cd29b931?q=80&w=800&auto=format&fit=crop",
                            }}
                        />
                        <View className="absolute inset-0 items-center justify-center">
                            <View className="bg-white/90 rounded-full px-4 py-2">
                                <Text className="text-black font-bold">Play</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
                <View className="flex-1 bg-black/80 items-center justify-center px-4">
                    <View className="w-full max-w-[420] rounded-2xl overflow-hidden bg-black">
                        {/* If you have react-native-video, uncomment and use Video here:*/}
            <Video
              source={{ uri: videoUri || 'https://www.w3schools.com/html/mov_bbb.mp4' }}
              style={{ width: '100%', height: 320 }}
              resizeMode="contain"
              controls
            />
            
                        {/* Fallback poster if no video lib */}
                        {/* <Image
                            className="w-full"
                            style={{ height: 320 }}
                            resizeMode="contain"
                            source={{
                                uri:
                                    posterUri ||
                                    "https://images.unsplash.com/photo-1518887573-09d1cd29b931?q=80&w=800&auto=format&fit=crop",
                            }}
                        /> */}
                    </View>

                    <TouchableOpacity
                        onPress={() => setOpen(false)}
                        className="mt-4 bg-white rounded-full px-5 py-2"
                        activeOpacity={0.85}
                    >
                        <Text className="text-gray-900 font-bold">Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}
