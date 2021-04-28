import { StyleSheet, Dimensions } from 'react-native';
import Styles from './StyleConstants';

const PINK = '#F29288';

export default StyleSheet.create({
    container: {
        width: Styles.width,
        height: Styles.height,
        top: Platform.OS === 'ios' ? 50 : 30,
        alignItems: 'center',
    },
    form: {
        alignSelf: 'center',
        width: Styles.width * .8
    },
    loginForm: {
        alignSelf: 'center',
        marginTop: 50,
        width: Styles.width * .8
    },
    forgotForm: {
        alignSelf: 'center',
        marginTop: 40,
        width: Styles.width * .8
    },
    inputImg: {
        width: 22,
        height: 21,
        marginRight: 15,
    },
    inputContainer: {
        marginBottom: Platform.OS === 'ios' ? 15 : 10,
        borderBottomColor: PINK,
        borderBottomWidth: 1.2,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: Styles.width * .8,
    },
    input: {
        height: 40,
        color: '#333',
        fontWeight: '500'
    },
    mainButton: {
        width: Styles.width * .8,
        marginBottom: 20,
        height: 50,
        backgroundColor: PINK,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,

        shadowColor: "#000",
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 4
    },
    thirdPartyButtons: {
        flexDirection: 'row',
        width: Styles.width,
        justifyContent: 'center'
    },
    thirdPartyAuth: {
        width: Styles.width * .14,
        height: Styles.width * .14,
        marginLeft: 8,
        marginRight: 8
    },
    footer: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: Platform.OS === 'ios' ? 70 : 100,
        alignItems: 'center'
    }
});