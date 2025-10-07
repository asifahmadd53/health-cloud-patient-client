import { Image, Pressable, View } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Icons from '../utils/libs/constants/Icons';

const CustomHeader = () => {
  const navigation = useNavigation();
  return (
    <View className="absolute h-9 w-9 md:w-12 md:h-12">
      <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Image resizeMode="contain" className="object-cover w-full h-full" source={Icons.menu} />
      </Pressable>
    </View>
  );
};

export default CustomHeader;