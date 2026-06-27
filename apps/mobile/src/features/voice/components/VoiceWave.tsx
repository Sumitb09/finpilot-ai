import React, {
    useEffect,
    useRef,
  } from "react";
  
  import {
    Animated,
    StyleSheet,
    View,
  } from "react-native";
  
  export default function VoiceWave() {
    const scale =
      useRef(
        new Animated.Value(1)
      ).current;
  
    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.15,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);
  
    return (
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [
              {
                scale,
              },
            ],
          },
        ]}
      />
    );
  }
  
  const styles = StyleSheet.create({
    circle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: "#3B82F6",
      opacity: 0.15,
      position: "absolute",
    },
  });