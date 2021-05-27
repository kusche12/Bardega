import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import firebase from '../../API/FirebaseSetup'
import Images from '../../Images/Images';
import CreateStyles from '../../Styles/CreateStyles';
import DetailStyles from '../../Styles/DetailStyles';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

// 1. Render the star rating given by user
// 2. If no star rating, render empty stars
// 3. Scroll stars to give rating
// 4. Trigger API call to update ratings collection with user's rating AND the rating field in the spirits collection
const Ratings = ({ userID, drink }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [rating, setRating] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (userID) {
                let db = firebase.firestore();
                db
                    .collection('ratings')
                    .doc(drink.rateID)
                    .collection('allRatings')
                    .doc(userID)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            setRating(doc.data().rating);
                        } else {
                            setRating(0);
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                setIsLoading(false);
            }
        }
        fetchData();
    }, [userID]);

    const handleRateSpirit = (index) => {

    }

    const renderStars = (rating, rateable) => {
        const stars = Math.round(rating * 2) / 2;
        let res = [];
        let index = 1;
        for (let i = 1; i <= stars; i++) {
            res.push(renderStar(Images.star.starFull, rateable, index));
            index++;
        };
        if (stars % 1 !== 0) {
            res.push(renderStar(Images.star.starHalf, rateable));
        };
        for (let j = 1; j <= 5 - stars; j++) {
            res.push(renderStar(Images.star.starEmpty, rateable, index));
            index++;
        }
        return (
            <View style={{ flexDirection: 'row', width: Styles.width * .65, alignItems: 'center', justifyContent: 'space-around' }}>
                {res}
            </View>
        )
    }

    const renderStar = (img, rateable, index) => {
        return (
            <TouchableWithoutFeedback onPress={() => rateable && handleRateSpirit(index)}>
                <Image source={img} style={DetailStyles.rateStar} />
            </TouchableWithoutFeedback>
        )
    }

    if (isLoading) return null;
    return (
        <View style={CreateStyles.ingrContainerWide}>
            <Text style={GlobalStyles.titlebold2}>YOUR RATING</Text>
            {renderStars(rating, true)}
            <Text style={[GlobalStyles.titlebold2, { marginTop: 40 }]}>OVERALL RATING</Text>
            {renderStars(drink.rating, false)}
        </View>
    )
};

const mapStateToProps = (state) => {
    return {
        userID: state.firebase.auth.uid,
    }
}

export default connect(mapStateToProps)(Ratings);
