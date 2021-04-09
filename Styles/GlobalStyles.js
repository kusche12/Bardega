import { StyleSheet, Platform, Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;

export default StyleSheet.create({
    headerSafeArea: {
        flex: 1,
        top: Platform.OS === 'ios' ? 50 : 40,
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
    headerWithButtons: {
        alignSelf: 'stretch',
        width: width,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 4
    }
});