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
        height: height * 0.08,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
    },
    horizontalContainer: {
        height: 240,
        marginBottom: 30,
    },
    cardContainer: {
        width: 140,
        height: 200,
        borderRadius: 5,
        alignItems: "center",
        marginRight: 8,
        backgroundColor: "white",
        borderColor: "red",

    },
    drinkImg: {
        width: 140,
        height: 150,
        borderRadius: 4,
    },
    queryTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 10,
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
});