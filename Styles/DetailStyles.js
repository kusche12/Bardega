import { StyleSheet, Platform } from 'react-native';
import Styles from './StyleConstants';
const RADIUS = 22;

export default StyleSheet.create({
    editImage: {
        width: Platform.isPad ? 40 : 20,
        height: Platform.isPad ? 40 : 20,
        top: 6,
        resizeMode: 'contain',
        justifyContent: 'flex-end',
        flex: 1,
    },
    photoContainer: {
        width: Platform.isPad ? Styles.width * .7 : Styles.width * .8,
        height: Styles.height * .4,
        borderWidth: 0,
        borderRadius: RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 30,
        overflow: 'hidden',
    },
    shadowContainer: {
        shadowColor: "#000",
        shadowOpacity: 0.23,
        shadowRadius: 3.62,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 4
    },
    drinkImage: {
        alignSelf: 'stretch',
        height: Styles.height * .4,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    col1: {
        justifyContent: 'flex-start',
        width: Styles.width * .33,
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    col2: {
        width: Styles.width * .5,
    },
    wrapRecipeText: {
        flexWrap: 'wrap'
    },
    commentImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    commentRow: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: Styles.width * .85,
        paddingRight: 36,
        marginBottom: 16
    },
    submitRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    submitContainer: {
        marginBottom: 80,
        alignItems: 'flex-start'
    },
    commentInputRow: {
        alignSelf: 'stretch',
        height: Platform.isPad ? 40 : 24,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    commentInputImage: {
        width: Platform.isPad ? 28 : 18,
        height: Platform.isPad ? 26 : 15,
    },
    imageContainer: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
        position: 'absolute',
        left: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    commentInput: {
        borderColor: Styles.GRAY,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: Platform.isPad ? 50 : 36,
        width: Styles.width * .75,
        height: Platform.isPad ? 45 : 30,
        justifyContent: 'center'
    },
    commentHeaderImage: {
        width: 60,
        height: 60,
        borderRadius: RADIUS,
        marginRight: 12
    },
    commentHeaderRow: {
        flexDirection: 'row',
        paddingLeft: 12,
        borderBottomColor: '#EEE',
        borderBottomWidth: 1,
        paddingBottom: 12
    },
    levelBox: {
        height: 30,
        width: Styles.width * .052,
        marginRight: 2,
        marginLeft: 2,
        backgroundColor: '#FFEBE9',
        borderRadius: 5
    },
    levelBoxFull: {
        borderWidth: 3,
        borderColor: '#D3676C',
        backgroundColor: '#F67E85',
        width: Styles.width * .052,
    },
    heartImg: {
        width: Platform.isPad ? 40 : 28,
        height: Platform.isPad ? 40 : 28,
        resizeMode: 'contain'
    },
    buttonContainer: {
        backgroundColor: Styles.PINK,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        alignItems: 'center',
        paddingVertical: 10,
    },
    rateStar: {
        width: Platform.isPad ? 80 : 45,
        height: Platform.isPad ? 80 : 40
    }
});