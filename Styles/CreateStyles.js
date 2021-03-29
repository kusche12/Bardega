import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;

export default StyleSheet.create({
    title: {
        fontSize: 25
    },
    inputBox: {
        alignItems: 'center',
        marginTop: 15
    },
    title2: {
        fontSize: 15
    },
    input: {
        fontSize: 20,
        color: '#b3b3b3',
        width: width * .8
    }
});