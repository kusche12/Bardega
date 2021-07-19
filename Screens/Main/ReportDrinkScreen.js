import React from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableHighlight, Image } from 'react-native';
import { reportDrink } from '../../Store/Actions/DrinkActions';
import { connect } from 'react-redux';
import Images from '../../Images/Images';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import Styles from '../../Styles/StyleConstants';

// This screen allows the user to report a drink.
// They are given options for various reasons of why they think the drink should be flagged,
// After pressing an option, they are redirected to the success report screen and a document is added
// to the Reports Container within Firebase for viewing by Bardega at their earliest convenience.
const ReportDrinkScreen = ({ navigation, route, reportDrink }) => {
    const { drink, userID } = route.params;

    const sendReport = (type) => {
        reportDrink({ userID, drink, type });
        navigation.navigate('ReportSuccessScreen', { navigation });
    }

    const renderButton = (type) => {
        return (
            <TouchableHighlight activeOpacity={0.8} underlayColor={Styles.LIGHT_GRAY} style={{ borderTopColor: Styles.LIGHT_GRAY, borderTopWidth: 1 }} onPress={() => sendReport(type)}>
                <View style={{ flexDirection: 'row', paddingTop: 12, paddingBottom: 12, paddingLeft: 32, paddingRight: 32, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={GlobalStyles.paragraph2}>{type}</Text>
                    <Image source={Images.settings.about} style={{ width: 7, height: 14 }}></Image>
                </View>
            </TouchableHighlight>
        )
    }

    return (
        <ScrollView>
            <SafeAreaView style={[GlobalStyles.headerSafeArea, { marginBottom: 50 }]} >
                <View style={UserStyles.followerHeader}>
                    <Text style={GlobalStyles.titlebold2}>Report</Text>
                    <View style={[GlobalStyles.line, { width: Styles.width * .9, alignSelf: 'center' }]}></View>
                </View>
                <Text style={[GlobalStyles.paragraphbold2, { paddingLeft: 32, paddingTop: 16, paddingBottom: 16 }]}>Why are you reporting this drink?</Text>

                <View style={{ borderBottomColor: Styles.LIGHT_GRAY, borderBottomWidth: 1 }}>
                    {renderButton("It's spam")}
                    {renderButton("Nudity or sexual activity")}
                    {renderButton("Illegal substances displayed")}
                    {renderButton("Violence or dangerous organizations")}
                    {renderButton("Bullying or harassment")}
                    {renderButton("Hate speech or symbols")}
                    {renderButton("Intellectual property violation")}
                    {renderButton("Scam or fraud")}
                    {renderButton("False information")}
                    {renderButton("I just don't like it")}
                    {renderButton("Something else")}
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        reportDrink: (data) => dispatch(reportDrink(data)),
    }
}

export default connect(null, mapDispatchToProps)(ReportDrinkScreen);