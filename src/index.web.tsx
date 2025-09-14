import React from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { defaultShimmerColors } from "./colors";
import { ShimmerTextProps, textSizes } from "./types";

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
  const computedFontSize = (style as any)?.fontSize ?? sizeConfig.fontSize;
  const defaultWidth =
    width ?? Math.max(children.length * computedFontSize * 0.6, 100);
  const defaultHeight = height ?? sizeConfig.height ?? computedFontSize * 1.2;

  const shimmerColors = currentColors.shimmer;

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = `shimmer-text-keyframes-${direction}`;
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
    const keyframes =
      direction === "ltr"
        ? `@keyframes shimmer-slide { 0% { background-position: 100% 0 } 100% { background-position: -100% 0 } }`
        : `@keyframes shimmer-slide { 0% { background-position: -100% 0 } 100% { background-position: 100% 0 } }`;

    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      styleEl.textContent = keyframes;
      document.head.appendChild(styleEl);
    } else if (styleEl.textContent !== keyframes) {
      styleEl.textContent = keyframes;
    }
  }, [direction]);

  const hw = Math.max(0, Math.min(100, highlightWidth ?? NaN));
  const startStop = Number.isFinite(hw) ? 50 - hw / 2 : 46;
  const endStop = Number.isFinite(hw) ? 50 + hw / 2 : 54;

  const computedFontWeight =
    bold === undefined
      ? (style as any)?.fontWeight ?? "bold"
      : bold
      ? "bold"
      : "normal";

  const spanStyle: React.CSSProperties = {
    display: "inline-block",
    width: "100%",
    textAlign: (style as any)?.textAlign ?? "center",
    fontWeight: computedFontWeight,
    fontFamily: (style as any)?.fontFamily,
    letterSpacing: (style as any)?.letterSpacing,
    textTransform: (style as any)?.textTransform,
    fontStyle: (style as any)?.fontStyle,
    fontSize: computedFontSize,
    lineHeight: `${defaultHeight}px`,
    backgroundImage: `linear-gradient(${angle}deg, ${shimmerColors.start} ${startStop}%, ${shimmerColors.middle} 50%, ${shimmerColors.end} ${endStop}%)`,
    backgroundSize: "200% 100%",
    backgroundRepeat: "repeat",
    willChange: "background-position",
    transform: "translateZ(0)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    animation: `shimmer-slide ${duration}s linear infinite`,
  } as React.CSSProperties;

  const combinedSpanStyle = {
    ...spanStyle,
    ...(shimmerStyle as unknown as React.CSSProperties),
  } as React.CSSProperties;

  return (
    <View
      style={[
        styles.shimmerContainer,
        { width: defaultWidth, height: defaultHeight },
        containerStyle,
      ]}
    >
      <span style={combinedSpanStyle}>{children}</span>
    </View>
  );
}

const styles = StyleSheet.create({
  shimmerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

