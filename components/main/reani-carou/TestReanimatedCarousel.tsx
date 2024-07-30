import { useCallback } from "react"
import { Dimensions, Image, Text, View } from "react-native"
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from "react-native-reanimated"
import Carousel from "react-native-reanimated-carousel"

const Slide = ({
  index,
  animationValue,
  img,
}: {
  index: number
  animationValue: Animated.SharedValue<number>
  img: any
}) => {
  const maskStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["#000000dd", "transparent", "#000000dd"]
    )
    return {
      backgroundColor
    }
  }, [animationValue])

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={{ flex: 1 }}>
        <Image source={img} style={{ flex: 1, resizeMode: 'stretch' }} />
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          maskStyle,
        ]}
      />
    </View>
  )
}

const screenWidth = Dimensions.get("window").width;

export default function TestReanimatedCarousel() {
  const cusAniStyle = useCallback((value: number) => {
    "worklet";
    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const translateX = interpolate(
      value,
      [-1, 0, 1],
      [-screenWidth, 0, screenWidth],
    );

    return {
      transform: [{ translateX }],
      zIndex,
    }
  }, [])

  return (
    <Carousel
      style={{
        width: screenWidth,
        height: screenWidth / 1.5
      }}
      width={screenWidth}
      data={data}
      customAnimation={cusAniStyle}
      renderItem={({ index, animationValue, item }) =>
        <Slide
          key={index}
          index={index}
          animationValue={animationValue}
          img={item.img}
        />
      }
    />
  )
}

const data = [
  { img: require('../../assets/images/autuhm-maple.webp') },
  { img: require('../../assets/images/desert-valley.webp') },
  { img: require('../../assets/images/spring-nature.webp') },
  { img: require('../../assets/images/summer-beach-starfish.webp') },
  { img: require('../../assets/images/winter-forest.webp') },
]