import MaskedView from "@react-native-masked-view/masked-view";
import React, { useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { defaultShimmerColors } from "./colors";
import {
  ShimmerTextProps,
  textSizes,
  WebAnimationStyle,
  WebShimmerStyle,
} from "./types";

export default function ShimmerText({
  children,
  style,
  shimmerStyle,
  containerStyle,
  duration = 3,
  bold = true,
  highlightWidth,
  direction = "ltr",
  angle = 100,
  width,
  height,
  size = "md",
  colors,
}: ShimmerTextProps) {
  const systemColorScheme = useColorScheme() ?? "light";
  const currentColors = {
    ...defaultShimmerColors[systemColorScheme],
    ...colors?.[systemColorScheme],
  };

  const sizeConfig = textSizes[size];
  const computedFontSize =
    (style as TextStyle & { fontSize?: number })?.fontSize ??
    sizeConfig.fontSize;
  const defaultWidth =
    width ?? Math.max((children || "").length * computedFontSize * 0.6, 100);
  const defaultHeight = height ?? sizeConfig.height ?? computedFontSize * 1.2;

  const shimmerColors = currentColors.shimmer;

  const hw = Math.max(0, Math.min(100, highlightWidth ?? NaN));
  const startStop = Number.isFinite(hw) ? 50 - hw / 2 : 46;
  const endStop = Number.isFinite(hw) ? 50 + hw / 2 : 54;

  const computedFontWeight =
    bold === undefined
      ? ((style as TextStyle & { fontWeight?: TextStyle["fontWeight"] })
          ?.fontWeight ?? "bold")
      : bold
        ? "bold"
        : "normal";

  // Animation setup - always call hooks
  const keyframesId = `shimmer-${Math.random().toString(36).substring(2, 11)}`;
  const translateX = useSharedValue(direction === "ltr" ? -25 : 25);

  // CSS animation for web - dynamic based on content
  const startPosition = defaultWidth * 1.5; // Start from right of text
  const endPosition = -defaultWidth * 0.5; // End to left of text

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
        @keyframes ${keyframesId} {
          0% {
            background-position: ${direction === "ltr" ? `${endPosition}px 0` : `${startPosition}px 0`};
          }
          100% {
            background-position: ${direction === "ltr" ? `${startPosition}px 0` : `${endPosition}px 0`};
          }
        }
      `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [keyframesId, direction, startPosition, endPosition]);

  // Reanimated animation for native
  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(direction === "ltr" ? -25 : 25, { duration: duration * 1000 }),
      -1,
      true,
    );
  }, [direction, duration, translateX]);

  const reanimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: `${translateX.value}%` }],
  }));

  const cssAnimatedStyle = {
    animationName: keyframesId,
    animationDuration: `${duration}s`,
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
  } as ViewStyle & WebAnimationStyle;

  const gradientBG = {
    experimental_backgroundImage: `linear-gradient(${angle}deg, ${shimmerColors.start} ${startStop}%, ${shimmerColors.middle} 50%, ${shimmerColors.end} ${endStop}%)`,
  } as ViewStyle & WebShimmerStyle;

  if (Platform.OS === "web") {
    return (
      <View
        style={[
          styles.shimmerContainer,
          { width: defaultWidth, height: defaultHeight },
          containerStyle,
        ]}
      >
        <View
          style={[styles.mask, { width: defaultWidth, height: defaultHeight }]}
        >
          <View
            style={[
              styles.gradient,
              gradientBG,
              cssAnimatedStyle,
              shimmerStyle,
            ]}
          />
          <Text
            style={[
              styles.label,
              { fontSize: computedFontSize },
              style,
              { fontWeight: computedFontWeight },
              StyleSheet.absoluteFill,
              { color: "transparent", backgroundColor: "transparent" },
              {
                backgroundImage: `linear-gradient(${angle}deg, ${shimmerColors.start} ${startStop}%, ${shimmerColors.middle} 50%, ${shimmerColors.end} ${endStop}%)`,
                backgroundSize: `${defaultWidth * 2}px 100%`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                animation: `${keyframesId} ${duration}s infinite linear`,
              } as TextStyle & WebShimmerStyle,
            ]}
          >
            {children}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.shimmerContainer,
        { width: defaultWidth, height: defaultHeight },
        containerStyle,
      ]}
    >
      <MaskedView
        style={[styles.mask, { width: defaultWidth, height: defaultHeight }]}
        maskElement={
          <Text
            style={[
              styles.label,
              { color: currentColors.text, fontSize: computedFontSize },
              style,
              { fontWeight: computedFontWeight },
            ]}
          >
            {children}
          </Text>
        }
      >
        <Animated.View
          style={[styles.gradient, gradientBG, reanimatedStyle, shimmerStyle]}
        />
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  shimmerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  mask: { overflow: "hidden" },
  gradient: { flex: 1, width: "300%", marginHorizontal: "-100%" },
  label: { textAlign: "center" },
});
