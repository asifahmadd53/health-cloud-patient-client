import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform, Linking, Alert} from 'react-native';

export const getUserLocation = async (): Promise<string> => {
  try {
    // Android only: request runtime permissions
    if (Platform.OS === 'android') {
      const fine = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      const coarse = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );

      if (!fine || !coarse) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);

        if (
          granted['android.permission.ACCESS_FINE_LOCATION'] !==
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.ACCESS_COARSE_LOCATION'] !==
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          Alert.alert(
            'Permission Required',
            'Please allow location access to fetch your current location.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: () => Linking.openSettings()},
            ],
          );
          throw new Error('Location permission denied');
        }
      }
    }

    // Apply RN config before calling getCurrentPosition
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
      locationProvider: 'auto',
    });

    // Request the current position
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          const locationString = `Lat: ${latitude.toFixed(
            4,
          )}, Lng: ${longitude.toFixed(4)}`;
          console.log('📍 Got location:', locationString);
          resolve(locationString);
        },
        error => {
          console.error('❌ Location error:', error);
          // Handle specific cases
          if (error.code === 2) {
            Alert.alert(
              'GPS Disabled',
              'Please enable GPS (High Accuracy mode) in settings.',
            );
          } else if (error.code === 1) {
            Alert.alert('Permission Denied', 'Location permission is denied.');
          } else {
            Alert.alert('Error', 'Unable to get location, try again.');
          }
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 5000,
          forceRequestLocation: true,
          showLocationDialog: true, // ✅ opens native GPS dialog if off
        },
      );
    });
  } catch (err) {
    console.error('🚫 Error fetching location:', err);
    throw err;
  }
};
