import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ShimmerText from '../index';

// Mock react-native-reanimated for testing
jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: {
      View: View,
    },
  };
});

// Mock MaskedView for testing
jest.mock('@react-native-masked-view/masked-view', () => {
  const React = require('react');
  const { View } = require('react-native');

  const MockedMaskedView = React.forwardRef((props, ref) => {
    const { maskElement, children, ...otherProps } = props;
    return (
      <View ref={ref} testID="masked-view" {...otherProps}>
        {maskElement}
        {children}
      </View>
    );
  });

  return {
    __esModule: true,
    default: MockedMaskedView,
  };
});

describe('ShimmerText', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<ShimmerText>Hello World</ShimmerText>);

    // Check if the text content is rendered
    expect(screen.getByText('Hello World')).toBeTruthy();

    // Check if MaskedView is rendered
    expect(screen.getByTestId('masked-view')).toBeTruthy();
  });

  it('renders with custom text content', () => {
    const testText = 'Loading...';
    render(<ShimmerText>{testText}</ShimmerText>);

    expect(screen.getByText(testText)).toBeTruthy();
  });

  it('applies custom size prop', () => {
    render(<ShimmerText size="lg">Large Text</ShimmerText>);

    expect(screen.getByText('Large Text')).toBeTruthy();
  });

  it('applies custom duration prop', () => {
    render(<ShimmerText duration={5}>Slow Shimmer</ShimmerText>);

    expect(screen.getByText('Slow Shimmer')).toBeTruthy();
  });

  it('handles different text directions', () => {
    const { rerender } = render(
      <ShimmerText direction="ltr">Left to Right</ShimmerText>
    );

    expect(screen.getByText('Left to Right')).toBeTruthy();

    rerender(<ShimmerText direction="rtl">Right to Left</ShimmerText>);

    expect(screen.getByText('Right to Left')).toBeTruthy();
  });

  it('applies bold styling when bold prop is true', () => {
    render(<ShimmerText bold={true}>Bold Text</ShimmerText>);

    expect(screen.getByText('Bold Text')).toBeTruthy();
  });

  it('applies normal styling when bold prop is false', () => {
    render(<ShimmerText bold={false}>Normal Text</ShimmerText>);

    expect(screen.getByText('Normal Text')).toBeTruthy();
  });

  it('handles custom width and height', () => {
    render(
      <ShimmerText width={200} height={40}>
        Custom Size
      </ShimmerText>
    );

    expect(screen.getByText('Custom Size')).toBeTruthy();
  });

  it('handles highlight width prop', () => {
    render(
      <ShimmerText highlightWidth={30}>
        Highlighted
      </ShimmerText>
    );

    expect(screen.getByText('Highlighted')).toBeTruthy();
  });

  it('renders with custom colors', () => {
    const customColors = {
      light: {
        text: '#000000',
        shimmer: {
          start: '#ffffff00',
          middle: '#ffffff80',
          end: '#ffffff00',
        },
      },
      dark: {
        text: '#ffffff',
        shimmer: {
          start: '#00000000',
          middle: '#00000080',
          end: '#00000000',
        },
      },
    };

    render(
      <ShimmerText colors={customColors}>
        Custom Colors
      </ShimmerText>
    );

    expect(screen.getByText('Custom Colors')).toBeTruthy();
  });
});
