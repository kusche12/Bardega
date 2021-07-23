import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Placeholder, PlaceholderMedia, Fade } from 'rn-placeholder';
import Styles from '../../Styles/StyleConstants';

const LoadingImage = ({ imageURL }) => {
    const [showLoading, setShowLoading] = useState(1);
    const [autoHeight, setAutoHeight] = useState(250);

    useEffect(() => {
        Image.getSize(imageURL, (width, height) => {
            setAutoHeight(height * (Styles.width / width));
        })
    }, [])

    const handleLoad = () => {
        setShowLoading(0);
    }

    return (
        <>
            <View style={{ width: Styles.width, height: 250, opacity: showLoading }}>
                <Placeholder Animation={Fade} width={Styles.width} height={250}>
                    <PlaceholderMedia style={{ width: Styles.width, height: 250 }} />
                </Placeholder>
            </View>
            <Image source={{ uri: imageURL }} style={{ width: Styles.width, height: autoHeight, position: 'absolute' }} onLoad={() => handleLoad()} />
        </>
    )
}

export default LoadingImage;