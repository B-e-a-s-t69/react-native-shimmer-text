module.exports = {
  preset: "react-native",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-reanimated|@react-native-masked-view/masked-view)/)",
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "<rootDir>/jest.setup.js",
  ],
  moduleNameMapper: {
    "^react-native$": "react-native",
  },
  testPathIgnorePatterns: ["/node_modules/", "/lib/"],
};
