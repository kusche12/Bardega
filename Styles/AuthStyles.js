import { StyleSheet, Dimensions, Platform } from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const PINK = '#F29288';
const GRAY = '#a1a1a1'
const RADIUS = 22;
const SUBFONT = 15;

export default StyleSheet.create({
    container: {
        width: width,
        height: height,
        top: Platform.OS === 'ios' ? 50 : 30,
        alignItems: 'center',
    },
    splashBackground: {
        width: width,
        height: height,
    },
    bardegaLogo: {
        position: 'absolute',
        width: width,
        height: width,
        alignSelf: 'center',
        top: height * .1
    },
    screenLogo: {
        width: width,
        height: height * .25,
        alignSelf: 'center',
        resizeMode: 'center',
        marginBottom: 8,
    },
    background: {
        bottom: 0,
        left: -100,
        width: width * 1.6,
        height: height * 2,
        position: 'absolute',
        transform: [{ rotateX: '180deg' }],
        zIndex: -1,
        opacity: .7,
    },
    form: {
        alignSelf: 'center',
    },
    loginForm: {
        alignSelf: 'center',
        marginTop: 50,
    },
    forgotForm: {
        alignSelf: 'center',
        marginTop: 40,
        width: width * .8
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
        width: width * .8,
    },
    input: {
        height: 40,
        color: '#333',
        fontWeight: '500'
    },
    mainButton: {
        width: width * .8,
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
        width: width,
        justifyContent: 'center'
    },
    thirdPartyAuth: {
        width: width * .14,
        height: width * .14,
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