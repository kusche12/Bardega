import { StyleSheet } from 'react-native';
import Styles from './StyleConstants';
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
        width: 100,
        alignItems: 'center',
        paddingVertical: 4,
        backgroundColor: 'white',
    },
    buttonFilled: {
        backgroundColor: Styles.DARK_PINK,
        borderColor: Styles.DARK_PINK
    },
    buttonNotification: {
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 70,
        height: 40,
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
    followerHeader: {
        height: Styles.height * .04,
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
        color: Styles.GRAY
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
    },
    settingsButton: {
        width: Styles.width,
        height: 45,
        backgroundColor: Styles.PINK,
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    indexButtonContainer: {
        width: Styles.width / 2,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center'
    },
    indexButtonLine: {
        width: Styles.width / 2,
        backgroundColor: Styles.DARK_GRAY,
        height: 1.75,
        alignSelf: 'flex-start'
    },
    requestNumContainer: {
        backgroundColor: Styles.DARK_PINK,
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }
});