import React from 'react';
import * as Styles from './styles';
import LottieView, { AnimationObject } from 'lottie-react-native';

interface IProps {
  animationUrl: string | AnimationObject;
  size?: number | string;
}
export const Animation = ({ animationUrl, size = 200 }: IProps) => {
  return (
    <Styles.Wrapper>
      <LottieView
        source={animationUrl}
        style={{ height: size }}
        resizeMode="contain"
        hardwareAccelerationAndroid
        autoPlay
        loop
        speed={1}
      />
    </Styles.Wrapper>
  );
};
