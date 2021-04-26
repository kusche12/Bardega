import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    Text,
    View, TouchableOpacity, Platform
} from 'react-native';


const CommentInput = ({ text, setText, handleCreateComment }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.select({ ios: 0, android: -300 })}
            behavior='position'
            style={isFocused && Platform.OS === 'ios'
                ? { paddingBottom: 150 }
                : null}>
            <View style={styles.container}>
                <TextInput
                    placeholder="Add a comment..."
                    keyboardType="twitter" // keyboard with no return button
                    autoFocus={false}       // focus and show the keyboard
                    style={styles.input}
                    value={text}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={setText} // handle input changes
                //onSubmitEditing={handleCreateComment} // handle submit event
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
        paddingLeft: 15,
    },
    input: {
        flex: 1,
        height: 40,
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
        fontFamily: 'Avenir',
        textAlign: 'center',
        fontSize: 15,
    },
});

export default CommentInput;