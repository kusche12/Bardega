import { StyleSheet, Platform } from 'react-native';
import Styles from './StyleConstants';

export default StyleSheet.create({
    titlebold1: {
        fontFamily: "RaisonneMedium",
        fontSize: Platform.isPad ? 48 : 24,
    },
    titlebold2: {
        fontFamily: "RaisonneMedium",
        fontSize: Platform.isPad ? 36 : 20,
    },
    titlebold3: {
        fontFamily: "RaisonneMedium",
        fontSize: Platform.isPad ? 24 : 14,
    },
    title1: {
        fontFamily: "Raisonne",
        fontSize: Platform.isPad ? 48 : 24,
    },
    title2: {
        fontFamily: "Raisonne",
        fontSize: Platform.isPad ? 40 : 20,
    },
    title3: {
        fontFamily: "Raisonne",
        fontSize: Platform.isPad ? 28 : 14,
    },
    paragraphbold1: {
        fontFamily: "SourceSerifSemiBold",
        fontSize: Platform.isPad ? 30 : 18,
    },
    paragraphbold2: {
        fontFamily: "SourceSerifSemiBold",
        fontSize: Platform.isPad ? 24 : 16,
    },
    paragraphbold3: {
        fontFamily: "SourceSerifSemiBold",
        fontSize: Platform.isPad ? 20 : 14,
    },
    paragraph1: {
        fontFamily: "SourceSerifRegular",
        fontSize: Platform.isPad ? 30 : 18,
    },
    paragraph2: {
        fontFamily: "SourceSerifRegular",
        fontSize: Platform.isPad ? 24 : 16,
    },
    paragraph3: {
        fontFamily: "SourceSerifRegular",
        fontSize: Platform.isPad ? 20 : 14,
    },
    paragraph4: {
        fontFamily: "SourceSerifRegular",
        fontSize: Platform.isPad ? 20 : 12,
    },
    paragraphError1: {
        fontFamily: "SourceSerifSemiBold",
        fontSize: Platform.isPad ? 30 : 18,
        color: 'red'
    },
    paragraphError2: {
        fontFamily: "SourceSerifSemiBold",
        fontSize: Platform.isPad ? 24 : 16,
        color: 'red'
    },
    headerSafeArea: {
        flex: 1,
        top: Platform.OS === 'ios' ? 30 : 20,
    },
    footerSafeArea: {
        paddingBottom: Platform.OS === 'ios' ? 60 : 60,
    },
    flexCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabBarIcon: {
        width: Platform.isPad ? 50 : 35,
        height: Platform.isPad ? 50 : 35,
        resizeMode: 'contain'
    },
    tabBarIconMD: {
        width: Platform.isPad ? 60 : 43,
        height: Platform.isPad ? 60 : 43,
        resizeMode: 'contain'
    },
    headerContainer: {
        width: Styles.width,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: Styles.PINK,
        overflow: 'hidden',
        paddingLeft: 24,
        marginLeft: 48,
    },
    headerWithButtons: {
        top: 6,
        alignSelf: 'stretch',
        width: Styles.width,
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
        backgroundColor: Styles.DARK_PINK,
        marginTop: 4,
        marginBottom: 4
    },
});