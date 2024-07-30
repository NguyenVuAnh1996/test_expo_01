import { useCallback } from "react"
import { Dimensions, Text, TransformsStyle, View } from "react-native"
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated"
import Carousel from "react-native-reanimated-carousel"

const SlideItemTypeB = ({ index }: { index: number }) => {
  return (
    <Animated.View style={{ flex: 1, backgroundColor: 'lightgreen' }}>
      <Text style={{
        color: 'red',
        backgroundColor: 'lightblue'
      }}>{index}</Text>
    </Animated.View>
  )
}

interface Size {
  width: number
  height: number
}
interface Point {
  x: number
  y: number
}

const isValidSize = (size: Size): boolean => {
  "worklet";

  return size && size.width > 0 && size.height > 0;
};

const defaultAnchorPoint = { x: 0.5, y: 0.5 };

const withAnchorPoint = (
  transform: TransformsStyle,
  anchorPoint: Point,
  size: Size,
) => {
  "worklet";

  if (!isValidSize(size))
    return transform;

  let injectedTransform: any = transform.transform;
  if (!injectedTransform)
    return transform;

  if (anchorPoint.x !== defaultAnchorPoint.x && size.width) {
    const shiftTranslateX = [];

    // shift before rotation
    shiftTranslateX.push({
      translateX: size.width * (anchorPoint.x - defaultAnchorPoint.x),
    });
    injectedTransform = [...shiftTranslateX, ...injectedTransform];
    // shift after rotation
    injectedTransform.push({
      translateX: size.width * (defaultAnchorPoint.x - anchorPoint.x),
    });
  }

  if (!Array.isArray(injectedTransform))
    return { transform: injectedTransform };

  if (anchorPoint.y !== defaultAnchorPoint.y && size.height) {
    const shiftTranslateY = [];
    // shift before rotation
    shiftTranslateY.push({
      translateY: size.height * (anchorPoint.y - defaultAnchorPoint.y),
    });
    injectedTransform = [...shiftTranslateY, ...injectedTransform];
    // shift after rotation
    injectedTransform.push({
      translateY: size.height * (defaultAnchorPoint.y - anchorPoint.y),
    });
  }

  return { transform: injectedTransform };
};

const screenWidth = Dimensions.get("window").width;
const pageWidth = screenWidth / 5;

export default function TestRCCurved() {
  const progressValue = useSharedValue<number>(0);
  const cusAni = useCallback((value: number) => {
    'worklet';
    const size = pageWidth;
    const scale = interpolate(
      value,
      [-2, -1, 0, 1, 2],
      [1.7, 1.2, 1, 1.2, 1.7],
      Extrapolate.CLAMP
    )
    const translate = interpolate(
      value,
      [-2, -1, 0, 1, 2],
      [-size * 1.45, -size * 0.9, 0, size * 0.9, size * 1.45]
    )
    const rotateY = interpolate(
      value,
      [-1, 0, 1],
      [30, 0, -30],
      Extrapolate.CLAMP
    )
    const transform = {
      transform: [
        { scale },
        { translateX: translate },
        { perspective: 150 },
        { rotateY: `${rotateY}deg` }
      ]
    }
    return {
      ...withAnchorPoint(
        transform,
        { x: 0.5, y: 0.5 },
        {
          width: pageWidth,
          height: pageWidth * 0.6
        }
      )
    }
  }, [])
  return (
    <View
      style={{
        alignItems: 'center'
      }}
    >
      <Carousel
        vertical={false}
        width={pageWidth}
        height={pageWidth * 0.6}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: screenWidth,
          height: screenWidth / 1.5
        }}
        loop
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        customAnimation={cusAni}
        data={data}
        renderItem={({ index }) => <SlideItemTypeB index={index} />}
      />
    </View>
  )
}

const data = [
  { id: 1, img: require('../../assets/images/autuhm-maple.webp') },
  { id: 2, img: require('../../assets/images/desert-valley.webp') },
  { id: 3, img: require('../../assets/images/spring-nature.webp') },
  { id: 4, img: require('../../assets/images/summer-beach-starfish.webp') },
  { id: 5, img: require('../../assets/images/winter-forest.webp') },
]