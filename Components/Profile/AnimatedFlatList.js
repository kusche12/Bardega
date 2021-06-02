import React, { useRef, useEffect, useState } from 'react';
import { FlatList, Animated, Platform } from 'react-native';
import UserStyles from '../../Styles/UserStyles';
import Styles from '../../Styles/StyleConstants'

const IOS = Platform.OS === 'ios';

// https://github.com/nikitawolfik/flatlist-pagination
const AnimatedFlatList = ({ data, renderItem, keyExtractor, contentContainerStyle, itemWidth, setActiveIndex, activeIndex }) => {
    console.log(data[0].length)

    const [ranOnce, setRanOnce] = useState(true);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setRefresh(!refresh)
    }, [data])

    const scrollValue = React.useRef(new Animated.Value(0));

    //let activeIndex = 0;
    const flatlist = React.useRef();

    const VIEWABILITY_CONFIG = useRef({
        viewAreaCoveragePercentThreshold: 50,
    });

    const animatedValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (ranOnce) {
            setRanOnce(false);
            return;
        }

        if (activeIndex === 1) {
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true // <-- Add this
            }).start()
        } else {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true // <-- Add this
            }).start()
        }
        flatlist.current.scrollToIndex({ index: activeIndex, animated: true, viewPosition: 0.5 });
        //console.log('activeIndex ' + activeIndex);
    }, [activeIndex]);

    const renderIndexLine = () => {
        return (
            <Animated.View style={[UserStyles.indexButtonLine, {
                transform: [
                    {
                        translateX: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, Styles.width / 2]
                        })
                    }]
            }]}></Animated.View>
        )
    }

    const getItemLayout = (data, index) => ({
        length: itemWidth,
        offset: itemWidth * index,
        index,
    });

    const onViewableItemsChanged = useRef((info) => {
        const { index = 0 } = info.viewableItems[0];
        setActiveIndex(index);
    });

    const onScrollEndDrag = (e) => {
        const speed = e.nativeEvent.velocity.x;
        if (IOS) {
            if (speed > 1 && activeIndex < data.length - 1) {
                activeIndex += 1;
            }
            if (speed < -1 && activeIndex > 0) {
                activeIndex -= 1;
            }
        }
        //  needs to be tested
        if (!IOS) {
            if (speed < -1 && activeIndex < data.length - 1) {
                activeIndex += 1;
            }
            if (speed > 1 && activeIndex > 0) {
                activeIndex -= 1;
            }
        }

        flatlist.current.scrollToIndex({ index: activeIndex, animated: true, viewPosition: 0.5 });
    };

    return (
        <>
            {renderIndexLine()}
            <FlatList
                onScroll={Animated.event([{
                    nativeEvent: { contentOffset: { x: scrollValue.current } },
                }], { useNativeDriver: false })}
                data={data}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={contentContainerStyle}
                keyExtractor={keyExtractor}
                ref={flatlist}
                extraData={refresh}

                getItemLayout={getItemLayout}
                viewabilityConfig={VIEWABILITY_CONFIG.current}
                onViewableItemsChanged={onViewableItemsChanged.current}
                onScrollEndDrag={onScrollEndDrag}
            />
        </>
    );
};

export default AnimatedFlatList;