import { StyleProp, ViewStyle, TextStyle, ImageStyle, StyleSheet, Dimensions } from 'react-native';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

type DeviceOverrides = {
  tablet?: Partial<ViewStyle | TextStyle | ImageStyle>;
  // now besides 'tablet', I can write numbers as they are breakpoint
  [propName: number]: Partial<ViewStyle | TextStyle | ImageStyle>;
};

type CustomStyle<T> = (ViewStyle | TextStyle | ImageStyle) & DeviceOverrides;

type CustomStyleMap<T> = {
  [P in keyof T]: CustomStyle<T[P]>;
};

const TABLET_WIDTH = 768;
const { width: screenWidth } = Dimensions.get('window');

function createCustomStyles<T extends NamedStyles<T>>(styles: CustomStyleMap<T>): T {
  const finalStyles = {} as any;

  for (const styleKey in styles) {
    const base = { ...styles[styleKey] };

    // Gather all override breakpoints (e.g., 600, 768, etc.)
    const overrideBreakpoints = Object.keys(base)
      .filter(key => !isNaN(Number(key)) || key === 'tablet')
      .map(key => key === 'tablet' ? TABLET_WIDTH : Number(key))
      .sort((a, b) => a - b);

    // Apply the *largest matching* breakpoint that is <= screenWidth
    for (const bp of overrideBreakpoints) {
      if (screenWidth >= bp) {
        const key = bp === TABLET_WIDTH ? 'tablet' : String(bp);
        Object.assign(base, (base as any)[key]);
      }
    }

    // Clean up special override keys
    for (const bp of overrideBreakpoints) {
      const key = bp === TABLET_WIDTH ? 'tablet' : bp;
      delete base[key];
    }

    finalStyles[styleKey] = base;
  }

  return StyleSheet.create(finalStyles);
}


createCustomStyles({
  button: {
    alignContent: 'center',
    tablet: {

    }
  }
});