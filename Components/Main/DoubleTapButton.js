import * as React from 'react';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

function DoubleTapButton({ onDoubleTap, children }) {
    const onHandlerStateChange = ({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
            onDoubleTap && onDoubleTap();
        }
    };

    return (
        <TapGestureHandler
            onHandlerStateChange={onHandlerStateChange}
            numberOfTaps={2}>
            {children}
        </TapGestureHandler>
    );
}

export default DoubleTapButton;