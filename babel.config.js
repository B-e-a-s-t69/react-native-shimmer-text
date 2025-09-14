module.exports = {
  presets: ["@react-native/babel-preset"],
  plugins: [
    // Keep Worklets plugin last when present
    "react-native-worklets/plugin",
  ],
};
