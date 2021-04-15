import { StyleSheet, Platform, Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;
const PINK = '#F29288';

export default StyleSheet.create({
    headerSafeArea: {
        flex: 1,
        top: Platform.OS === 'ios' ? 50 : 40,
    },
    footerSafeArea: {
        paddingBottom: Platform.OS === 'ios' ? 80 : 60,
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
        top: 6,
        alignSelf: 'stretch',
        width: width,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        flexDirection: 'row'
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
    },
    line: {
        alignSelf: 'stretch',
        height: 1.5,
        backgroundColor: PINK,
    },
});