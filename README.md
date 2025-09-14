# react-native-shimmer-text

Cross‑platform Shimmer Text component for React Native (iOS/Android) and Web.

Install in your app:

```
yarn add react-native-shimmer-text
expo install react-native-reanimated @react-native-masked-view/masked-view
```

Usage:

```tsx
import ShimmerText from 'react-native-shimmer-text';

export default function Example() {
  return (
    <ShimmerText size="lg" duration={3} direction="ltr">
      Thinking...
    </ShimmerText>
  );
}
```
