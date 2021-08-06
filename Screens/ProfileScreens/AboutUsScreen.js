import React from 'react';
import { Text, SafeAreaView, View, Image, Linking, Platform } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Styles from '../../Styles/StyleConstants';
import Images from '../../Images/Images';

const AboutUsScreen = () => {
    const renderText = (image, title, desc) => {
        return (
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, paddingRight: 50, marginBottom: 32, width: Platform.isPad ? Styles.width * .8 : null }}>
                <Image source={image} style={{ width: Platform.isPad ? 30 : 22, height: Platform.isPad ? 30 : 22, resizeMode: 'contain', marginRight: 8, marginTop: 1 }} />
                <View style={{ flexDirection: 'column' }}>
                    <Text style={[GlobalStyles.paragraphbold1, { marginBottom: 4 }]}>{title}</Text>
                    {image === Images.about.smile &&
                        <Text style={[GlobalStyles.paragraphbold3, { marginBottom: 4, fontSize: Platform.isPad ? 24 : 15 }]}>shake·smile ​/SHāk//smīl/</Text>
                    }
                    <Text style={[GlobalStyles.paragraph3, { fontSize: Platform.isPad ? 24 : 15 }]}>{desc}</Text>
                </View>
            </View>
        )
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <SafeAreaView style={[GlobalStyles.headerSafeArea, { marginBottom: 36 }]}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'flex-start' }}>
                    <Text style={GlobalStyles.paragraphbold2}>About Us</Text>
                </View>
                <View style={[GlobalStyles.line, { backgroundColor: Styles.LIGHT_GRAY, marginBottom: 16 }]}></View>

                <View style={{ flexDirection: 'column', paddingHorizontal: 8, paddingRight: 10, marginBottom: 32, width: Platform.isPad ? Styles.width * .8 : null }}>
                    <Text style={[GlobalStyles.paragraphbold1, { marginBottom: 4 }]}>Become A Master Mixologist with one click.</Text>
                    <Text style={[GlobalStyles.paragraph3, { fontSize: Platform.isPad ? 24 : 15, marginBottom: 4 }]}>Our cocktail kits, virtual classes, and video recipe library will give you the skills to make you a home bartending hero.</Text>
                    <Text style={[GlobalStyles.paragraph3, { fontSize: Platform.isPad ? 24 : 15 }]}>Broaden your cocktail knowledge and find ways to use those obscure spirits collecting dust in your cabinet with our tips, tricks, and signature recipes.</Text>
                </View>

                {renderText(Images.about.eye, 'WATCH AND LEARN', 'Each signature recipe has a video tutorial and recipe cards taught by your friendly, neighborhood bartenders Pip and Dodge with over 40+ years of crafting cocktails and creating unique housemade ingredients.')}
                {renderText(Images.about.laptop, 'DOING IT LIVE', 'With your membership, you get in on the monthly goodies and live classes each month. Chill in the party bunker from your laptop or tablet and bring the bar to your home.')}
                {renderText(Images.about.question, 'ASKING THE TOUGH QUESTIONS...', 'Like "wait, you can put *egg* in your cocktail??" Yes, yes you can. Pip and Dodge are always ready to answer your pressing cocktail questions.')}
                {renderText(Images.about.cocktail, 'BACK TO THE BASICS (AND MORE!)', 'With over 100+ recipes, find the right recipes for classic cocktails - looking at you, Manhattan and Old Fashioned. Or experiment with our own signature recipes that can be your next go-to drink.')}
                {renderText(Images.about.smile, 'DON\'T FORGET TO EMBRACE THE SHAKE SMILES ', 'noun: the unavoidable, radiant smile created when shaking a delicious cocktail. Be messy, get weird, but most importantly, have fun.')}

                <View style={{ flexDirection: 'column', paddingHorizontal: 8, paddingRight: 10, marginBottom: 32 }}>
                    <Text>
                        <Text style={[GlobalStyles.paragraph3, { fontSize: Platform.isPad ? 24 : 15 }]}>Head on over to </Text>
                        <Text style={[GlobalStyles.paragraph3, { fontSize: Platform.isPad ? 24 : 15, color: 'blue' }]}
                            onPress={() => Linking.openURL('https://bardegacocktails.com')}>bardegacocktails.com </Text>
                        <Text style={[GlobalStyles.paragraph3, { fontSize: Platform.isPad ? 24 : 15 }]}>for more info!</Text>
                    </Text>
                </View>

            </SafeAreaView>
        </KeyboardAwareScrollView>
    )


}

export default AboutUsScreen;