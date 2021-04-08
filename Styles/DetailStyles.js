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
        borderWidth: 0,
        borderRadius: RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
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
        height: height * .4,
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
    },
    commentContainer: {
        alignItems: 'flex-start'
    },
    commentImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    commentRow: {
        flexDirection: 'row',
        width: width * .6,
    },
    commentDetail: {
        paddingLeft: 8,
    },
    commentText2: {
        color: '#F7D48B'
    },
    commentText3: {
        color: GRAY,
        alignSelf: 'center'
    },
    submitRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    submitContainer: {
        width: width * .8,
        marginBottom: 40,
        alignItems: 'flex-start'
    },
    submitText: {
        fontSize: 22,
    },
    commentInputRow: {
        alignSelf: 'stretch',
        height: 24,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    commentInputImage: {
        width: 14,
        height: 14,
        position: 'absolute',
    },
    commentInput: {
        borderColor: GRAY,
        borderRadius: 4,
        borderWidth: 1,
        paddingLeft: 20,
        width: width * .7,
        height: 24,
    }
});