import { StyleSheet } from 'react-native';
import Styles from './StyleConstants';

export default StyleSheet.create({
    titleContainer: {
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    horizontalContainer: {
        height: 250,
        marginBottom: 50,
    },
    cardContainer: {
        width: 140,
        height: 200,
        borderRadius: Styles.BORDER_RADIUS,
        alignItems: "center",
        marginRight: 8,
        backgroundColor: "white",
    },
    drinkImg: {
        width: 140,
        height: 150,
        borderRadius: Styles.BORDER_RADIUS,
    },
    horizRow: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 12,
        alignItems: 'flex-end'
    },
    searchHeader: {
        marginBottom: 8,
        paddingLeft: 16
    },
    searchContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
        marginHorizontal: 8,
        borderBottomColor: Styles.GRAY,
        borderBottomWidth: 1,
    },
    searchImage: {
        width: 80,
        height: 80,
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