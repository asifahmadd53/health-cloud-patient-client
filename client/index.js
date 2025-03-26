/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import "./global.css"
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => App);
