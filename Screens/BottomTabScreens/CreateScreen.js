import * as React from 'react';
import CreateDetail from '../DetailScreens/CreateDetail';
import Header from '../../Components/Main/Header';

const CreateScreen = ({ route }) => {
    return (
        <Header route={route} name="Create" component={CreateDetail} />
    );
}

export default CreateScreen;