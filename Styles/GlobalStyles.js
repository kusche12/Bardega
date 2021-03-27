import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    headerSafeArea: {
        flex: 1,
        top: Platform.OS === 'ios' ? 50 : 40
    },
});