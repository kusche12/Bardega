import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, View, Image, Text } from 'react-native';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import { Placeholder, PlaceholderMedia, Fade } from 'rn-placeholder';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Styles from '../../Styles/StyleConstants';
import DetailStyles from '../../Styles/DetailStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import GlobalStyles from '../../Styles/GlobalStyles';

const DrinkCard = ({ drink, navigation, navigateTo, isRefreshing, profiles }) => {
    const [cached, setCached] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (profiles) {
            if (!cached) {
                cacheImages(drink.imageURL, drink.id);
            }
            setCached(true);
            setIsLoading(false);
        }
    }, [profiles]);

    const renderText = () => {
        let text = drink.name;
        if (text.length > 28) {
            text = text.substring(0, 26) + '...';
        }
        return (
            <>
                <Text style={[GlobalStyles.paragraphbold3, { marginTop: 8, textAlign: 'center' }]}>{text}</Text>
                <Text style={[GlobalStyles.paragraphbold3, { marginTop: 4, textAlign: 'center', color: Styles.DARK_PINK }]}>
                    @{profiles[drink.authorID].userName}
                </Text>
            </>
        )
    }

    if (isLoading || isRefreshing) {
        return (
            <Placeholder Animation={Fade} width={155}>
                <View style={[DetailStyles.shadowContainer]}>
                    <View style={[DiscoverStyles.cardContainer]}>
                        <PlaceholderMedia style={[DiscoverStyles.drinkImg]} />
                    </View>
                </View>
            </Placeholder>
        )
    } else {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate(navigateTo, { drink: drink })}>
                <View style={DetailStyles.shadowContainer}>
                    <View style={DiscoverStyles.cardContainer}>
                        <>
                            <Image source={{ uri: getCachedImage(drink.id) || drink.imageURL }} style={DiscoverStyles.drinkImg} />
                            {renderText()}
                        </>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

}

const mapStateToProps = (state) => {
    const profiles = state.firestore.data.profiles;

    return {
        profiles: profiles
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => [
        { collection: 'profiles' }
    ])
)(DrinkCard);

