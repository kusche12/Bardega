import React from 'react';
import { Text, SafeAreaView, View, Image, Linking } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';
import Images from '../../Images/Images';

const ContactUsScreen = () => {
    const renderText = (image, title, desc) => {
        return (
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, paddingRight: 50, marginBottom: 32 }}>
                <Image source={image} style={{ width: 22, height: 22, resizeMode: 'contain', marginRight: 8, marginTop: 1 }} />
                <View style={{ flexDirection: 'column' }}>
                    <Text style={[GlobalStyles.paragraphbold1, { marginBottom: 4 }]}>{title}</Text>
                    {image === Images.about.smile &&
                        <Text style={[GlobalStyles.paragraphbold3, { marginBottom: 4, fontSize: 15 }]}>shake·smile ​/SHāk//smīl/</Text>
                    }
                    <Text style={[GlobalStyles.paragraph3, { fontSize: 15 }]}>{desc}</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={[GlobalStyles.headerSafeArea, { marginBottom: 36 }]}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'flex-start' }}>
                <Text style={GlobalStyles.paragraphbold2}>Contact Us</Text>
            </View>
            <View style={[GlobalStyles.line, { backgroundColor: Styles.LIGHT_GRAY, marginBottom: 16 }]}></View>

            <View style={{ flexDirection: 'column', paddingHorizontal: 8, paddingRight: 10, marginBottom: 32 }}>
                <Text style={[GlobalStyles.paragraphbold2, { marginBottom: 2 }]}>Check us out</Text>
                <Text style={[GlobalStyles.paragraph2]}>603 Mattison Ave</Text>
                <Text style={[GlobalStyles.paragraph2]}>Asbury Park, NJ</Text>
                <Text style={[GlobalStyles.paragraph2]}>07712</Text>
            </View>

            <View style={{ flexDirection: 'column', paddingHorizontal: 8, paddingRight: 10, marginBottom: 32 }}>
                <Text style={[GlobalStyles.paragraphbold2, { marginBottom: 2 }]}>Join the monthly membership</Text>
                <Text style={[GlobalStyles.paragraph3, { fontSize: 15, color: 'blue' }]}
                    onPress={() => Linking.openURL('https://bardegacocktails.com')}>bardegacocktails.com</Text>
                <Text style={[GlobalStyles.paragraph3, { fontSize: 15, color: 'blue' }]}
                    onPress={() => Linking.openURL('mailto:shake@bardegacocktails.com')}>shake@bardegacocktails.com</Text>
            </View>

            <View style={{ flexDirection: 'column', paddingHorizontal: 8, paddingRight: 10, marginBottom: 32 }}>
                <Text style={[GlobalStyles.paragraphbold2, { marginBottom: 2 }]}>Report a Bug / Request a Feature</Text>
                <Text style={[GlobalStyles.paragraph3, { fontSize: 15, color: 'blue' }]}
                    onPress={() => Linking.openURL('mailto:bardegahelp@gmail.com')}>bardegahelp@gmail.com</Text>
            </View>



        </SafeAreaView>
    )
}

export default ContactUsScreen;