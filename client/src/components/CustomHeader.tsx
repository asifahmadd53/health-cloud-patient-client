// components/CustomHeader.js
import { Image, Pressable, View } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Icons from '../utils/libs/constants/Icons';


const CustomHeader = () => {
  const navigation = useNavigation();
  return (
    <View className="absolute z-30 h-11 w-11 md:w-14 md:h-14">
      <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Image resizeMode="contain" className="object-cover w-full h-full" source={Icons.menu} />
      </Pressable>
    </View>
  );
};

export default CustomHeader;