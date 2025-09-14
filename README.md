# react-native-shimmer-text
![Image](https://github.com/user-attachments/assets/070c68ba-05cb-40bf-91e0-213bd52f97ca)

Cross‑platform Shimmer Text component for React Native (iOS/Android) and Web.

## Installation

Choose your preferred package manager:

### Yarn (recommended)
```bash
yarn add react-native-shimmer-text
expo install react-native-reanimated @react-native-masked-view/masked-view
```

### npm
```bash
npm install react-native-shimmer-text
expo install react-native-reanimated @react-native-masked-view/masked-view
```

### pnpm
```bash
pnpm add react-native-shimmer-text
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

## Development

This project supports multiple package managers. Choose one and stick with it throughout development:

### Yarn (primary)
```bash
yarn install
yarn start
```

### npm
```bash
npm install
npm start
```

### pnpm
```bash
pnpm install
pnpm start
```

> **Note**: The project uses `yarn.lock` as the primary lock file. If you use npm or pnpm, your local lock files will be gitignored to avoid conflicts.
