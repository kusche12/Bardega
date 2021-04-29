import { StyleSheet } from 'react-native';
import Styles from './StyleConstants';
const PINK = '#F29288';
const GRAY = '#a1a1a1'
const RADIUS = 22;

const FAVEIMAGEWIDTH = Styles.width * .45;

export default StyleSheet.create({
    infoContainer: {
        width: Styles.width * .95,
        marginBottom: 30,
        paddingLeft: 8
    },
    profileImage: {
        borderRadius: 100,
        width: Styles.width * .22,
        height: Styles.width * .22
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: '500'
    },
    subtitle: {
        fontSize: 14
    },
    button: {
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: 'white',
    },
    buttonFavorites: {
        flexDirection: 'row',
        backgroundColor: Styles.DARK_PINK,
        borderColor: Styles.DARK_PINK
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
        height: Styles.height * .11,
        width: Styles.width * .27,
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
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderColor: 'white',
        borderWidth: 1,
        resizeMode: 'contain'
    },
    drinkImage: {
        width: Styles.width * .333,
        height: Styles.width * .333,
    },
    allDrinksContainer: {
        width: Styles.width,
    },
    followerHeader: {
        height: Styles.height * .05,
        width: Styles.width,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title2: {
        fontWeight: '500',
        fontSize: 20,
    },
    followRow: {
        width: Styles.width,
        height: 60,
        flexDirection: 'row',
        paddingLeft: 20,
        alignItems: 'center'
    },
    followImage: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    faveImage1: {
        width: FAVEIMAGEWIDTH,
        height: FAVEIMAGEWIDTH
    },
    faveImage2: {
        width: FAVEIMAGEWIDTH / 2,
        width: FAVEIMAGEWIDTH / 2,
        borderWidth: 1,
        borderColor: 'white',
    },
    faveImage3: {
        width: FAVEIMAGEWIDTH,
        height: FAVEIMAGEWIDTH,
        bottom: FAVEIMAGEWIDTH / 4,
        zIndex: 1
    },
    favoriteImagesContainer: {
        width: FAVEIMAGEWIDTH,
        height: FAVEIMAGEWIDTH,
        overflow: 'hidden',
        borderRadius: RADIUS,
    },
    favoriteRow: {
        flexDirection: 'row',
        height: FAVEIMAGEWIDTH / 2,
        overflow: 'hidden',
        zIndex: 900,
        borderBottomWidth: 1,
        borderBottomColor: 'white',

    },
    favoritesBox: {
        marginLeft: 6,
        marginRight: 6,
        alignContent: 'center'
    },
    favoritesTitle: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center'
    },
    collectionInputContainer: {
        paddingLeft: 16,
    },
    collectionText: {
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 24
    },
    collectionDelete: {
        color: 'red',
        fontSize: 16,
        marginBottom: 16
    },
    collectionSubtitle: {
        fontSize: 12,
        color: GRAY
    },
    settingsButton: {
        width: Styles.width,
        height: 40,
        backgroundColor: PINK
    },
    cogContainer: {
        position: 'absolute',
        right: 16,
        top: -24
    },
    settingsCog: {
        width: 30,
        height: 30
    },
    profileInputContainer: {
        flexDirection: 'row',
        width: Styles.width,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: Styles.LIGHT_GRAY
    },
    profileInputBio: {
        marginTop: 4,
        paddingHorizontal: 8,
        paddingBottom: 20,
    }
});