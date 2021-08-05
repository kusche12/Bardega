import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, View, Image } from 'react-native';
import { getCachedImage } from '../../Functions/cacheFunctions';
import UserStyles from '../../Styles/UserStyles';

// SOLUTIONS:
// There was a bug where the image was not rerendering on update. I used solutions 1 and 4 to fix this.
// https://github.com/facebook/react-native/issues/9195
// 1. UseState to store the image in props (I don't think this will work because the URL does not actually change)
// 2. Superimpose another image ontop of the current one
// 3. Use https instead of http image urls.
// 4. Add a 'key' props to the image that is also the imageURL
// 5. Add a new date to the end point of the image URI you are passing in
// 6. The final comment on the blog post

// Renders a drink image that, when clicked, routes to the drink detail page
const RenderDrink = ({ object, navigation }) => {
    const { item } = object;
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const imgTemp = getCachedImage(item.id) || item.imageURL;
        setImage(imgTemp);
        setIsLoading(false);
    }, [])

    if (isLoading || item.id === null) {
        return null;
    } else {
        return (
            <TouchableWithoutFeedback key={item.id} onPress={() => navigation.push('DrinkDetailScreen', { drink: item, fromScreen: 'Profile' })}>
                <View style={UserStyles.drinkContainer}>
                    <Image source={{ uri: image }} key={new Date()} style={UserStyles.drinkImage} />
                </View>
            </TouchableWithoutFeedback>
        )
    }

}

export default RenderDrink;