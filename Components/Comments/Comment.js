import React from 'react';
import { Image, View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import DetailStyles from '../../Styles/DetailStyles';

const Comment = ({ comment, author, navigation }) => {
    console.log(author);
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileScreen', { user: author })}>
            <View style={styles.container}>
                <Image source={{ uri: author.imageURL }} style={styles.img} />
                <View>
                    <Text>
                        <Text style={styles.username}>{author.userName} </Text>
                        <Text>{comment.text}</Text>
                    </Text>
                    <Text style={styles.date}>{moment(comment.dateCreated, "YYYYMMDD").fromNow()}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        marginBottom: 24,
        paddingLeft: 12,
        paddingRight: 100,
        alignItems: 'flex-start'
    },
    img: {
        borderRadius: 100,
        width: 40,
        height: 40,
        marginRight: 12
    },
    username: {
        fontWeight: '500'
    },
    date: {
        color: "#a1a1a1",
        fontSize: 12
    }

});

export default Comment;