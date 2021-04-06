import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const PINK = '#F29288';
const GRAY = '#a1a1a1'
const RADIUS = 22;
const SUBFONT = 15;

export default StyleSheet.create({
photoContainer: {
        width: width * .8,
        height: height * .4,
        borderColor: '#707070',
        borderWidth: 1,
        borderRadius: RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        
        shadowColor: "#000",
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 4
    },
    recipeContainer: {
        alignSelf: 'stretch',
    },
    textGray: {
        color: GRAY,
        fontSize: 16,
    },
    textBlack: {
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    col1: {
        justifyContent: 'flex-end',
        width: width * .3,
        alignItems: 'flex-end',
        paddingRight: 12
    }
});