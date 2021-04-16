import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const PINK = '#F29288';
const GRAY = '#a1a1a1'
const RADIUS = 22;
const SUBFONT = 15;

export default StyleSheet.create({
    container: {
        marginLeft: 8,
    },
    titleContainer: {
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
    },
    horizontalContainer: {
        height: 240,
        marginBottom: 60,
    },
    cardContainer: {
        width: 140,
        height: 200,
        borderRadius: 5,
        alignItems: "center",
        marginRight: 8,
        backgroundColor: "white",
        overflow: 'hidden'
    },
    drinkImg: {
        width: 140,
        height: 150,
        borderRadius: 5,
    },
    horizRow: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 12,
        alignItems: 'flex-end'
    },
    queryTitle: {
        fontSize: 20,
        fontWeight: "700",
    },
    querySubtitle: {
        fontSize: 13,
        fontWeight: '700',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: "700",
        marginTop: 8,
        marginBottom: 10,
        textAlign: "center",
        paddingHorizontal: 4,
        paddingTop: 4,
    },
    searchHeader: {
        marginBottom: 8,
        paddingLeft: 16
    },
    searchContainer: {
        width: width,
        flexDirection: 'row',
        paddingLeft: 16,
        paddingVertical: 8,
        borderBottomColor: GRAY,
        borderBottomWidth: 1,
    },
    searchImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 4
    },
});