import * as React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import GlobalStyles from '../../Styles/GlobalStyles';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

// BUG: Compose function is not connecting to firestore collection
const DiscoverDetail = ({ drinks }) => {
    console.log(drinks);
    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <Text>This is the Hello</Text>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    //console.log(state);
    return {
        drinks: state.firestore.data.drinks
    }
}

// Connect the drink detail page to our redux store and firestore DB
export default compose(
    firestoreConnect(() => ['drinks']),
    connect(mapStateToProps)
)(DiscoverDetail);
// export default connect(mapStateToProps)(DiscoverDetail);