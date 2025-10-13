import React, { useEffect, useState } from 'react';
import { Image, Keyboard, Pressable, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from '../../utils/libs/constants/Icons';
import DashBoard from '../../screens/Tabs/Dashboard';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { AddDocuments } from '../../screens';
import TopTabsLayout from '../TopTabsNavigation';
import Specialists from '../../screens/Specialist/Specialist';

const Tab = createBottomTabNavigator();

const TabLayout = () => {

  const AnimatedTabIcon = ({ source, focused, color }: any) => {
    const scale = useSharedValue(1)

    useEffect(() => {
      if (focused) {
        // Smooth pop-up effect
        scale.value = withSequence(
          withTiming(1.2, { duration: 180, easing: Easing.out(Easing.ease) }), // grow smoothly
          withSpring(1.1, { damping: 6, stiffness: 120 })
        )
      } else {
        scale.value = withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) })
      }
    }, [focused])

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }))

    return (
      <Animated.View style={animatedStyle}>
        <Image
          source={source}
          style={{
            width: 22,
            height: 22,
            tintColor: color,
            resizeMode: 'contain',
          }}
        />
      </Animated.View>
    )
  }

  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true))
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false))
    return () => {
      showSub.remove()
      hideSub.remove()
    }
  }, [])


  return (
    
    <SafeAreaView className="flex-1 bg-white">
      {/* Custom Header
      <View className="absolute top-3 left-3 right-0 z-30 p-4">
        <CustomHeader />
      </View> */}

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            paddingTop: 2,
          },
          tabBarStyle: {
            height: 70,
            paddingTop: 6,
            paddingBottom: 6,
            backgroundColor: '#ffffff',
            borderTopWidth: 0.5,
            borderTopColor: '#e2e8f0',
            elevation: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
            paddingHorizontal: 0,
            display: isKeyboardVisible ? 'none' : 'flex',
            position: isKeyboardVisible ? 'absolute' : 'relative',
            bottom: isKeyboardVisible ? -100 : 0,
          },

          tabBarActiveTintColor: '#0891b2',
          tabBarInactiveTintColor: '#64748b',
          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={null}
              onPress={(e) => {
                e?.preventDefault?.()
                props.onPress?.()
              }}
            />
          ),
        }}
      >
        <Tab.Screen
          name="Home"
          component={DashBoard}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon
                source={focused ? Icons.homeFilled : Icons.homeOutline}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Appointments"
          component={TopTabsLayout}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon
                source={focused ? Icons.appointmentFilled : Icons.appointmentOutline}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Find Doctors"
          component={Specialists}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon
                source={focused ? Icons.profileFilled : Icons.profileOutline}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Documents"
          component={AddDocuments}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon
                source={focused ? Icons.documentFilled : Icons.documentOutline}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name="MyFamily"
          component={MyFamily}
          options={{
            tabBarIcon: () => <Image className="w-8 h-8" source={Icons.user} />,
            tabBarLabel: 'My Family',
          }}
        /> */}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabLayout;
