// Mock Reanimated with a lightweight stub to avoid ESM issues
jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: { View },
    View,
  };
});
// MaskedView mock
jest.mock('@react-native-masked-view/masked-view', () => {
  const React = require('react');
  const { View } = require('react-native');
  return React.forwardRef((props, ref) => <View ref={ref} {...props} />);
});
