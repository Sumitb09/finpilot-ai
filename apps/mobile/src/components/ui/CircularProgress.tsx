import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";

import Typography from "./Typography";

const AnimatedCircle =
  Animated.createAnimatedComponent(Circle);

type Props = {
  progress: number;
  color: string;
  label: string;
  size?: number;
  strokeWidth?: number;
};

export default function CircularProgress({
  progress,
  color,
  label,
  size = 120,
  strokeWidth = 10,
}: Props) {
  const radius =
    (size - strokeWidth) / 2;

  const circumference =
    2 * Math.PI * radius;

  const animatedProgress =
    useSharedValue(0);

  useEffect(() => {
    animatedProgress.value =
      withTiming(progress, {
        duration: 1200,
      });
  }, [progress]);

  const animatedProps =
    useAnimatedProps(() => ({
      strokeDashoffset:
        circumference -
        (animatedProgress.value / 100) *
          circumference,
    }));

  return (
    <View
      style={{
        width: size,
        height: size,
      }}
    >
      <Svg
        width={size}
        height={size}
      >
        <Circle
          stroke="#E5E7EB"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        <AnimatedCircle
          animatedProps={animatedProps}
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2},${size / 2}`}
        />
      </Svg>

      <View style={styles.center}>
        <Typography variant="h2">
          {progress}
        </Typography>

        <Typography>
          {label}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    position: "absolute",
    inset: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});