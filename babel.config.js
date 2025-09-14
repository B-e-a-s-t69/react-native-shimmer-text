module.exports = {
  presets: ["@react-native/babel-preset"],
  plugins: [
    // Keep Reanimated plugin last when present
    "react-native-reanimated/plugin",
  ],
};
