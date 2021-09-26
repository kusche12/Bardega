import { StyleSheet, Platform } from 'react-native';
import Styles from './StyleConstants';

const PINK = '#F29288';
const GRAY = '#a1a1a1'
const RADIUS = 22;
const SUBFONT = 15;

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 40,
        paddingRight: 8,
    },
    inputBox: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 4,
    },
    photoContainer: {
        width: Platform.isPad ? Styles.width * .7 : Styles.width * .8,
        height: Styles.height * .45,
        borderColor: '#707070',
        borderWidth: 1,
        borderRadius: RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: Platform.isPad ? 40 : 20,
        overflow: 'hidden'
    },
    drinkImage: {
        width: Platform.isPad ? Styles.width * .7 : Styles.width * .8,
        height: Styles.height * .45,
    },
    plusImage: {
        width: Platform.isPad ? Styles.width * .10 : Styles.width * .16,
        height: Platform.isPad ? Styles.width * .10 : Styles.width * .16,
        marginBottom: 8
    },
    ingrContainer: {
        width: Platform.isPad ? Styles.width * .7 : Styles.width * .8,
        paddingHorizontal: 12,
        paddingTop: 14,
        paddingBottom: 12,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 22,
        marginBottom: 40,

        shadowColor: "#000",
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 4
    },
    ingrContainerWide: {
        width: Platform.isPad ? Styles.width * .85 : Styles.width * .95,
        paddingHorizontal: 24,
        paddingTop: 14,
        paddingBottom: 24,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 22,
        marginBottom: 20,

        shadowColor: "#000",
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 4
    },
    ingrsubTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        marginBottom: 4
    },
    dirInput: {
        fontSize: SUBFONT,
        color: GRAY,
        paddingHorizontal: 10
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        flex: 1,
    },
    tag: {
        backgroundColor: Styles.ADA_DARK_PINK,
        borderRadius: 10,
        marginHorizontal: 2,
        marginVertical: 2,
        paddingHorizontal: 4,
        paddingVertical: 3,
        flexGrow: 1,
        alignItems: 'center',
        width: Styles.width * .18,
        maxWidth: Styles.width * .23,
    },
    unselectedTag: {
        backgroundColor: 'white',
        borderColor: Styles.ADA_DARK_PINK,
        borderWidth: 1.5
    },
    submitBtn: {
        width: Styles.width * .8,
        paddingVertical: 4,
        borderRadius: RADIUS,
        backgroundColor: PINK,
        marginBottom: 20,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: "#000",
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 4
    },
    cancelBtn: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: Styles.DARK_PINK,
        marginBottom: 40,
    }
});