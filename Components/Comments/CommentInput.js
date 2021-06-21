import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    Text,
    View, TouchableOpacity, Platform
} from 'react-native';
import { useKeyboard } from '@react-native-community/hooks'

const CommentInput = ({ text, setText, handleCreateComment, setFindingUser, findingUser, query, setQuery }) => {
    const [isFocused, setIsFocused] = useState(false);
    const keyboard = useKeyboard();

    const handleKeyPress = ({ nativeEvent }) => {
        const { key } = nativeEvent;
        if (key === '@') {
            setQuery('@')
            setFindingUser(true);
        }

        if (findingUser && key === 'Backspace') {
            setQuery(query.substring(0, query.length - 1));
            return;
        }

        if (findingUser) {
            if (key !== ' ' || key !== 'Backspace') {
                setQuery(query += key);
            }
        }

        if (findingUser && key === ' ') {
            setQuery('');
        }
    }

    return (
        <KeyboardAvoidingView>
            <View style={[styles.container, isFocused && Platform.OS === 'ios' && { paddingBottom: keyboard.keyboardHeight - 15 }]}>
                <TextInput
                    placeholder="Add a comment..."
                    keyboardType="twitter" // keyboard with no return button
                    autoFocus={false}       // focus and show the keyboard
                    style={styles.input}
                    value={text}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={(text) => setText(text)} // handle input changes
                    onKeyPress={handleKeyPress}
                    onSubmitEditing={handleCreateComment} // handle submit event
                />
                {/* Post button */}
                <TouchableOpacity style={styles.button} onPress={() => handleCreateComment()}>
                    <Text style={[styles.text, !text ? styles.inactive : []]}>Post</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingLeft: 15,
    },
    input: {
        flex: 1,
        //height: Platform.OS === 'ios' ? 50 : 20,
        // marginBottom: 0,
        // justifyContent: 'center',
        fontSize: 15,
    },
    button: {
        height: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inactive: {
        color: '#CCC',
    },
    text: {
        color: '#3F51B5',
        fontWeight: 'bold',
        fontFamily: 'SourceSerifRegular',
        textAlign: 'center',
        fontSize: 15,
    },
});

export default CommentInput;