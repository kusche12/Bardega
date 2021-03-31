import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const PINK = '#F29288';
const GRAY = '#a1a1a1'
const RADIUS = 22;
const SUBFONT = 15;

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 22
    },
    inputBox: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 4
    },
    title2: {
        fontSize: SUBFONT,
        fontWeight: '700'
    },
    input: {
        fontSize: 20,
        color: GRAY,
        textAlign: 'center'
    },
    photoContainer: {
        width: width * .8,
        height: height * .45,
        borderColor: '#707070',
        borderWidth: 1,
        borderRadius: RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    plusImage: {
        width: width * .16,
        height: width * .16
    },
    photoText: {
        color: '#707070',
        fontSize: SUBFONT,
        width: width * .3,
        textAlign: 'center'
    },
    ingrContainer: {
        width: width * .8,
        paddingHorizontal: 12,
        paddingTop: 14,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: RADIUS,
        marginBottom: 100, // Temp fix for development purposes

        shadowColor: "#000",
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 4
    },
    ingrTitle: {
        fontSize: 18,
        fontWeight: '700'
    },
    ingrTitle2: {
        fontSize: 12,
        color: GRAY
    },
    ingrLine: {
        alignSelf: 'stretch',
        height: 1.5,
        backgroundColor: PINK,
        marginBottom: 30,
        marginTop: 6,
    },
    ingrsubTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        marginBottom: 4
    },
    ingrsubText: {
        fontSize: 10,
        color: GRAY
    },
    dirInput: {
        fontSize: SUBFONT,
        color: GRAY,
        paddingHorizontal: 10
    },
});