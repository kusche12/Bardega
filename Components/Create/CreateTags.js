import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import CreateStyles from '../../Styles/CreateStyles';

const CreateTags = ({ tags, setSelectedTags, selectedTags }) => {

    const renderTag = (tag, index) => {
        for (let i = 0; i < selectedTags.length; i++) {
            // Tag already selected
            if (selectedTags[i].id === tag.id) {
                return (
                    <TouchableWithoutFeedback key={index} onPress={() => handleDeselect(tag)}>
                        <View style={[CreateStyles.tag, {opacity: 1}]}>
                            <Text style={{color: 'white'}}>{tag.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }
        }
        // Tag not selected
        return (
            <TouchableWithoutFeedback key={index} onPress={() => handleSelect(tag)}>
                <View style={CreateStyles.tag}>
                    <Text style={{color: 'white'}}>{tag.name}</Text>
                </View>
            </TouchableWithoutFeedback>
            )
    }

    // If selected, remove from selected tags
    const handleDeselect = (oldTag) => {
        let newTags = selectedTags.filter(tag => tag.id !== oldTag.id);
        setSelectedTags(newTags);
    }
    
    // If not selected, then check if there are < 3 tags and if so, include it in selectedTags
    const handleSelect = (tag) => {
        if (selectedTags.length < 3) {
            let newTags = selectedTags.concat(tag);
            setSelectedTags(newTags);
        }
    }

    return (
        <View style={CreateStyles.ingrContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={CreateStyles.ingrTitle}>ADD TAGS ( </Text>
                    <Text style={CreateStyles.ingrTitle2}>choose up to 3</Text>
                    <Text style={CreateStyles.ingrTitle}> )</Text>
            </View>
            <View style={[CreateStyles.ingrLine, { marginBottom: 5 }]}></View>
            <View style={CreateStyles.tagContainer}>
                {tags.map((tag, index) => {
                    return renderTag(tag, index);
                })}
            </View>
        </View>
    )
}

export default CreateTags;