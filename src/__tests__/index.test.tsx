import React from 'react';
import renderer, { act } from 'react-test-renderer';
import ShimmerText from '../index';

describe('ShimmerText', () => {
  it('renders with default size and computes width/height', () => {
    let tree: renderer.ReactTestRenderer;
    act(() => {
      tree = renderer.create(<ShimmerText>Hi</ShimmerText>);
    });
    const root = (tree as renderer.ReactTestRenderer).root;

    const container = root.findAll((n) => n.props?.style && Array.isArray(n.props.style))[0];
    const styleArray = container.props.style as any[];
    const sizeStyle = styleArray.find((s) => s && s.width !== undefined);

    expect(sizeStyle.width).toBe(100);
    expect(sizeStyle.height).toBe(24);
  });

  it('respects highlightWidth via gradient stops in style string', () => {
    let tree: renderer.ReactTestRenderer;
    act(() => {
      tree = renderer.create(
        <ShimmerText highlightWidth={20}>Glow</ShimmerText>
      );
    });
    const root = (tree as renderer.ReactTestRenderer).root;
    const animatedGradient = root.findAll((n) =>
      Array.isArray(n.props?.style)
    ).find((n) => {
      const styles = n.props.style as any[];
      return styles.some((s) => s && s.experimental_backgroundImage);
    });

    const styles = animatedGradient?.props.style as any[];
    const bgPart = styles.find((s) => s && s.experimental_backgroundImage);
    expect(bgPart.experimental_backgroundImage).toContain('linear-gradient(');
    expect(bgPart.experimental_backgroundImage).toContain(' 40%');
    expect(bgPart.experimental_backgroundImage).toContain(' 60%');
  });
});

