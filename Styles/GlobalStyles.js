import { StyleSheet, Platform } from 'react-native';
import Styles from './StyleConstants';

export default StyleSheet.create({
    titlebold1: {
        fontFamily: "RaisonneMedium",
        fontSize: 24,
    },
    titlebold2: {
        fontFamily: "RaisonneMedium",
        fontSize: 20,
    },
    titlebold3: {
        fontFamily: "RaisonneMedium",
        fontSize: 14,
    },
    title1: {
        fontFamily: "Raisonne",
        fontSize: 24,
    },
    title2: {
        fontFamily: "Raisonne",
        fontSize: 20,
    },
    title3: {
        fontFamily: "Raisonne",
        fontSize: 14,
    },
    paragraphbold1: {
        fontFamily: "SourceSerifSemiBold",
        fontSize: 18,
    },
    paragraphbold2: {
        fontFamily: "SourceSerifSemiBold",
        fontSize: 16,
    },
    paragraphbold3: {
        fontFamily: "SourceSerifSemiBold",
        fontSize: 14,
    },
    paragraph1: {
        fontFamily: "SourceSerifRegular",
        fontSize: 18,
    },
    paragraph2: {
        fontFamily: "SourceSerifRegular",
        fontSize: 16,
    },
    paragraph3: {
        fontFamily: "SourceSerifRegular",
        fontSize: 14,
    },
    paragraph4: {
        fontFamily: "SourceSerifRegular",
        fontSize: 12,
    },
    paragraphError1: {
        fontFamily: "SourceSerifSemiBold",
        fontSize: 18,
        color: 'red'
    },
    paragraphError2: {
        fontFamily: "SourceSerifSemiBold",
        fontSize: 16,
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
        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
    tabBarIconMD: {
        width: 43,
        height: 43,
        resizeMode: 'contain'
    },
    headerContainer: {
        width: Styles.width,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: Styles.PINK,
        overflow: 'hidden',
        paddingLeft: 48,
        paddingBottom: 6
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