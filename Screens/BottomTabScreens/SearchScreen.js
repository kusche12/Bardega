import * as React from 'react';
import Header from '../../Components/Main/Header';
import SearchDetail from '../DetailScreens/SearchDetail';

const SearchScreen = ({ route, navigation }) => {
    return (
        <Header route={route} name="Search" component={SearchDetail} navigation={navigation} />
    );
}

export default SearchScreen;