import React from 'react';
import { View } from 'react-native';
import BardegaLogoSVG from '../../Components/Main/BardegaLogoSVG';
import DrinkCircleOne from '../../Components/SVG/DrinkCircleOne';
import Styles from '../../Styles/StyleConstants';

const SplashScreen = () => {

    return (
        <View style={{ alignItems: 'center', backgroundColor: Styles.PINK, flex: 1 }}>
            <DrinkCircleOne style={{ position: 'absolute', opacity: .4, left: Styles.width * .38, bottom: Styles.height * .5 }} width={Styles.width * .8} />
            <BardegaLogoSVG width={Styles.width * .9} height={Styles.height * .9} />
            <DrinkCircleOne style={{ position: 'absolute', opacity: .4, left: Styles.width * - .2, top: Styles.height * .6 }} width={Styles.width * 1.2} />
        </View>
    )
}

export default SplashScreen;