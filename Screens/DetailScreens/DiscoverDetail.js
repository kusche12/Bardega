import * as React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import GlobalStyles from '../../Styles/GlobalStyles';

const DiscoverDetail = ({drinks}) => {
    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <Text>This is the Hello</Text>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    return {
        drinks: state.drink.allDrinks
    }
}

export default connect(mapStateToProps)(DiscoverDetail);