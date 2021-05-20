import React from 'react';
import { Image, View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';

const User = ({ user, setText, text, setFindingUser, setQuery, setFocusedUsers, users, setTextedUsers }) => {

    const onPress = () => {
        let curr = text;
        curr = curr.substring(0, curr.lastIndexOf('@'));
        curr += '@' + user.userName;

        setText(curr + ' ');
        setFindingUser(false);
        setQuery('');
        setFocusedUsers(users);

        let newUsers = [...users];
        setTextedUsers(newUsers.concat(user));
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => onPress()}>
                <View style={styles.user}>
                    <Image source={{ uri: user.imageURL }} style={styles.img} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={GlobalStyles.paragraphbold3}>{user.userName} </Text>
                        <Text style={GlobalStyles.paragraph3}>{user.fName} {user.lName}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingLeft: 12,
        paddingRight: 24,
        paddingTop: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden'
    },
    user: {
        flexDirection: 'row',
    },
    img: {
        borderRadius: 50,
        width: 38,
        height: 38,
        marginRight: 12,
        resizeMode: 'contain'
    },

});


export default User;