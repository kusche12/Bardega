import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    headerSafeArea: {
        flex: 1,
        top: Platform.OS === 'ios' ? 50 : 40
    },
    flexCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabBarIcon: {
        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
    tabBarIconMD: {
        width: 43,
        height: 43,
        resizeMode: 'contain'
    },
});