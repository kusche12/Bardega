import React, { useRef, useEffect, useState } from 'react';
import { FlatList, Animated, Platform, View } from 'react-native';
import UserStyles from '../../Styles/UserStyles';
import Styles from '../../Styles/StyleConstants'

const IOS = Platform.OS === 'ios';

// TODO: Implement pagination. Look at the Bardega profile and see how long it takes to transition between flatlists
// Only render the drinks that can currently be seen and use the DrinkListScreen as an example of this
// https://github.com/nikitawolfik/flatlist-pagination
const AnimatedFlatList = ({ data, renderItem, contentContainerStyle, itemWidth, setActiveIndex, activeIndex }) => {

    const [ranOnce, setRanOnce] = useState(true);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setRefresh(!refresh)
    }, [data])

    const scrollValue = React.useRef(new Animated.Value(0));

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
        // console.log('activeIndex ' + activeIndex);
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
                keyExtractor={(_, index) => '' + index}
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