import { StyleSheet, Platform } from 'react-native';
import Styles from './StyleConstants';

export default StyleSheet.create({
    titleContainer: {
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    horizontalContainer: {
        height: Platform.isPad ? 380 : 265
    },
    cardContainer: {
        width: Platform.isPad ? 175 : 140,
        height: Platform.isPad ? 320 : 220,
        borderRadius: Styles.BORDER_RADIUS,
        alignItems: "center",
        overflow: 'hidden',
        marginRight: Platform.isPad ? 16 : 8,
        backgroundColor: "white",
    },
    drinkImg: {
        width: Platform.isPad ? 175 : 140,
        height: Platform.isPad ? 225 : 150,
        borderRadius: Styles.BORDER_RADIUS,
    },
    horizRow: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 16,
        alignItems: 'flex-end',
        width: Styles.width
    },
    searchHeader: {
        marginBottom: 8,
        paddingLeft: 16
    },
    searchContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
        marginHorizontal: 8,
        paddingRight: 100,
        borderBottomColor: Styles.GRAY,
        borderBottomWidth: Platform.isPad ? 2 : 1,
    },
    searchImage: {
        width: Platform.isPad ? 120 : 80,
        height: Platform.isPad ? 120 : 80,
        borderRadius: Styles.BORDER_RADIUS,
        marginRight: 8
    },
    searchImageProfile: {
        borderRadius: 100,
        width: 70,
        height: 70,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 10
    }
});