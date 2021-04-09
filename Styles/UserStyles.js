import { StyleSheet, Platform, Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const PINK = '#F29288';
const GRAY = '#a1a1a1'
const RADIUS = 22;
const SUBFONT = 15;

export default StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    infoContainer: {
        width: width * .9,
        marginBottom: 30
    },
    profileImage: {
        borderRadius: 100,
        width: width * .25,
        height: width * .25
    },
    buttonRow: {
        flexDirection: 'row'
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoTextContainer: {
        marginLeft: 8
    },
    title: {
        fontSize: 24,
        fontWeight: '500'
    },
    subtitle: {
        fontSize: 14
    },
    button: {
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: 'white'
    },
    buttonFavorites: {
        flexDirection: 'row',
        backgroundColor: PINK,
        borderColor: PINK
    },
    heartImg: {
        width: 18,
        height: 16,
        marginRight: 4,
    },
    statBox: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: height * .11,
        width: width * .27,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 4,
        backgroundColor: 'white',
    },
    statContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    drinkContainer: {
        flex: 1,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderColor: 'white',
        borderWidth: 1,
        resizeMode: 'contain'
    },
    drinkImage: {
        width: width * .333,
        height: width * .333,
    },
    allDrinksContainer: {
        width: width
    }
});