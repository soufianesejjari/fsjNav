import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    title: 'Welcome to App!',
    message: 'The simplest and safest way to access your favorite app.',
    action: 'Get started',
    image: 'https://assets.withfra.me/Landing.1.png',
  },
  {
    title: 'The future is here',
    message:
      'Proident ipsum sunt qui aliquip veniam deserunt sint minim cupidatat amet',
    action: 'Continue',
    image: 'https://assets.withfra.me/Landing.2.png',
  },
  {
    title: "Here's the great news",
    message:
      'Proident ipsum sunt qui aliquip veniam deserunt sint minim cupidatat amet',
    action: 'Create your account',
    image: 'https://assets.withfra.me/Landing.3.png',
  },
];

export default function Example() {
  const [slide, setSlide] = useState(0);

  const swiper = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;

  const animatedBackgroundLeft = scrollX.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [1, 0, -1],
  });

  const contentOpacityRanges = Array.from({ length: slides.length }).reduce(
    (acc, _, index) => {
      const screenWidth = index * width;
      const screenWidthMiddle = screenWidth + width / 2;

      acc.inputRange.push(screenWidth, screenWidthMiddle);
      // opacity 1 when screen is presented, 0.2 when screens are switching (mid point).
      acc.outputRange.push(1, 0.2);

      return acc;
    },
    {
      inputRange: [],
      outputRange: [],
    },
  );
  const contentOpacity = scrollX.interpolate(contentOpacityRanges);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ left: animatedBackgroundLeft }}>
        <Image
          source={{ uri: slides[0].image }}
          resizeMode="contain"
          style={styles.slideImage}
        />
      </Animated.View>
      <Swiper
        ref={swiper}
        showsPagination={false}
        loop={false}
        onIndexChanged={setSlide}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={1}>
        {slides.map((item, index) => {
          return (
            <Animated.View
              key={index}
              style={[styles.slide, { opacity: contentOpacity }]}>
              <Text style={styles.slideTitle}>{item.title}</Text>
              <Text style={styles.slideText}>{item.message}</Text>

              <TouchableOpacity
                onPress={() => {
                  swiper.current.scrollTo(slide + 1, true);
                }}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{item.action}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </Swiper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1f26',
  },
  /** Slide */
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
    justifyContent: 'flex-end',
    paddingHorizontal: 36,
  },
  slideImage: {
    width: width * slides.length,
    height: 0.6 * height,
    position: 'absolute',
    top: 47,
    left: 0,
  },
  slideTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  slideText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#a9b1cf',
    textAlign: 'center',
  },
  /** Button */
  button: {
    backgroundColor: '#1e5afb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 36,
    marginVertical: 48,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});
