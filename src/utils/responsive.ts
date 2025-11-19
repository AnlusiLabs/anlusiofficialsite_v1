// Responsive utility functions

export const isMobile = (): boolean => {
  return window.innerWidth <= 768;
};

export const isTablet = (): boolean => {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
};

export const isDesktop = (): boolean => {
  return window.innerWidth > 1024;
};

export const isTouchDevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Responsive breakpoints
export const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1440px'
};

// Get responsive font size
export const getResponsiveFontSize = (
  mobileSize: string, 
  tabletSize: string, 
  desktopSize: string
): string => {
  return `clamp(${mobileSize}, 4vw, ${tabletSize}) clamp(${tabletSize}, 2vw, ${desktopSize})`;
};

// Get responsive spacing
export const getResponsiveSpacing = (
  mobileSpacing: string,
  desktopSpacing: string
): string => {
  return `clamp(${mobileSpacing}, 4vw, ${desktopSpacing})`;
};

// Debounce function for resize events
export const debounce = (func: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Get safe area insets for devices with notches
export const getSafeAreaInsets = () => {
  const style = getComputedStyle(document.documentElement);
  return {
    top: style.getPropertyValue('env(safe-area-inset-top)') || '0px',
    right: style.getPropertyValue('env(safe-area-inset-right)') || '0px',
    bottom: style.getPropertyValue('env(safe-area-inset-bottom)') || '0px',
    left: style.getPropertyValue('env(safe-area-inset-left)') || '0px'
  };
};
