import React, { useEffect, useState } from 'react';
import { View, TouchableWithoutFeedback, Image, Text } from 'react-native';
import Loading from '../Main/Loading';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { renderNum } from '../../Functions/miscFunctions';
import { likeDrink, unLikeDrink } from '../../Store/Actions/DrinkActions';
import Images from '../../Images/Images';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';
import DetailStyles from '../../Styles/DetailStyles';
import Styles from '../../Styles/StyleConstants';

// TODO: Get the share component to share to other social medias / messenger
const DetailLikeCommentShare = ({ navigation, drink, authors, numLikes,
    likedByUsers, author, userID, numComments, likeDrink, unLikeDrink }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (likedByUsers !== null && numLikes !== null && drink !== null && author !== null && authors !== null) {
            setIsLoading(false);
        }
    }, [likedByUsers]);

    const renderHeart = () => {
        let img;
        if (likedByUsers && likedByUsers[userID]) {
            img = <Image source={Images.comment.fullHeart} style={DetailStyles.heartImg} />
        } else {
            img = <Image source={Images.detail.emptyHeartBold} style={DetailStyles.heartImg} />
        }
        return img;
    }

    const handleDrinkLike = async () => {
        if (isDisabled) {
            return;
        }
        const likes = numLikes;
        setIsDisabled(true);
        if (likedByUsers && likedByUsers[userID]) {
            await unLikeDrink({ numLikes: likes, drink, userID });
        } else {
            await likeDrink({ numLikes: likes, drink, userID });
        }
        setIsDisabled(false);
    }

    if (isLoading) {
        return <Loading />
    } else {
        return (
            <View style={[CreateStyles.ingrContainerWide, DetailStyles.buttonContainer]}>

                <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileScreen', { user: authors[drink.authorID] })}>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Image source={{ uri: author.imageURL }} style={[DetailStyles.commentImage, { width: 35, height: 35 }]}></Image>
                        <Text style={GlobalStyles.titlebold3}>@{author.userName}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <View style={{ flexDirection: 'row', alignItems: 'flex-end', width: Styles.width * .38, justifyContent: 'space-between' }}>
                    <TouchableWithoutFeedback disabled={isDisabled} onPress={() => handleDrinkLike()}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {renderHeart()}
                            <Text style={GlobalStyles.titlebold3}>{renderNum(numLikes)}</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('CommentsScreen', { drink: drink })}>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Image source={Images.detail.emptyComment} style={[DetailStyles.heartImg, { width: 35 }]}></Image>
                            <Text style={GlobalStyles.titlebold3}>{renderNum(numComments - 1)}</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => console.log('share me')}>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Image source={Images.detail.share} style={[DetailStyles.heartImg]}></Image>
                            <Text style={[GlobalStyles.titlebold3, { opacity: 0 }]}>Share</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let likedByUsers = state.firestore.data['likedByUsers' + ownProps.drink.drinkLikesID];
    let numLikes = state.firestore.data.drinks[ownProps.drink.id].numLikes;

    const authorID = ownProps.drink.authorID;
    const profiles = state.firestore.data.profiles;
    const profile = profiles ? profiles[authorID] : null;

    return {
        userID: state.firebase.auth.uid,
        likedByUsers: likedByUsers ? likedByUsers : null,
        authors: profiles,
        author: profile,
        numLikes: numLikes,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeDrink: (data) => dispatch(likeDrink(data)),
        unLikeDrink: (data) => dispatch(unLikeDrink(data))
    }
}


// Subcollection of a subcollection: 
// https://stackoverflow.com/questions/53968379/how-to-point-firestoreconnect-to-a-nested-collection-in-react-redux-firebase
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        { collection: 'profiles' },
        { collection: 'drinks' },
        {
            collection: 'drinkLikes',
            doc: props.drink.drinkLikesID,
            storeAs: 'likedByUsers' + props.drink.drinkLikesID,
            subcollections: [{
                collection: "likedByUsers"
            }
            ]
        }])
)(DetailLikeCommentShare);